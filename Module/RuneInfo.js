const fs = require("fs");
const GetVersion = require('./GetVersion');

require('dotenv').config();

//* 환경 변수를 이용하여 PATH 만들기.
const RUNE_JSON_DATA = process.env.RUNE_JSON_DATA;
const RUNE_IMG_PATH = process.env.RUNE_IMG_PATH
const runes = {}


let ReturnObj = async () => { 
  await CreateRuneObj();
  return runes;
}

/**
 * * 2024.05.09 황재민
 * * Rune에 대한 JSON 객체, 필요한 프로퍼티만 가져와서 재구성한다.
 * @param {*} obj : Spell에 대한 객체
 */
async function CreateRuneObj(obj){
  fs.readFile(GetVersion() + RUNE_JSON_DATA, (err, data) => {
    if(err){
      return;
    }

    let obj = JSON.parse(data);
    obj.forEach(element => {
      element.icon = process.env.RIOT_DATA_ROOT_PATH + RUNE_IMG_PATH + element.icon;
      element.slots.forEach(slot => {
        slot["runes"].forEach(rune => rune.icon = process.env.RIOT_DATA_ROOT_PATH + RUNE_IMG_PATH + rune.icon);
      });

      runes[element.id] = element;     
    });
  });

}

ReturnObj();
module.exports = ReturnObj;