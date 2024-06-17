// 미사용 모듈. 수정 후 DOM Modules에 분할하여 

/**
 * * 2024.05.09 배성빈
 * * div 동적 생성. api로 호출받은 promise 객체를 변환하여 client 출력.
 * @param {*} obj 
 */

export const tagEnum = {
  
  LogContainer : [{
    "type": "div",
    "class": "LogContainer",
  },
  { "child": ["sec1", "sec2", "sec3"] }
  ],

  sec1: [{
    "type": "div",
    "class": "sec1",
  },
  { "child": ["result", "type", "duration", "ago"] }
  ],


  result : [{
    "type": "p",
    "class" : "result"

  },
  ],
  type : [{
    "type": "p",
    "class" : "type"
  },
  ],
  duration : [{
    "type": "p",
    "class" : "duration"
  },
  ],
  ago : [{
    "type": "p",
    "class" : "ago"
  },
  ],

  sec2: [{
    "type": "div",
    "class": "sec2",
  },
  { "child": ["subsec1", "subsec2"] }
  ],

  subsec1: [{
    "type": "div",
    "class": "subsec1"
  },
  {"child" : ["champ", "spellContainer", "Rune", "kda"]}
  ],

  champ: [{
    "type": "div",
    "class": "champ"
  },
  {"child" : ["champImg"]}
  ],

  champImg :[{
    "type" : "img"
  }],

  spellContainer : [{
    "type" : "div",
    "class" : "spellContainer"
  },
  {"child" : ["summoner1Id", "summoner2Id"]}
  ],
  
  summoner1Id :[{
    "type" : "img", 
    "class" : "summoner1Id"
  }],
  summoner2Id :[{
    "type" : "img",
    "class" : "summoner2Id"
  }],

  Rune : [{
    "type" : "div",
    "class" : "Rune"
  },
  {"child" : ["rune1", "rune2"]}
  ],

  rune1 :[{
    "type" : "img",
    "class":"rune1"
  }],
  rune2 :[{
    "type" : "img",
    "class":"rune2"
  }],

  kda :[{
    "type" : "div",
    "class" : "kda"
  }, {"child":["n1", "n2"]}],

  
  n1 :[{
    "type" : "p",
    "class" : "n1"
  }],


  n2 :[{
    "type" : "p",
    "class" : "n2"
  }],

  subsec2:[{
    "type" : "div",
    "class" : "subsec2"
  }, {"child" : ["itemCon"]}],

  itemCon : [{
    "type" : "div",
    "class" : "itemCon"
  },
  {"child" : ["item0","item1","item2","item3","item4","item5"]}
  ],

  item0 :[{
    "type" : "img",
    "class" : "item0"
  }],
  item1 :[{
    "type" : "img",
    "class" : "item1"
  }],
  item2 :[{
    "type" : "img",
    "class" : "item2"
  }],
  item3 :[{
    "type" : "img",
    "class" : "item3"
  }],
  item4 :[{
    "type" : "img",
    "class" : "item4"
  }],
  item5 :[{
    "type" : "img",
    "class" : "item5"
  }],

  sec3: [{
    "type":"div",
    "class" : "sec3"
  },{
    "child" : ["a1", "a2", "a3", "a4", "a5", "b1", "b2", "b3", "b4", "b5",]
  }],

  a1 : [{
    "type" : "div",
    "class" : "a1"
  }, {"child" : ["a1Img", "a1Name"]}],

  a1Img : [{
    "type" : "img", 
    "class" : "a1Img"
  }],

  a1Name : [{
    "type" : "p", 
    "class" : "a1Name"
  }],

  a2 : [{
    "type" : "div",
    "class" : "a2"
  }, {"child" : ["a2Img", "a2Name"]}],

  a2Img : [{
    "type" : "img", 
    "class" : "a2Img"
  }],

  a2Name : [{
    "type" : "p", 
    "class" : "a2Name"
  }],


  a3 : [{
    "type" : "div",
    "class" : "a3"
  }, {"child" : ["a3Img", "a3Name"]}],

  a3Img : [{
    "type" : "img", 
    "class" : "a3Img"
  }],

  a3Name : [{
    "type" : "p", 
    "class" : "a3Name"
  }],


  a4 : [{
    "type" : "div",
    "class" : "a4"
  }, {"child" : ["a4Img", "a4Name"]}],

  a4Img : [{
    "type" : "img", 
    "class" : "a4Img"
  }],

  a4Name : [{
    "type" : "p", 
    "class" : "a4Name"
  }],


  a5 : [{
    "type" : "div",
    "class" : "a5"
  }, {"child" : ["a5Img", "a5Name"]}],

  a5Img : [{
    "type" : "img", 
    "class" : "a5Img"
  }],

  a5Name : [{
    "type" : "p", 
    "class" : "a5Name"
  }],


  b1 : [{
    "type" : "div",
    "class" : "b1"
  }, {"child" : ["b1Name", "b1Img"]}],

  b1Name : [{
    "type" : "p", 
    "class" : "b1Name"
  }],

  b1Img : [{
    "type" : "img", 
    "class" : "b1Img"
  }],

 


  b2 : [{
    "type" : "div",
    "class" : "b2"
  }, {"child" : ["b2Name", "b2Img"]}],

  b2Name : [{
    "type" : "p", 
    "class" : "b2Name"
  }],

  b2Img : [{
    "type" : "img", 
    "class" : "b2Img"
  }],


  b3 : [{
    "type" : "div",
    "class" : "b3"
  }, {"child" : ["b3Name","b3Img"]}],
  

  b3Name : [{
    "type" : "p", 
    "class" : "b3Name"
  }],

  b3Img : [{
    "type" : "img", 
    "class" : "b3Img"
  }],


  b4 : [{
    "type" : "div",
    "class" : "b4"
  }, {"child" : ["b4Name", "b4Img"]}],


  b4Name : [{
    "type" : "p", 
    "class" : "b4Name"
  }],

  b4Img : [{
    "type" : "img", 
    "class" : "b4Img"
  }],


  b5 : [{
    "type" : "div",
    "class" : "b5"
  }, {"child" : ["b5Name", "b5Img"]}],


  b5Name : [{
    "type" : "p", 
    "class" : "b5Name"
  }],

  b5Img : [{
    "type" : "img", 
    "class" : "b5Img"
  }],
} 

