const riotKey = "RGAPI-67fc4f10-3019-4da1-9437-bbd9d3d9ddb5";


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