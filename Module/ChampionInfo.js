const ReadJSON = require('./ReadJSON');
require('dotenv').config();

//* 환경 변수를 이용하여 PATH 만들기.
const CHAMPION_JSON_DATA = process.env.RIOT_DATA_ROOT_PATH + process.env.RIOT_DATA_VERSION + process.env.CHAMPION_JSON_DATA;
const CHAMPION_SMALL_PORTRAIT_PATH = process.env.RIOT_DATA_ROOT_PATH + process.env.RIOT_DATA_VERSION + process.env.CHAMPION_SMALL_PORTRAIT_PATH;
const champions = {};

//* JSON 파일 읽기

let ReturnObj = async () => { 
  await ReadJSON(CHAMPION_JSON_DATA, CreateChampionsObj);
  return champions;
}

function CreateChampionsObj(obj){
  let champion = {};
  let {id, name, key} = obj;

  champion.id = id;
  champion.name = name;
  champion.key = key;

  champion.imgSrc = CHAMPION_SMALL_PORTRAIT_PATH + `${champion.id}` + ".png";

  champions[champion.key] = champion;
  console.log(champion.name);
}

module.exports = ReturnObj();