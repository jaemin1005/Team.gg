const ReadJSON = require('./ReadJSON');
require('dotenv').config();

const SPELL_JSON_DATA = process.env.RIOT_DATA_ROOT_PATH + process.env.RIOT_DATA_VERSION + process.env.SPELL_JSON_DATA;
const SPELL_IMG_PATH = process.env.RIOT_DATA_ROOT_PATH + process.env.RIOT_DATA_VERSION + process.env.SPELL_IMG_PATH;
const spells = {}


let ReturnObj = async () => { 
  await ReadJSON(SPELL_JSON_DATA, CreateSpellObj);
  return spells;
}

function CreateSpellObj(obj){
  let spell = {};
  let {id, name} = obj;

  spell.id = id;
  spell.name = name;
  spell.imgSrc = SPELL_IMG_PATH + `${spell.id}` + ".png";

  spells[spell.id] = spell;
}

module.exports = ReturnObj();