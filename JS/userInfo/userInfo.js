

//   (location.href = `../index.html`);
let url = "http://localhost:3000/";
let championData = null;
let itemData = null;
let spellData = null;


/**
 * * 2024.05.09 황재민
 * * JSON 데이터 요청하기 (챔피언, 아이템, 스펠)에 관한 정보
 */
let RequestJSONData = async function(){
  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("/summoner/", "/searchuser/");

  let res = await fetch(currentUrl, {method: 'GET'});
  let jsonData = await res.json();
  
  /**
   * * 챔피언 정보
   * * 아이템 정보
   * * 스펠 정보
   */
  championData = jsonData.champions;
  itemData = jsonData.items;
  spellData = jsonData.spells;
  
  

  //* 각 JSON 데이터의 이미지를 요청해준다.
  GetFatchImgData(championData);
  GetFatchImgData(itemData);
  GetFatchImgData(spellData);
}

/**
 * * 2024.05.09 황재민
 * * JSON 데이터를 다 받으면 해당 이미지를 요청하는 함수
 * @param {*} obj 
 */
function GetFatchImgData(obj){
  Object.keys(obj).forEach((key) => {
    console.log(obj[key].imgSrc);
    fetch(url + obj[key].imgSrc,{method: "GET"});
  })
}

async function Start(){
  RequestJSONData();
}

Start();

