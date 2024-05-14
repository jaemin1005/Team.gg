import func from "../../Module/Api";

let url = "http://localhost:3000/";
let jsonDataUrl = url + "json/";

/**
 * * 2024.05.09 황재민
 * * User 데이터 요청하기 유저에 관한 정보
 * @returns user 데이터
 */
export let RequestUserData = async function(reqUrl){
  let res = await fetch(reqUrl, {method: 'GET'});
  let jsonData = await res.json();

  return jsonData;
}

/**
 * * 2024.05.13 황재민
 * * Riot 데이터 요청하기
 * @returns json 데이터
 */
export let RequestJSONData = async function(){

  let res = await fetch(jsonDataUrl, {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-cache'
    }
  });

  let resData = await res.json();

  //TODO : 비동기 처리를 해야할지 고민해봐야합니다.
  GetFatchImgData(resData.champions);
  GetFatchImgData(resData.items);
  GetFatchImgData(resData.spells);

  return resData;
}

/**
 * * 2024.05.09 황재민
 * * JSON 데이터를 다 받으면 해당 이미지를 요청하는 함수
 * @param {*} obj 
 */
function GetFatchImgData(obj){
  Object.keys(obj).forEach((key) => {
    fetch(url + obj[key].imgSrc,{method: "GET"});
  })
}

