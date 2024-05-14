
//#region * Access Database
// const ExportPlayLog = require('../Module/DB/ExportPlayLog.js');
// const CheckUser = require('../Module/DB/CheckUser.js');
// const IoDebounce = require('../Module/DB/DebounceOutput.js');
// const ExportChampionInfo = require('../Module/DB/ExportChampionInfo.js');
// const ExportIconInfo = require('../Module/DB/ExportIconInfo.js');
// const ExportUser = require('../Module/DB/ExportUser.js');
// const InsertPlayLog = require('../Module/DB/InsertPlayLog.js');
// const InsertUser = require('../Module/DB/InsertUser.js');
// const RemoveUser = require('../Module/DB/RemoveUser.js');
// const SummonersUpdate = require('../Module/DB/UpdateUser.js');
const UserTier = require("../Module/DB/TierDB.js");

// ! 05.12 이종수
const { Log, LogAPICallCount } = require("./Log.js");
let apiCallingCnt = 0;
// ! 05.12 이종수
//#endregion

require("dotenv").config();

const PATH = process.env.DirPATH || __dirname;
const API_KEY = process.env.API_KEY;
const API_KEY_L1 = process.env.API_KEY_L1;
const API_KEY_L2 = process.env.API_KEY_L2;
// const Log = require("./Log.js");



let GetAPIKey = function (){
  let nKeyCount = 0;
  
  return function(){
    let nCount = nKeyCount % 60;

    if(nCount >= 0 && nCount < 20){
      return API_KEY;
    }
    else if(nCount >= 20 && nCount < 40){
      return API_KEY_L1;
    }
    else{
      return API_KEY_L2;
    }
    nKeyCount++;
  }
}();


/**
 * * 날짜 : 2024.04.15
 * * 이름 : 황재민
 * * 설명 : 비동기로 API를 fech로 이용하여 해당 정보를 json으로 처리한다.
 */
