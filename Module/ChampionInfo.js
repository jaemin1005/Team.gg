const ReadJSON = require('./ReadJSON');
const GetVersion = require('./GetVersion');
require('dotenv').config();

//* 환경 변수를 이용하여 PATH 만들기.
const CHAMPION_JSON_DATA = process.env.CHAMPION_JSON_DATA;
const CHAMPION_SMALL_PORTRAIT_PATH = process.env.CHAMPION_SMALL_PORTRAIT_PATH;
const champions = {};

//* JSON 파일 읽기
let ReturnObj = async () => { 
  await ReadJSON(GetVersion() + CHAMPION_JSON_DATA, CreateChampionsObj);
  return champions;
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

  champion.imgSrc = GetVersion() + CHAMPION_SMALL_PORTRAIT_PATH + `${champion.id}` + ".png";

  champions[champion.key] = champion;
}

module.exports = ReturnObj;