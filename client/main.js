import { checkUser } from "./Modules/checkUser.js";
import { RequestUserData, RequestJSONData } from "./Modules/ReqData.js";

let requestData = await RequestJSONData();

let url = "http://localhost:3000"

const reqSummonersUrl = "/summoner/" 
const reqChamionsUrl = "/champions/"

//const main = Object.assign([...document.getElementById("main").children]);
//const main = [...document.getElementById("main")].forEach()

const main = TransDOMArrIntoObj(document.getElementById("main").children);
const $search = document.getElementById("search");

ClearViewInMain();


$search.onkeydown = (e) => {
  if(e.keyCode == "13"){  
    let searchValue = checkUser($search.value);
    if(searchValue !== undefined){
      SearchUser(searchValue);
    }
  }
}

/**
 * * 2024.05.13 황재민
 * * 검색 이벤트 헨들러임 (검색에 성공할 시)
 * * 검색을 할시 OnViewInMain을 이용하여 화면을 컨트롤한다.
 * * 검색한 아이디를 인코딩하여 서버에게 요청한다.
 * @param {*} searchValue : 검색한 아이디
 */
async function SearchUser(searchValue){
  OnViewInMain("loading");
  let data = searchValue.replace("#", "-");
  data = encodeURI(data);
  let userData = await RequestUserData(url+reqSummonersUrl+data);
  await StatUIUpdate(userData);
  OnViewInMain("stat");
}

/**
 * * 2024.05.13 황재민
 * * Main의 자식 중 elementID로 검색
 * * 검색된 Id만 화면에 보여주고, 나머지는 보여주지 않는다.
 * @param {*} name : 보여줄 Element ID 
 */
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

/**
 * * 2024.05.13 황재민
 * * Main의 모든 자식의 displa를 none으로 설정한다. (초기화면)
 */
function ClearViewInMain(){
  Object.keys(main).forEach(key => {
    main[key].style.display = "none";
  })
}

/**
 * * 2024.05.13 황재민
 * * 해당 children.id를 객체의 프로퍼티로 삼아, 해당 값이 들어가있는 객체를 만든다
 * @param {*} arrElem : element.children
 * @returns children.id를 프로퍼티와 해당 값이 들어가있는데 객체
 */
function TransDOMArrIntoObj(arrElem){
  let obj = {};
  for(let elem of arrElem){
    obj[elem.id] = elem;
  }
  return obj;
}

async function StatUIUpdate(data){
  
  const profileIconPath = url+"/resources/lol/" + requestData.version + "/img/profileicon/" + data.profileIconId + ".png"

  const $profileDetail = document.getElementById("profile_detail");
  const $profileIcon = document.getElementById("profile_icon");


  $profileDetail.children[0].textContent = data.gameName;
  $profileDetail.children[1].textContent = " #" + data.tagLine;
  
  let promise1 = fetch(profileIconPath).then(() => {$profileIcon.children[0].src = profileIconPath;});
  
  for(let league of data.league){
    if(league.queueType === "RANKED_SOLO_5x5"){
      let $leagueInfo = document.getElementById("league_info");
      $leagueInfo.children[0].textContent = league.tier + " " + league.rank;
      $leagueInfo.children[1].textContent = league.leaguePoints + " LP";
    }
  }

  const blueTeam = document.getElementById("recent_blue_team");
  const redTeam = document.getElementById("recent_red_team");

  if(data.recentMatch != null){
    let redTeamCount = 1;
    let blueTeamCount = 1;
    const recentData = data.recentMatch.participants;

    Object.keys(recentData).forEach(key => {

        let participant = recentData[key];
        let row = participant.teamId == 100 ? blueTeam.children[blueTeamCount++] : redTeam.children[redTeamCount++];

        let profile_icon = participant.profileIconId;
        let spell_1 = participant.spell1Id;
        let spell_2 = participant.spell2Id;
        let championId = participant.championId;
        let riotId = participant.riotId;
        let primaryPerk = participant.perkStyle;
        let subPerk = participant.perkSubStyle;
        let summonerId = participant.summonerId;
        let league = participant.league;
        let wins = league.wins;
        let lossses = league.lossses;
        let winRate = Math.ceil(wins / (wins + lossses) * 100);
        
        

        row.children[0].children[0].src = requestData.champions[championId];
        row.children[2].children[0].textContent = riotId;
        row.children[3].children[0].textContent = winRate + ` (${wins+lossses})`;
        row.children[3].children[1].children[0].style.width =  

        



    });
  }







  await Promise.all([promise1])
}
