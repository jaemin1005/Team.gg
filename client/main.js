import { checkUser } from "./Modules/checkUser.js";
import { RequestUserData, RequestJSONData } from "./Modules/ReqData.js";
import { tagEnum, RecordManager }from "./Modules/userInfo.js"
let url = "http://localhost:3000"

const reqSummonersUrl = "/summoner/" 
const reqChamionsUrl = "/champions/"

//const main = Object.assign([...document.getElementById("main").children]);
//const main = [...document.getElementById("main")].forEach()

const main = TransDOMArrIntoObj(document.getElementById("main").children);

const $search = document.getElementById("search");

let matchData;


ClearViewInMain();
RequestJSONData();



let a = function(){
  OnViewInMain("match")
  
  // let rec = new RecordManager(null, matchData[0])
  
  // let key = Object.keys(tagEnum)
  // console.log(key)
  // for(let i = 0; i < key.length; i++){
  //   rec.createElement(key[i], tagEnum[key[i]][0])
  // }
  
  // for (let j = 0; j < key.length; j++) {
    
  //   let childTag = tagEnum[key[j]][1];

  //   if (childTag === undefined) {
  //     continue;
  //   }

  //   rec.appendTag(key[j], childTag["child"]);
  // }
  // rec.printPlayer();
}





$search.onkeydown = async (e) => {
  
  if(e.keyCode == "13"){  
    let searchValue = checkUser($search.value);
    if(searchValue !== undefined){
      await SearchUser(searchValue);
    }
    a()
  }
  
}


async function SearchUser(searchValue){
  OnViewInMain("loading");
  let data = searchValue.replace("#", "-");
  data = encodeURI(data);
  let userData = await RequestUserData(url+reqSummonersUrl+data);
  matchData = userData.matchInfo
  OnViewInMain("stat");
}

function OnViewInMain(name){
  Object.keys(main).forEach(key => {
    if(key === name){
      if(name == "match"){
        main[name].style.display = "grid";
      }
      else{
        main[name].style.display = "flex";
      }
      
      
    }
    else{
      main[key].style.display = "none";
    }
  })
}

function ClearViewInMain(){
  Object.keys(main).forEach(key => {
    main[key].style.display = "none";
  })
}

function TransDOMArrIntoObj(arrElem){
  let obj = {};
  for(let elem of arrElem){
    obj[elem.id] = elem;
  }
  return obj;
}

