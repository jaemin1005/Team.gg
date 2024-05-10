const ReadJSON = require('./ReadJSON');
require('dotenv').config();

//* 환경 변수를 이용하여 PATH 만들기.
const CHAMPION_JSON_DATA = process.env.RIOT_DATA_ROOT_PATH + process.env.RIOT_DATA_VERSION + process.env.CHAMPION_JSON_DATA;
const CHAMPION_SMALL_PORTRAIT_PATH = process.env.RIOT_DATA_ROOT_PATH + process.env.RIOT_DATA_VERSION + process.env.CHAMPION_SMALL_PORTRAIT_PATH;
const champions = {};

//* JSON 파일 읽기
let ReturnObj = async () => { 
  await ReadJSON(CHAMPION_JSON_DATA, CreateChampionsObj);
}

/**
 * * 2024.05.09 황재민
 * * 챔피언에 대한 JSON 객체, 필요한 프로퍼티만 가져와서 재구성한다.
 * @param {*} obj : 챔피언에 대한 정보가 있는 객체
 */
function CreateChampionsObj(obj){
  let champion = {};
  let {id, name, key} = obj;

  champion.id = id;
  champion.name = name;
  champion.key = key;

  champion.imgSrc = CHAMPION_SMALL_PORTRAIT_PATH + `${champion.id}` + ".png";

  champions[champion.key] = champion;
}

ReturnObj();
module.exports = champions;