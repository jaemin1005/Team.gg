// #region
import { checkUser } from "./Modules/checkUser.js";
import { RequestUserData, RequestJSONData } from "./Modules/ReqData.js";
import { GameQueueType, RankTierDetail, RankTier, arrRankTierDetail, arrRankTier } from "./Modules/CalcRiotApi.js";
import { PrintManager } from "./DomModules/PrintManager.js";
import { PrintAllPlayerSection } from "./DomModules/PrintAllPlayerSection.js";
import { PrintResultSection } from "./DomModules/PrintResultSection.js";
import { DomElementContainer } from "./DomModules/DomElementContainer.js";
import { CreateArea } from "./DomModules/CreateArea.js";
import { TimeManager } from "./DomModules/TimeManager.js";
import { PrintUserInfoSection } from "./DomModules/PrintUserInfoSection.js";
import { spellChange } from "./DomModules/spellChange.js";
import { tagEnum, RecordManager } from "./Modules/userInfo.js"

//#endregion
let url = "http://localhost:3000"
const reqSummonersUrl = "/summoner/"
const reqChamionsUrl = "/champions/"
//* Main의 자식들의 ID가 프로퍼티로 구성되어 있는 객체
const main = TransDOMArrIntoObj(document.getElementById("main").children);
//#region --Stat DOM--
//* Stat 항목에 대한 DOM
const $search = document.getElementById("search");
const $recentMsg = document.getElementById("recent_match_msg");
const $blueTeam = document.getElementById("recent_blue_team");
const $redTeam = document.getElementById("recent_red_team");
const $shortChampionMastery = document.getElementById("short_champion_mastery")
const $recentSearch = document.getElementById("")
const $leagueInfo = document.getElementById("league_info");

//#endregion --Stat DOM--
const recentSearchData = [];
const requestData = await RequestJSONData();


// * 배성빈 2024/05/27 수정


let SelectMatchInfo = async function (matchData, gameName, number) {
  
  let MatchHTMLContainer = new CreateArea(number).CreateLogArea(DomElementContainer)
  
  let allPlayerSectionDiv = document.getElementsByClassName(`AllPlayerSection ${number}`)[0]
  let resultSectionDiv = document.getElementsByClassName(`ResultSection ${number}`)[0]
  
  let PrintPlayer = new PrintAllPlayerSection(allPlayerSectionDiv, matchData.info.participants, gameName, requestData)
  await PrintPlayer.inputContent()

  let index = PrintPlayer.getUserIndex()

  let [ago, duration] = timeGetter(matchData.info.gameEndTimestamp, matchData.info.gameDuration)
  
  let gameResult = checkWin(matchData.info.teams, index)
  let queue = queTypeCheck(matchData.info.queueId)
  
  
  let printResult = new PrintResultSection(resultSectionDiv, [gameResult, `${queue}/${duration}`, ago])
  
  printResult.inputContent()

  let printUser = new PrintUserInfoSection(matchData.info.participants[index], requestData, number)
  printUser.inputContent()
}


let checkWin = (teams, index) => {
  let result;

  index < 5 ?
    result = teams[0].win :
    result = teams[1].win

  result === true ?
    result = "승리" :
    result = "패배"

  return result
}


let queTypeCheck = (queueType) => {
  let queue;

  queueType == 440 ?
    queue = "자유랭크" :
  queueType == 420 ?
    queue = "솔로랭크" : 
    queue = "일반게임"

  return queue
}

let timeGetter = (gameEndTimestamp, gameDuration) => {
  let getTime = new TimeManager(gameEndTimestamp, gameDuration)

  return [getTime.dateCal(), getTime.duration()]
}


$search.onkeydown = async (e) => {
  if (e.keyCode == "13") {
    let searchValue = checkUser($search.value);
    if (searchValue !== undefined) {
      await SearchUser(searchValue);
    }
  }
}

function Start() {
  ClearViewInMain();
}

function AddLocalStoarge(key, value) {
  recentSearchData[recentSearchData.length] = value;

}

/**
 * * 2024.05.13 황재민
 * * 검색 이벤트 헨들러임 (검색에 성공할 시)
 * * 검색을 할시 OnViewInMain을 이용하여 화면을 컨트롤한다.
 * * 검색한 아이디를 인코딩하여 서버에게 요청한다.
 * @param {*} searchValue : 검색한 아이디
 */
