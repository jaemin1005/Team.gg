import { checkUser } from "./Modules/checkUser.js";
import { RequestUserData, RequestJSONData } from "./Modules/ReqData.js";

let url = "http://localhost:3000"

const reqSummonersUrl = "/summoner/" 
const reqChamionsUrl = "/champions/"

//const main = Object.assign([...document.getElementById("main").children]);
//const main = [...document.getElementById("main")].forEach()

const main = TransDOMArrIntoObj(document.getElementById("main").children);
const $search = document.getElementById("search");

ClearViewInMain();
RequestJSONData();

$search.onkeydown = (e) => {
  if(e.keyCode == "13"){  
    let searchValue = checkUser($search.value);
    if(searchValue !== undefined){
      SearchUser(searchValue);
    }
  }
}

async function SearchUser(searchValue){
  OnViewInMain("loading");
  let data = searchValue.replace("#", "-");
  data = encodeURI(data);
  let userData = await RequestUserData(url+reqSummonersUrl+data);
  console.log(userData);
  OnViewInMain("stat");
}

function OnViewInMain(name){
  Object.keys(main).forEach(key => {
    if(key === name){
      main[name].style.display = "flex";
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