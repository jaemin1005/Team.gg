const fs = require('fs');
require('dotenv').config();

const CHAMPION_JSON_DATA = process.env.CHAMPION_JSON_DATA;
const CHAMPION_SMALL_PORTRAIT = process.env.CHAMPION_SMALL_PORTRAIT;
const champions = [];

// JSON 파일 읽기
fs.readFile(CHAMPION_JSON_DATA, 'utf8', (err, data) => {
    
  if (err) {
        console.error('Error reading file:', err);
        return;
    }
    
    const jsonData = JSON.parse(data);    
    Object.keys(jsonData.data).forEach(key => {
      let champ = jsonData.data[key];
      CreateChampionsObj(champ);
    })
    console.dir(champions);
});


function CreateChampionsObj(obj){
  let champion = {};
  let {id, name} = obj;

  champion.id = id;
  champion.name = name
  champion.imgSource = CHAMPION_SMALL_PORTRAIT + `${champion.id}` + ".png";

  champions[champions.length] = champion;
}

