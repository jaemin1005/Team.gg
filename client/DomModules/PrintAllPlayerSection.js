import { PrintManager } from "./PrintManager.js"

export class PrintAllPlayerSection extends PrintManager {

  constructor(parentObj, participant) {
    super(parentObj)
    this.nodeLength = super.getLength()
    this.participant = participant
  }

  async inputContent() {
    let blueDiv = super.getChild(0)
    let redDiv = super.getChild(1)

    for (let i = 0; i < blueDiv.children.length; i++) {
      let playerDiv = blueDiv.children[i]
      let name = this.getUserName(this.participant[i])
      let champURL = await this.getChampionImg(this.participant[i])
      for (let j = 0; j < playerDiv.children.length; j++) {
        playerDiv.children[j].tagName == "P" ?
          super.inputContent(playerDiv.children[j], name) :
          super.inputContent(playerDiv.children[j], { url: champURL, width: 24, height: 24 })
      }
    }
    
    for (let i = 0; i < redDiv.children.length; i++) {
      let playerDiv = redDiv.children[i]
      console.log(playerDiv)
      let name = this.getUserName(this.participant[i + 5])
      let champURL = await this.getChampionImg(this.participant[i + 5])
      for (let j = 0; j < playerDiv.children.length; j++) {
        playerDiv.children[j].tagName == "P" ?
          super.inputContent(playerDiv.children[j], name) :
          super.inputContent(playerDiv.children[j], { url: champURL, width: 24, height: 24 })
      }
    }
  }

  getUserName(user) {
    let name;

    user["riotIdGameName"].length > 5 ?
      name = user["riotIdGameName"].substr(0, 5) + "..." :
      name = user["riotIdGameName"]

    return name
  }

  async getChampionImg(user) {
    let imgName = user["championName"]
    let res = await fetch(`/champImg/${imgName}_0`)
    let blob = await res.blob()
    let url = await URL.createObjectURL(blob)
    return url
  }
}