async function SearchUser(searchValue) {
  OnViewInMain("loading");
  let data = searchValue.replace("#", "-");
  data = encodeURI(data);
  let userData = await RequestUserData(url + reqSummonersUrl + data);

  //* 유저 데이터가 없을 때
  if (userData == null) {
    ClearViewInMain();
    AlamTextUIUpdate(searchValue + "는 존재하지 않는 플레이어 입니다");
    OnViewInMain("alam_text");
    return;
  }

  await StatUIUpdate(userData);
  OnViewInMain("stat");
  for (let i = 0; i < 10; i++) {
    SelectMatchInfo(userData.matchInfo[i], userData.gameName, i)
  }
  // OnViewInMain("match");
}

/**
 * * 2024.05.13 황재민
 * * Main의 자식 중 elementID로 검색
 * * 검색된 Id만 화면에 보여주고, 나머지는 보여주지 않는다.
 * @param {*} name : 보여줄 Element ID 
 */
function OnViewInMain(name) {
  Object.keys(main).forEach(key => {
    if (key === name) {
      if (name == "match") {
        main[name].style.display = "grid";
        main[name].style.overflow = "scroll"
        main[name].style.overflowX = "hidden"
        main[name].style.height = "80%";
      }
      else {
        main[name].style.display = "flex";
        // main[name].style.height = "80%";
      }
    }
    else {
      main[key].style.display = "none";
    }
  })
}

/**
 * * 2024.05.13 황재민
 * * Main의 모든 자식의 displa를 none으로 설정한다. (초기화면)
 */
function ClearViewInMain() {
  Object.keys(main).forEach(key => {
    main[key].style.display = "none";
  })
}

/**
 * * 2024.05.13 황재민
 * * 해당 children.id를 객체의 프로퍼티로 삼아, 해당 값이 들어가있는 객체를 만든다
 * @param {*} arrElem : element.children
 * @returns children.id를 프로퍼티와 해당 값이 들어가있는데 객체
 **/
function TransDOMArrIntoObj(arrElem) {
  let obj = {};
  for (let elem of arrElem) {
    obj[elem.id] = elem;
  }
  return obj;
}

/**
 * * 2024.05.16 황재민
 * * Stat관련 HTML, CSS 받아온 데이터를 가지고 UI를 업데이트 해주는 함수.
 * @param {*} data : User Data
 */

