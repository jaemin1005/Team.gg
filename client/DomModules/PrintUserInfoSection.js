import { PrintManager } from "./PrintManager.js"

import { spellChange } from "./spellChange.js"

export class PrintUserInfoSection extends PrintManager {

  constructor(parentObj, participant, obj, number) {
    super(parentObj, participant, null)
    this.nodeLength = super.getLength()
    this.participant = participant
    this.childObj = {}
    this.section;
    this.gameInfoObject = obj
    this.matchNumber = number
  }

  searchElement() {
    for (let i = 0; i < this.nodeLength; i++) {
      let child = super.getChild(i)
      this.childObj[child.class] = child
    }
    this.nodeLength === 1 ?
      this.section = "BOTTOM" :
      this.section = "TOP"
  }

  async inputContent() {
    this.searchElement()
    this.printChampionImg()
    this.printKda()
    this.printSpellImg()
    this.printRuneImg()
    this.printItemImg()
    this.changeCssLayout()
  }

  async printChampionImg() {
    let imgTag = document.getElementsByClassName(`UserChampionDiv ${this.matchNumber}`)[0].children[0]
    super.inputContent(imgTag , {url : this.gameInfoObject.champions[this.participant.championId].imgSrc, width : 48, height : 48})
  }
  async printKda() {
    let kda1 = this.participant.kills + "/" + this.participant.deaths + "/" + this.participant.assists
    let kda2 = (this.participant.kills + this.participant.assists) / this.participant.deaths
    super.inputContent(document.getElementsByClassName(`UserKda ${this.matchNumber}`)[0].children[0], kda1)
    super.inputContent(document.getElementsByClassName(`UserKda ${this.matchNumber}`)[0].children[1], kda2.toFixed(2))
  }

  async printRuneImg() {
    let mainRuneStyle = this.participant.perks.styles[0].style
    let mainRune = this.participant.perks.styles[0].selections[0].perk
    let subRuneStyle = this.participant.perks.styles[1].style

    super.inputContent(this.childObj[`UserRuneDiv ${this.matchNumber}`].children[1], {url : this.gameInfoObject.runes[subRuneStyle].icon, width:24, height : 24})

    for (let i = 0; i < this.gameInfoObject.runes[mainRuneStyle].slots[0].runes.length; i++) {
      if (mainRune == this.gameInfoObject.runes[mainRuneStyle].slots[0].runes[i].id) {
        super.inputContent(this.childObj[`UserRuneDiv ${this.matchNumber}`].children[0], {url:this.gameInfoObject.runes[mainRuneStyle].slots[0].runes[i].icon, width:32, height : 32})
      }
    }
  }
  async printSpellImg() {
    let child = this.childObj[`UserSpellDiv ${this.matchNumber}`].children
    for (let i = 0; i < child.length; i++) {
      let spell = this.participant[`summoner${i + 1}Id`]
      let spellName = spellChange[spell]
      let res = await fetch(`/spellImg/${spellName}`)
      let blob = await res.blob()
      let url = await URL.createObjectURL(blob)
      super.inputContent(child[i], { url: url, width: 28, height: 28 })
    }
  }


  async printItemImg() {
    let div = document.getElementsByClassName(`ItemDiv ${this.matchNumber}`)[0]
    console.log(this.gameInfoObject)
    for (let i = 0; i < 6; i++) {
      let item = this.participant[`item${i}`]
      super.inputContent(div.children[i], {url:this.gameInfoObject.items[item].imgSrc, width : 32 , height : 32})
    }
  }

  async changeCssLayout(){
    let div = document.getElementsByClassName(`ResultSection ${this.matchNumber}`)[0]
    div.children[0].innerHTML === "승리" ? 
    document.getElementsByClassName(`LogContainer ${this.matchNumber}`)[0].style.border = "1px solid #87CEEB" : 
    document.getElementsByClassName(`LogContainer ${this.matchNumber}`)[0].style.border = "1px solid #eb8787"  
  }
}