export class RecordManager {

  constructor(obj, matchInfo) {

    this.obj = obj;
    this.section = document.getElementById("match");
    this.eleData = {};
    this.matchInfo = matchInfo;

    this.BluePostionKey =["a1Name", "a2Name", "a3Name", "a4Name", "a5Name"]
    this.BlueChampionEle = ["a1Img", "a2Img", "a3Img", "a4Img", "a5Img"]
    this.RedPostionKey =["b1Name", "b2Name", "b3Name", "b4Name", "b5Name"]
    this.RedChampionEle = ["b1Img", "b2Img", "b3Img", "b4Img", "b5Img"]
    this.fetchKey = ["championName", "item0", "item1", "item2", "item3", "item4", "item5", "summoner1Id", "summoner2Id"]
    this.fetchKeyWithRune = ["perk"]

    this.gameTypeEnum = {
      440 : "자랭",
      420 : "솔랭"
    }
    this.spellChanege = {
      21 : "SummonerBarrier",
      1 : "SummonerBoost",
      14 : "SummonerDot",
      3 : "SummonerExhaust",
      4 : "SummonerFlash",
      6 : "SummonerHaste", 
      7 : "SummonerHeal",
      13 : "SummonerMana", 
      11 : "SummonerSmite",
      12 : "SummonerTeleport"
    }

    this.perksChange = {
      8200 : "Sorcery"
    }
  }

  // * 태그 생성, 상속
  createElement(tagName, tagAtt) {

    if (tagAtt != null && tagAtt != undefined) {
      let key = Object.keys(tagAtt);
      let element;

      for (let i = 0; i < key.length; i++) {
        if (key[i] == "type"){
          element = document.createElement(tagAtt[key[i]]);
          if(tagAtt[key[i]] == "img"){
            element.setAttribute("src", "")
          }
        }
        else{
          element.setAttribute(key[i], tagAtt[key[i]])
        }

      }

      this.eleData[tagName] = element;
    } else {
      return;
    }
  }

