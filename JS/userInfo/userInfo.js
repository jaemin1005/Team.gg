let url = "http://localhost:3000/";
let jsonDataUrl = url + "json/";

let userData = null;
let championData = null;
let itemData = null;
let spellData = null;

/**
 * * 2024.05.09 황재민
 * * JSON 데이터 요청하기 (챔피언, 아이템, 스펠)에 관한 정보
 */
let RequestUserData = async function(){
  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("/summoner/", "/searchuser/");

  let res = await fetch(currentUrl, {method: 'GET'});
  let jsonData = await res.json();

  userData = jsonData;
}

let RequestJSONData = async function(){

  let res = await fetch(jsonDataUrl, {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-cache'
    }
  });


  let resData = await res.json();
  championData = resData.champions;
  itemData = resData.items;
  spellData = resData.spells;

  GetFatchImgData(championData);
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

async function GetUIUpdate(obj){
  document.getElementById("playName").textContent(obj.gameName + " #" + obj.tagLine);
  fetch(`http//localhost:3000/resources/lol/img/profileicon/${obj.profileIconId}.png`).then(() => document.getElementById("profileImg").src = `http//localhost:3000/resources/lol/img/profileicon/${obj.profileIconId}.png`);
}

let StartGetData = async function(){

  let promise1 = RequestUserData();
  let promise2 = RequestJSONData();


  await Promise.all([promise1,promise2]);
}