const getRotations = async () => {
  try {
    const res = await fetch(
      "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=" +
        riotKey
    );
    const returnObj = await res.json();
    // ! 05.12 이종수
    apiCallingCnt++;
    LogAPICallCount(apiCallingCnt);
    // ! 05.12 이종수
    console.log(returnObj);
  } catch (err) {
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

  async GetUserInfo(strName) {
    /**
     * * strName은 예시로 터검니#000
     * * 특수문자가 불가능하기 때문에 #으로 구분하여 닉네임과 태그를 분리한다.
     */
    let userId = strName.split("#");

    // if(userId.length != 2 && userId[0].length < 2){
    //   return false;
    // }

    // * 2024.05.05 배성빈
    // * 입력 받은 유저 이름이 데이터 베이스에 존재하는 지 확인 후 없다면 api호출
    // * 존재한다면 쿼리문을 통해서 객체로 변환하는 작업을 거친 후 반환한다.
    // ! 20240508 issue 16번 방식의 변경으로 주석 처리

    // const checkUser = new CheckUser();

    // let userObj = await checkUser.checkExistenceName(userId);

    // if(userObj !== null && userObj !== undefined){
    //   return userObj;
    // }

    // * gameName 부분은 URI로 인코딩하여 넣어줘야된다.
    let encodingName = encodeURI(userId[0]);

    try {
      const res = await fetch(
        `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodingName}/${userId[1]}?api_key=${API_KEY}`
      );

      const returnObj = await res.json();

      return returnObj;
    } catch (err) {
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
  async GetUserChampMastery(obj) {
    try {
      const res = await fetch(
        `https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${obj.puuid}?api_key=${API_KEY}`
      );
      //const res = await fetch(`https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${obj.puuid}?api_key=${API_KEY}`);
      const returnObj = await res.json();
      obj.champInfo = returnObj;
    } catch (err) {
      Log(`API ERR : Failed Get Champion Mastery ${err}`);
      throw new Error();
    }
  },

  /**
   * * 2024.05.08 배성빈
   * * 조회하기 전 summonerID 가 필요함으로 Summoner-V4 에서 id키를 요청한다.
   * * 해당 유저의 티어를 가져온다. 지난 시즌에 해당하는 티어들은 조회가 불가능하니 db에 저장하여 보관하는 방식.
   * * UserTier를 저장하는 새 DB Table을 제작하여야한다. -- V
   * @param {} obj : GetUserInfo에서 만든 객체.
   */

  async GetSummonerId(puuid) {
    const idObject = await fetch(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${API_KEY}`
    );

    const id = await idObject.json();

    return id.id;
  },

  async GetUserTier(obj) {
    const id = await GetSummonerId(obj.puuid);

    try {
      const callTier = await fetch(
        `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`
      );

      const tierObj = await callTier.json();

      let isTrue = false;
      let index = 0;

      while (!isTrue) {
        if (tierObj[index].queueType != "RANKED_SOLO_5x5") {
          index++;
          continue;
        }

        let destructuring = ({ summonerId, tier, rank, leaguePoints } =
          tierObj[index]);

        let tierDb = new UserTier();

        tierDb.tierInsert(destructuring);

        for (let ele in destructuring) {
          obj[ele] = destructuring[ele];
        }

        isTrue = true;
      }
    } catch (error) {
      console.error(error);
      // throw new Error();
    }
  },

  /**
   * * 2024.04.23 황재민
   * * 처음에 유저 번호를 불러왔을떄, startNum~endNum까지 matchId를 가지고온다.
   * * matchId를 가져오면 해당 id를 가져와서, match의 상세정보를 가져온다.
   * * 해당 매치정보를 matchInfo 프로퍼티를 생성하여 배열로 넣는다.
   * @param {*} obj : GetUserInfo에서 만든 객체
   * @param {*} nCall : 프론트엔드에서 전적 더 보기를 클릭했을 떄, nCall이 늘어나면서 다음 10개의 정보를 불러온다.

  */
  async GetMatchInfo(obj,nCall = 0)
  {
    // * 05/11 배성빈 수정 : 향상된 사용자 경험을 위해 가져올 matchInfo를 10 -> 5 으로 변경하였다.
    let startNum = 5 * (nCall);
    let endNum = 5 * (nCall + 1);

    obj.matchInfo = [];
    try {
      let res = await fetch(
        `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${obj.puuid}/ids?start=${startNum}&count=${endNum}&api_key=${API_KEY}`
      );
      let returnObj = await res.json();

      //! #DB_TEST_WITH_API.JS
      // const insertMatchArr = new InsertPlayLog();
      // insertMatchArr.insertPlayLog(returnObj);

      // * matchId 를 배열로 하나씩 꺼내와서 API를 이용하여 정보를 꺼내온다.
      for (const item of returnObj) {
        // * 정규표현식 양쪽 끝 따옴표, 끝따옴표 자르기 :)
        //let matchNum = item.replace(/['"]+/g, '');
        // * 배열로 자르기 :)
        //let matchNum = item.substring(1, item.length -1);
        //! #DB_TEST_WITH_API.JS  - UPDATE DB
        res = await fetch(
          `https://asia.api.riotgames.com/lol/match/v5/matches/${item}?api_key=${API_KEY}`
        );
        let matchObj = await res.json();

        obj.matchInfo[obj.matchInfo.length] = matchObj;

      }
    } catch (err) {
      // Log(`API ERR : Failed Get Match Info ${err}`);
      // throw new Error();
    }
  },


  /**
   * * 2024.05.10 황재민
   * * User의 고유 id 번호 (랭크 API 검색할 때 필요), 프로필 아이콘 번호, 랭크를 불러온다.
   * @param {*} obj : GetUserInfo에서 만들어진 객체 
   */
  async GetAccountID(obj){
    try{
      //* User 고유 Id, 프로필 아이콘 불러오는 API
      let res = await fetch(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${obj.puuid}?api_key=${API_KEY}`)
      let returnObj = await res.json();

      //* Obj에 프로퍼티를 추가한다.
      Object.keys(returnObj).forEach(key => {
        obj[key] = returnObj[key];
      })
      
      //* 자기 자신에대한 랭크 정보. 
      res = await fetch(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${obj.id}?api_key=${API_KEY}`);
      returnObj = await res.json();

      obj.league = returnObj;
    } catch(err){
      Log(`API ERR : GET AccountID ${err}`);
      throw new Error();
    } 
  },

  /**
   * * 2024.05.13 황재민
   * * 현재 진행중인 게임 불러오기.
   * * 진행 중인 게임이 있다면, 각 참가자들의 랭크 승률, 해당 챔피언 승률까지 가지고 온다. 
   * @param {*} obj : Client에서 검색한 유저의 정보가 담겨있는 객체
   */
  async GetCurrentGame(obj){
    try{
      let res = await fetch(`https://kr.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${obj.puuid}?api_key=${API_KEY}`);
      let recentMatchObj = await res.json();

      //* 매칭이 진해중이라면. 현재 모든 참가자의 랭크 승률, 진행하고 있는 챔피언의 승률을 가지고 온다. 
      if(recentMatchObj.hasOwnProperty("status") !== false){

        const leagueRequest = recentMatchObj.participants.map((participant) => {
          let summonerId = participant.summonerID;
          return fetch(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`)
          .then(res => res.json())
          .then(obj => participant.league = obj);
        });

        await Promise.all(leagueRequest);
        obj.recentMatch = recentMatchObj;
      }  

      else{
        obj.recentMatch = null;
      }

    }catch(err){
      Log(`API ERR : GET AccountID ${err}`);
      throw new Error();
    }
  }
}

module.exports = func