  appendTag(name, child) {
    
    let key = Object.keys(this.eleData);
    for(let i = 0; i < this.eleData.length;i++){
      
    }

    if (name == "LogContainer") {
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
    return timeline
  }

  checkWin() {
    let result = this.matchInfo.endOfGameResult;
    if (result == "GameComplete") {
    
    } else {
      return "다시하기"
    }
  }

  async printMatchInfo(){

     //! Test, main 호출시 매개변수로 받을 수 있게 수정
     let userName = "터검니"
    
    let blueTeamLoop = this.matchInfo.info.participants.length / 2 - 1
    let redTeamLoop = blueTeamLoop + this.matchInfo.info.participants.length / 2

    let isGameResult    
    
    this.matchInfo.info.endOfGameResult === "GameComplete" ? isGameResult = true : isGameResult = false
  
    // ? 게임 타입 출력
    this.eleData["type"].innerHTML = this.gameTypeEnum[this.matchInfo.info.queueId]
    // ? 게임 길이 출력
    this.eleData["duration"].innerHTML = this.duration(this.matchInfo.info.gameDuration)
    // ? 지난 시간 출력
    this.eleData["ago"].innerHTML = this.dateCal(this.matchInfo.info.gameEndTimestamp)

    // ? blueTeamLoop
    for(let i = 0; i <= blueTeamLoop; i++){  
      let clientName = this.matchInfo.info.participants[i]
      let idStirng = clientName["riotIdGameName"]

      let strResult;
      idStirng.length > 5 ?
      strResult = idStirng.substr(0,5) + "...":
      strResult = idStirng

      this.eleData[this.BluePostionKey[i]].innerHTML = strResult
      
      if(idStirng === userName){

        for(let k = 0; k < this.fetchKey.length; k++){
          this.fetchImg(clientName[this.fetchKey[k]], this.fetchKey[k])
        }

        let kda1 = clientName.kills + "/" + clientName.deaths + "/" + clientName.assists;
        let kda2 = (clientName.kills +  clientName.assists)/clientName.deaths
        this.eleData["n1"].innerHTML = kda1;
        this.eleData["n2"].innerHTML = kda2.toFixed(2);

        let mainRune = this.fetchImg(clientName.perks.styles["0"].selections["0"]["perk"], "perk")
        let subRune = this.fetchImg(clientName.perks.styles["1"].style, "perk")
        
        this.eleData["rune1"].src = mainRune
        this.eleData["rune1"].width = 24
        this.eleData["rune1"].height = 24

        this.eleData["rune2"].src = subRune
        this.eleData["rune2"].width = 24
        this.eleData["rune2"].height = 24

      }
      let url = await this.fetchImg(clientName["championName"], "sChampImg")
      this.eleData[this.BlueChampionEle[i]].src = url
      this.eleData[this.BlueChampionEle[i]].width = 24
      this.eleData[this.BlueChampionEle[i]].height = 24
    }
    

    // ? 레드팀 순회
    for(let i = blueTeamLoop + 1; i <= redTeamLoop; i++){  
      let clientName = this.matchInfo.info.participants[i]
      let idStirng = clientName["riotIdGameName"]
      let strResult;
      
      idStirng.length > 5 ?
      strResult = idStirng.substr(0,5) + "...":
      strResult = idStirng
      
      this.eleData[this.RedPostionKey[i - 5]].innerHTML = strResult

      if(idStirng === userName){
        for(let k = 0; k < this.fetchKey.length; k++){
          this.fetchImg(clientName[this.fetchKey[k]], this.fetchKey[k])
        }

        let kda1 = clientName.kills + "/" + clientName.deaths + "/" + clientName.assists;
        let kda2 = (clientName.kills +  clientName.assists)/clientName.deaths        
        this.eleData["n1"].innerHTML = kda1;
        this.eleData["n2"].innerHTML = kda2.toFixed(2);


        let mainRune = this.fetchImg(clientName.perks.styles[0].style + "/" + clientName.perks.styles[0].selections[0]["perk"], "mainPerk")
        let subRune = this.fetchImg(clientName.perks.styles[1].style, "subPerk")
        
        this.eleData["rune1"].src = mainRune
        this.eleData["rune1"].width = 24
        this.eleData["rune1"].height = 24

        this.eleData["rune2"].src = subRune
        this.eleData["rune2"].width = 24
        this.eleData["rune2"].height = 24
      }

      let url = await this.fetchImg(clientName["championName"], "sChampImg")      
      this.eleData[this.RedChampionEle[i-5]].src = url
      this.eleData[this.RedChampionEle[i-5]].width = 24
      this.eleData[this.RedChampionEle[i-5]].height = 24
    }

    console.log(this.matchInfo)
  }

  async fetchImg(imgName, key){
      let res;
      let elementName;
      let imgSize;
      let blob;
      let url;

      switch(key){
        case "championName":
          res = await fetch(`/champImg/${imgName}_0`, {method:"GET"})  
          elementName = "champImg"
          imgSize = 48          
        break

        case "sChampImg":
            res = await fetch(`/champImg/${imgName}_0`, {method:"GET"})  
            blob = await res.blob()
            url = await URL.createObjectURL(blob)
        return url

          case "item0":
          case "item1":
          case "item2":
          case "item3":
          case "item4":
          case "item5":
            res = await fetch(`/itemImg/${imgName}`, {method:"GET"})  
            elementName = "item" + key.split("item")[1]
            imgSize = 24
          break

          // ! 서버처리 필수.
          case "summoner1Id":
          case "summoner2Id":
            let spellName = this.spellChanege[imgName]
            res = await fetch(`/spellImg/${spellName}`, {method:"GET"})  
            elementName = "summoner" + key.split("summoner")[1]
            imgSize = 24
          break

          case "mainPerk":
          case "subPerk":
            res = await fetch(`/runeImg/${imgName}`, {method:"GET"})
            blob = await res.blob()
            url = await URL.createObjectURL(blob)
            console.log(url)
          return url
          // !runeImg 룬 처리
        
        default:
          return;
      }
      
      blob = await res.blob()
      url = await URL.createObjectURL(blob)

      this.eleData[elementName].src = url
      this.eleData[elementName].width = imgSize
      this.eleData[elementName].height = imgSize
  }

}


// async function Start() {
  
//   let i = new RecordManager(null, data.matchInfo[0]);
//   let key = Object.keys(tagEnum);
  
//     for (let j = 0; j < key.length; j++) {
//       i.createElement(key[j], tagEnum[key[j]][0]);
//     }

//     for (let j = 0; j < key.length; j++) {
//       let childTag = tagEnum[key[j]][1];

//       if (childTag === undefined) {
//         continue;
//       }

//       i.appendTag(key[j], childTag["child"]);
//     }

//   i.printPlayer();
// }

// Start();

