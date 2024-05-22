import { PrintManager } from "./PrintManager.js"

export class PrintAllPlayerSection extends PrintManager {

  constructor(parentObj, participant, gameName, obj) {
    super(parentObj)
    this.nodeLength = super.getLength()
    this.participant = participant
    this.gameName = gameName
    this.userIndex;
    this.gameInfoObject = obj
  }

  async inputContent() {
    let blueDiv = super.getChild(0)
    let redDiv = super.getChild(1)

    for (let i = 0; i < blueDiv.children.length; i++) {
      let playerDiv = blueDiv.children[i]
      let name = this.getUserName(this.participant[i])
      let id = this.participant[i].championId
      let src = this.gameInfoObject.champions[id].imgSrc

      if (name == this.gameName) {
        this.userIndex = i
      }

      for (let j = 0; j < playerDiv.children.length; j++) {
        playerDiv.children[j].tagName == "P" ?
          super.inputContent(playerDiv.children[j], name) :
          super.inputContent(playerDiv.children[j], { url: src, width: 24, height: 24 })
      }
    }

    for (let i = 0; i < redDiv.children.length; i++) {
      let playerDiv = redDiv.children[i]
      let name = this.getUserName(this.participant[i + 5])
      let id = this.participant[i + 5].championId
      let src = this.gameInfoObject.champions[id].imgSrc
      if (name == this.gameName) {
        this.userIndex = i + 5
      }
      for (let j = 0; j < playerDiv.children.length; j++) {
        playerDiv.children[j].tagName == "P" ?
          super.inputContent(playerDiv.children[j], name) :
          super.inputContent(playerDiv.children[j], { url: src, width: 24, height: 24 })
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



  getUserIndex() {
    return this.userIndex
  }
}