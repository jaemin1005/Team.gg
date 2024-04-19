
require('dotenv').config();
const PATH = process.env.DirPATH || __dirname;
const API_KEY = process.env.API_KEY;

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
  async GetUserInfo(strName){

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
      const res = await fetch(`https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodingName}/${userId[1]}?api_key=${API_KEY}`)    
      const returnObj = await res.json();  
      return returnObj;  
    }catch(err)
    {
      return false;
    }
  }
}

module.exports = func