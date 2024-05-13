let url = "http://localhost:3000/";
let championData = null;
let itemData = null;
let spellData = null;
let data;

/**
 * * 2024.05.09 황재민
 * * JSON 데이터 요청하기 (챔피언, 아이템, 스펠)에 관한 정보
 */
let RequestJSONData = async function () {

  let currentUrl = window.location.href;

  currentUrl = currentUrl.replace("/summoner/", "/searchuser/");

  let res = await fetch(currentUrl, { method: 'GET' });

  let jsonData = await res.json();

  /**
   * * 챔피언 정보
   * * 아이템 정보
   * * 스펠 정보
   */
  // championData = jsonData.champions;
  // itemData = jsonData.items;
  // spellData = jsonData.spells;



  //* 각 JSON 데이터의 이미지를 요청해준다.
  // GetFatchImgData(championData);
  // GetFatchImgData(itemData);
  // GetFatchImgData(spellData);


  return jsonData;
}

/**
 * * 2024.05.09 황재민
 * * JSON 데이터를 다 받으면 해당 이미지를 요청하는 함수
 * @param {*} obj 
 */
function GetFatchImgData(obj) {
  Object.keys(obj).forEach((key) => {
    fetch(url + obj[key].imgSrc, { method: "GET" });
  })
}



// -------------------------------------------------------- moduel 분리 필요  --------- 

// * 배성빈 전적 출력 관련 함수 작성. 05/10 ~ ing



/**
 * * 2024.05.09 배성빈
 * * div 동적 생성. api로 호출받은 promise 객체를 변환하여 client 출력.
 * @param {*} obj 
 */

const tagEnum = {
  container: [{
    "type": "div",
    "id": "game_record",
    "class": "right_section_left_container",
  },
  { "child": ["logLabel"] }
  ],

  logLabel: [{
    "type": "div",
    "id": "logLabel",
    "class": "game_record",
  },
  { "child": ["main", "shadow"] }
  ],

  main: [{
    "type": "div",
    "class": "main_game_record",
  },
  { "child": ["mainSec1", "mainSec2"] }
  ],

  shadow: [{
    "type": "div",
    "class": "shadow_game_record"
  }],
  mainSec1: [{
    "type": "div",
    "id": "mainSec1"
  }],
  mainSec2: [{
    "type": "div",
    "id": "mainSec2"
  }],
}




class RecordManager {

  constructor(obj, matchInfo) {
    this.obj = obj;
    this.section = document.getElementsByClassName("right_section")[0];
    this.eleData = {};
    this.matchInfo = matchInfo;
  }

  // * 태그 생성, 상속
  createElement(tagName, tagAtt) {

    if (tagAtt != null && tagAtt != undefined) {
      let key = Object.keys(tagAtt);
      let element;

      for (let i = 0; i < key.length; i++) {
        if (key[i] == "type") {
          element = document.createElement(tagAtt[key[i]]);
        }
        else {
          element.setAttribute(key[i], tagAtt[key[i]])
        }
      }

      this.eleData[tagName] = element;
    } else {
      return;
    }
  }

  appendTag(name, child) {

    if (name == "container") {
      this.section.appendChild(this.eleData[name])
    }

    for (let i = 0; i < child.length; i++) {
      this.eleData[name].appendChild(this.eleData[child[i]]);
    }
  }

  /*
  * 2024.05.11 배성빈
  * Right Section 관련 함수
  * @param -> UnixTime
  */

  dateCal() {
    let time = this.matchInfo.info.gameEndTimestamp;
    let now = new Date();
    let gtime = new Date(time);
    let resultTime = now.getTime() - gtime.getTime();
    let diff = resultTime / (24 * 60 * 60 * 1000);
    // * ms단위로 차이를 구해 date로 변환 후에 if문을 통해 조건을 검사함.
    if (diff >= 365) {
      // * n년 전
      let years = Math.floor(diff / 365);
      return `${years}년 전`;

    } else if (diff >= 30) {
      // * n개월 전
      let months = Math.floor(diff / 30);
      return `${months}달 전`;
    } else if (diff >= 1) {
      // * n일 전
      return `${Math.floor(diff)}일 전`;
    } else {
      // * n시간 전
      let hdif = resultTime / (60 * 60 * 1000);

      if (hdif >= 1) {
        return `${Math.floor(hdif)}시간 전`;
      } else {
        // * n분 전
        let mdif = resultTime / (60 * 1000);
        return `${Math.floor(mdif)}분 전`;
      }
    }
  }

  // * 게임 길이 반환
  duration(ms) {
    let sec = ms % 60;
    let min = Math.floor(ms / 60);
    let timeline = `${min}분` + `${sec}초`
    console.log(timeline)
  }

  checkWin() {
    let result = this.matchInfo.endOfGameResult;
    if (result == "GameComplete") {

    } else {
      return "다시하기"
    }

    // matchInfo - 0 - 
  }

  printPlayer() {
    let keys = ["champLevel", "championId", "championName", "role", "riotIdGameName", "riotIdTagline", "item0", "item1", "item2", "item3", "item4", "item5", "item6", "individualPosition", "summoner1Id", "summoner2Id", "summonerLevel", "win", "kills", "deaths", "assists", "lane"]
    
    for (let i = 0; i < 10; i++) {
      for(let ele of keys){
        let p = document.createElement("p")
        this.eleData["mainSec2"].appendChild(p);
        console.log(this.matchInfo.info.participants[i][ele])
        p.innerHTML = `${ele} : `+`${this.matchInfo.info.participants[i][ele]}`
      }
    }
  }


}





async function Start() {

  await RequestJSONData().then((resolve) => (data = resolve));

  


  // ----------- div 생성 및 상속 
  
  let i = new RecordManager(null, data.matchInfo[0]);
  let key = Object.keys(tagEnum);


  
    for (let j = 0; j < key.length; j++) {
      i.createElement(key[j], tagEnum[key[j]][0]);
    }
    for (let j = 0; j < key.length; j++) {
      let childTag = tagEnum[key[j]][1];

      if (childTag === undefined) {
        continue;
      }
      i.appendTag(key[j], childTag["child"]);
    }
  
  i.printPlayer();
  
}

Start();


