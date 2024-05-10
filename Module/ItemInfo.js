const ReadJSON = require('./ReadJSON');

require('dotenv').config();

//* 환경 변수를 이용하여 PATH 만들기.
const ITEM_JSON_DATA = process.env.RIOT_DATA_ROOT_PATH + process.env.RIOT_DATA_VERSION + process.env.ITEM_JSON_DATA;
const ITEM_IMG_PATH = process.env.RIOT_DATA_ROOT_PATH + process.env.RIOT_DATA_VERSION + process.env.ITEM_IMG_PATH;
const items = {};

let ReturnObj = async () => { 
  await ReadJSON(ITEM_JSON_DATA, CreateItemObj);
}

/**
 * * 2024.05.09 황재민
 * * ITEM에 대한 JSON 객체, 필요한 프로퍼티만 가져와서 재구성한다.
 * @param {*} obj : ITEM에 대한 정보가 있는 객체
 * @param {*} key : 프로퍼티 이름 (키가 프로퍼티이름으로 되어있어 매개변수로 가져옴 )
 */
function CreateItemObj(obj, key){
  let item = {}
  let {name} = obj;
  
  item.name = name;
  item.key = key;
  item.imgSrc = ITEM_IMG_PATH + `${item.key}` + ".png";

  items[item.key] = item;
}

ReturnObj();
module.exports = items;