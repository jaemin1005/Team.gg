const ReadJSON = require('./ReadJSON');

require('dotenv').config();

//* 환경 변수를 이용하여 PATH 만들기.
const ITEM_JSON_DATA = process.env.RIOT_DATA_ROOT_PATH + process.env.RIOT_DATA_VERSION + process.env.ITEM_JSON_DATA;
const ITEM_IMG_PATH = process.env.RIOT_DATA_ROOT_PATH + process.env.RIOT_DATA_VERSION + process.env.ITEM_IMG_PATH;
const items = {};

let ReturnObj = async () => { 
  await ReadJSON(ITEM_JSON_DATA, CreateItemObj);
}

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