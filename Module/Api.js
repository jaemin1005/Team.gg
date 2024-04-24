//#region * Access Database 
const ExportPlayLog = require('../Module/DB/ExportPlayLog.js');
const CheckUser = require('../Module/DB/CheckUser.js');
const IoDebounce = require('../Module/DB/DebounceOutput.js');
const ExportChampionInfo = require('../Module/DB/ExportChampionInfo.js');
const ExportIconInfo = require('../Module/DB/ExportIconInfo.js');
const ExportUser = require('../Module/DB/ExportUser.js');
const InsertPlayLog = require('../Module/DB/InsertPlayLog.js');
const InsertUser = require('../Module/DB/InsertUser.js');
const RemoveUser = require('../Module/DB/RemoveUser.js');
const SummonersUpdate = require('../Module/DB/UpdateUser.js');
//#endregion

require('dotenv').config();
const PATH = process.env.DirPATH || __dirname;
const API_KEY = process.env.API_KEY;

const Log = require("./Log.js");

/** 
 * * 날짜 : 2024.04.15
 * * 이름 : 황재민
 * * 설명 : 비동기로 API를 fech로 이용하여 해당 정보를 json으로 처리한다. 
*/
const getData = async () => {
  try{
    const res = await fetch("https://kr.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=" + riotKey);
    const returnObj = await res.json();
    console.log(returnObj);
  }
  catch(err){
    console.log(err);
  }
};

/**
 * * 2024.04.19 황재민
 * * module로 호출될 객체 :)
 * TODO : 직관성있는 방법 생각해보기. 
 */
let func = {

  /**
   * * 2024.04.19 황재민
   * * 매개변수 strName을 이용. strName은 URI로 인코딩해야 된다.
   * * fetch를 통하여 API사용, 백틱을 이용하여 만들어둔 변수를 넣어둔다.
   * * 받아온 데이터를 json하고 returnobj로 넣어줌 :)
   * @param {*} strName : 닉테임 + #태그 되있는 문자열
   * @returns API 결과 
   */
  async GetUserInfo(strName)
  {
    /**
     * * strName은 예시로 터검니#000 
     * * 특수문자가 불가능하기 때문에 #으로 구분하여 닉네임과 태그를 분리한다. 
     */
    let userId = strName.split('#');
    
    if(userId.length != 2)
    {
      return false;
    }

    // * gameName 부분은 URI로 인코딩하여 넣어줘야된다.
    let encodingName = encodeURI(userId[0]);

    try{
      const res = await fetch(`https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodingName}/${userId[1]}?api_key=${API_KEY}`);    
      const returnObj = await res.json();  
      return returnObj;  
    }catch(err)
    {
      Log(`API ERR : Failed Get User Info ${err}`);
      return null;
    }
  },

  /**
   * * 2024.04.23 황재민
   * * 챔프 숙련도를 가져온다.
   * * API를 가져온 정보를 역직렬화 하여, champInfo 프로퍼티 추가후 해당 데이터를 넣는다.
   * * err가 날 경우 throw 해서 Promise.all 에서 캐치할 수 있도록 함.
   * @param {} obj : GetUserInfo에서 만든 객체.
   */
  async GetUserChampMastery(obj)
  {
    try{
      const res = await fetch(`https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${obj.puuid}?api_key=${API_KEY}`);
      const returnObj = await res.json();
      obj.champInfo = returnObj;
    }catch(err)
    {
      Log(`API ERR : Failed Get Champion Mastery ${err}`);
      throw new Error();
    }
  },

  /**
   * * 2024.04.23 황재민
   * * 처음에 유저 번호를 불러왔을떄, startNum~endNum까지 matchId를 가지고온다.
   * * matchId를 가져오면 해당 id를 가져와서, match의 상세정보를 가져온다. 
   * * 해당 매치정보를 matchInfo 프로퍼티를 생성하여 배열로 넣는다.
   * @param {*} obj : GetUserInfo에서 만든 객체
   * @param {*} nCall : 프론트엔드에서 전적 더 보기를 클릭했을 떄, nCall이 늘어나면서 다음 20개의 정보를 불러온다.
   */
  async GetMatchInfo(obj,nCall = 0)
  {
    let startNum = 20 * (nCall);
    let endNum = 20 * (nCall + 1);
    obj.matchInfo = [];
    try{
      let res = await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${obj.puuid}/ids?start=${startNum}&count=${endNum}&api_key=${API_KEY}`);
      let returnObj = await res.json();
      
      // * matchId 를 배열로 하나씩 꺼내와서 API를 이용하여 정보를 꺼내온다.
      for(const item of returnObj)
      {
        // * 정규표현식 양쪽 끝 따옴표, 끝따옴표 자르기 :)
        //let matchNum = item.replace(/['"]+/g, ''); 
        // * 배열로 자르기 :)
        //let matchNum = item.substring(1, item.length -1);

        res = await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/${item}?api_key=${API_KEY}`);
        returnObj = await res.json();
        obj.matchInfo[obj.matchInfo.length] = returnObj; 
      }
    }catch(err)
    {
      Log(`API ERR : Failed Get Match Info ${err}`);
      throw new Error();
    }
  }
  
}

module.exports = func

