/**
 * * PrintUserInfoSection
 * 2024/05/23 배성빈 : PrintAllPlayerSection을 통해 반환된 사용자 인덱스를 받아와 모든 출력을 진행함. 
 * #role 
 * ? constructor
 * @param {*} parentObj : 
 * @param {*} participant
 * @param {*} obj
 * @param {*} number
 *
 * ? member variable
 * gamedurationTime -> 진행시간
 * gameEndTimestamp -> 게임이 종료된 유닉스 시간
 * ? Method 
 * datecal -> endtimestamp를 통해 지난 날짜를 계산하여 문자열로 반환.
 * duration -> ms를 분 초로 변환하여 문자열로 반환.
 * 
*/

import { PrintManager } from "./PrintManager.js"
export class PrintUserInfoSection extends PrintManager {

  constructor(parentObj, participant, obj, number) {
    super(parentObj, participant, null)
    this.nodeLength = super.getLength()
    this.participant = participant
    this.gameInfoObject = obj
    this.matchNumber = number
  }

  async inputContent() {
    this.printChampionImg()
    this.printKda()
    this.printSpellImg()
    this.printRuneImg()
    this.printItemImg()
    this.changeCssLayout()
  }

  async printChampionImg() {
    let imgTag = document.getElementsByClassName(`UserChampionDiv ${this.matchNumber}`)[0].children[0]
    super.inputContent(imgTag, { url: this.gameInfoObject.champions[this.participant.championId].imgSrc, width: 64, height: 64 })
  }
  async printKda() {
    let kda1 = this.participant.kills + "/" + this.participant.deaths + "/" + this.participant.assists
    let kda2 = (this.participant.kills + this.participant.assists) / this.participant.deaths
    super.inputContent(document.getElementsByClassName(`UserKda ${this.matchNumber}`)[0].children[0], kda1)
    super.inputContent(document.getElementsByClassName(`UserKda ${this.matchNumber}`)[0].children[1], kda2.toFixed(2) + " KDA")
  }

  async printRuneImg() {
    let mainRuneStyle = this.participant.perks.styles[0].style
    let mainRune = this.participant.perks.styles[0].selections[0].perk
    let subRuneStyle = this.participant.perks.styles[1].style

    let mainRuneTag = document.getElementsByClassName(`UserRuneDiv ${this.matchNumber}`)[0].children[0]
    let subRuneTag = document.getElementsByClassName(`UserRuneDiv ${this.matchNumber}`)[0].children[1]

    super.inputContent(subRuneTag, { url: this.gameInfoObject.runes[subRuneStyle].icon, width: 24, height: 24 })

    for (let i = 0; i < this.gameInfoObject.runes[mainRuneStyle].slots[0].runes.length; i++) {
      if (mainRune == this.gameInfoObject.runes[mainRuneStyle].slots[0].runes[i].id) {
        super.inputContent(mainRuneTag, { url: this.gameInfoObject.runes[mainRuneStyle].slots[0].runes[i].icon, width: 28, height: 28 })
      }
    }
  }
  async printSpellImg() {
    let spellDiv = document.getElementsByClassName(`UserSpellDiv ${this.matchNumber}`)[0]


    for (let i = 0; i < spellDiv.children.length; i++) {
      let spell = this.participant[`summoner${i + 1}Id`]
      super.inputContent(spellDiv.children[i], { url: this.gameInfoObject.spells[spell].imgSrc, width: 24, height: 24 })
    }
  }


  async printItemImg() {
    let div = document.getElementsByClassName(`ItemDiv ${this.matchNumber}`)[0]
    console.log(this.gameInfoObject)
    for (let i = 0; i < 6; i++) {
      let item = this.participant[`item${i}`]
      super.inputContent(div.children[i], { url: this.gameInfoObject.items[item].imgSrc, width: 32, height: 32 })
    }
  }

  async changeCssLayout() {
    let div = document.getElementsByClassName(`ResultSection ${this.matchNumber}`)[0]
    div.children[0].innerHTML === "승리" ?
      (() => {
        document.getElementsByClassName(`LogContainer ${this.matchNumber}`)[0].style.borderLeft = "10px solid rgba(79, 79, 179, 0.5)";
        document.getElementsByClassName(`LogContainer ${this.matchNumber}`)[0].style.backgroundColor = "rgba(33,58,150,0.15)";
        
        // document.getElementsByClassName(`LogContainer ${this.matchNumber}`)[0].style.borderTopRightRadius = "10px";
        // document.getElementsByClassName(`LogContainer ${this.matchNumber}`)[0].style.borderBottomRightRadius = "10px";

      })() :
      (() => {
        document.getElementsByClassName(`LogContainer ${this.matchNumber}`)[0].style.borderLeft = "10px solid rgba(235, 135, 135, 0.5)";
        document.getElementsByClassName(`LogContainer ${this.matchNumber}`)[0].style.backgroundColor = "rgba(227,70,70,0.15)"
        div.children[0].style.color = "rgb(227,70,70)"
        // document.getElementsByClassName(`LogContainer ${this.matchNumber}`)[0].style.borderTopRightRadius = "10px";
        // document.getElementsByClassName(`LogContainer ${this.matchNumber}`)[0].style.borderBottomRightRadius = "10px";
      })()

    div.style.borde
  }
}