async function StatUIUpdate(data) {

  const profileIconPath = url + "/resources/lol/" + requestData.version + "/img/profileicon/" + data.profileIconId + ".png"
  const $profileDetail = document.getElementById("profile_detail");
  const $profileIcon = document.getElementById("profile_icon");

  //* 게임 아이디
  $profileDetail.children[0].textContent = data.gameName;
  //* 게임 태그 
  $profileDetail.children[1].textContent = " #" + data.tagLine;

  //* Profile Icon 이미지를 불러온다.
  let promise1 = fetch(profileIconPath).then(() => { $profileIcon.children[0].src = profileIconPath; });

  //* 점수에는 솔로랭크 점수만 보여준다.
  const soloRank = data.league.find(league => league.queueType === "RANKED_SOLO_5x5");
  if (soloRank) {
    let tierImgPath = `/resources/tier/${(soloRank.tier).toLowerCase()}.webp`
    fetch(tierImgPath).then(() => document.getElementById("league_tier_icon").src = tierImgPath);
    $leagueInfo.children[0].textContent = soloRank.tier + " " + soloRank.rank;
    $leagueInfo.children[1].textContent = soloRank.leaguePoints + " LP";
  }
  else {
    let tierImgPath = "/resources/tier/unrank.webp";
    fetch(tierImgPath).then(() => document.getElementById("league_tier_icon").src = tierImgPath);
    $leagueInfo.children[0].textContent = "unrankded"
    $leagueInfo.children[1].textContent = "-";
  }


  //* 현재 진행중인 매칭이 있을 떄
  if (data.recentMatch != null) {

    // #region testCode
    //* 블루팀, 레드팀의 레이아웃을 보여준다.
    // for(let league of data.league){
    //   if(league.queueType === "RANKED_SOLO_5x5"){

    //     let tierImgPath = `/resources/tier/${(league.tier).toLowerCase()}.webp`

    //     //* 랭크 티어 이미지 요청 후, 이미지 업데이트. 
    //     fetch(tierImgPath).then(() => document.getElementById("league_tier_icon").src = tierImgPath);
    //     let $leagueInfo = document.getElementById("league_info");
    //     $leagueInfo.children[0].textContent = league.tier + " " + league.rank;
    //     $leagueInfo.children[1].textContent = league.leaguePoints + " LP";
    //   }
    // }
    // #endregion

    //* 현재 진행중인 매칭이 있을 떄
    if (data.recentMatch != null) {
      $recentMsg.style.display = "none";
      $blueTeam.style.display = "flex";
      $redTeam.style.display = "flex";

      let redTeamCount = 1;
      let blueTeamCount = 1;
      let blueRankScore = 0;
      let redRankScore = 0;

      const recentData = data.recentMatch.participants;

      Object.keys(recentData).forEach(key => {

        let participant = recentData[key];
        let row = participant.teamId == 100 ? $blueTeam.children[blueTeamCount++] : $redTeam.children[redTeamCount++];

        let profile_icon = participant.profileIconId;
        let spell_1 = participant.spell1Id;
        let spell_2 = participant.spell2Id;
        let championId = participant.championId;
        let riotId = participant.riotId;
        let primaryPerk = participant.perkStyle;
        let subPerk = participant.perkSubStyle;
        let summonerId = participant.summonerId;
        let league = participant.league;
        let leagueIdx = null;

        for (let i = 0; i < league.length; i++) {
          if (league[i].queueType == GameQueueType[data.recentMatch.gameQueueConfigId]) {
            leagueIdx = i;
            break;
          }
        }

        let wins = leagueIdx != null ? Number(league[leagueIdx].wins) : 0;
        let losses = leagueIdx != null ? Number(league[leagueIdx].losses) : 0;
        let winRate = Math.ceil(wins / (wins + losses) * 100);


        let score = leagueIdx != null ? (RankTier[league[leagueIdx].tier] + RankTierDetail[league[leagueIdx].rank]) : 0;

        row.children[0].children[0].src = requestData.champions[championId].imgSrc;
        row.children[1].children[0].children[0].src = requestData.spells[spell_1].imgSrc;
        row.children[1].children[1].children[0].src = requestData.runes[primaryPerk].icon;
        row.children[1].children[2].children[0].src = requestData.spells[spell_2].imgSrc;
        row.children[1].children[3].children[0].src = requestData.runes[subPerk].icon;
        row.children[2].children[0].textContent = riotId;
        row.children[2].children[1].textContent = leagueIdx != null ? league[leagueIdx].tier + " " + league[leagueIdx].rank + " (" + league[leagueIdx].leaguePoints + ")" : "-";
        row.children[3].children[0].textContent = leagueIdx != null ? `${winRate}%` : "-";
        row.children[3].children[1].children[0].children[0].style.width = leagueIdx != null ? `${winRate}%` : "-";
        row.children[2].children[0].textContent = riotId;
        row.children[2].children[1].textContent = leagueIdx != null ? league[leagueIdx].tier + " " + league[leagueIdx].rank + " (" + league[leagueIdx].leaguePoints + ")" : "-";
        row.children[3].children[0].textContent = leagueIdx != null ? `${winRate}%` : "-";
        row.children[3].children[1].children[0].children[0].style.width = leagueIdx != null ? `${winRate}%` : "-";
        if (participant.teamId == 100) blueRankScore += score;
        else redRankScore += score;
      });

      //* 평균 점수
      const avgBlueScore = Math.round(blueRankScore / 5);
      const avgRedScore = Math.round(redRankScore / 5);

      //* 평균 티어 배열 인덱스
      const blueTierIdx = Math.floor(avgBlueScore / 5);
      const redTierIdx = Math.floor(avgRedScore / 5);

      //* 평균 티어 세부점수 인덱스
      const blueTierDetail = avgBlueScore % 5;
      const redTierDetail = avgRedScore % 5;

      $blueTeam.children[0].children[1].textContent = `티어 평균 : ${arrRankTier[blueTierIdx]} ${arrRankTierDetail[blueTierDetail - 1]})`;
      $redTeam.children[0].children[1].textContent = `티어 평균 : ${arrRankTier[redTierIdx]} ${arrRankTierDetail[redTierDetail - 1]}`;
    }

    //* 현재 진행중인 매칭이 없을 떄.
    else {
      $redTeam.style.display = "none";
      $blueTeam.style.display = "none";
      $recentMsg.style.display = "block";
      $recentMsg.textContent = `${data.gameName}#${data.tagLine}은 현재 게임중이 아닙니다.`
    }

    //* 해당 유저의 챔피언 마스터리
    $shortChampionMastery.children[0].children[0].src = requestData.champions[data.champInfo[0].championId].imgSrc;
    $shortChampionMastery.children[1].children[0].textContent = requestData.champions[data.champInfo[0].championId].name;
    $shortChampionMastery.children[1].children[1].textContent = data.champInfo[0].championPoints;

    await Promise.all([promise1])
  }

  /**
   * * 2024.05.20 황재민
   * * 해당 텍스트로 화면에 보여준다.
   * @param {*} strText 
   */

  
}


function AlamTextUIUpdate(strText) {
  main["alam_text"].textContent = strText;
}
