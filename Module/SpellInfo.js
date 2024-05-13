const ReadJSON = require('./ReadJSON');
const GetVersion = require('./GetVersion');

require('dotenv').config();

//* 환경 변수를 이용하여 PATH 만들기.
const SPELL_JSON_DATA = process.env.SPELL_JSON_DATA;
const SPELL_IMG_PATH = process.env.SPELL_IMG_PATH;
const spells = {}


let ReturnObj = async () => { 
  await ReadJSON(GetVersion() + SPELL_JSON_DATA, CreateSpellObj);
  return spells;
}

/**
 * * 2024.05.09 황재민
 * * Spell에 대한 JSON 객체, 필요한 프로퍼티만 가져와서 재구성한다.
 * @param {*} obj : Spell에 대한 객체
 */
function CreateSpellObj(obj){
  let spell = {};
  let {id, name} = obj;

  spell.id = id;
  spell.name = name;
  spell.imgSrc = GetVersion() + SPELL_IMG_PATH + `${spell.id}` + ".png";

  spells[spell.id] = spell;
}

module.exports = ReturnObj;