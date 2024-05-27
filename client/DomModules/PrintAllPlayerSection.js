import { PrintManager } from "./PrintManager.js"

export class PrintAllPlayerSection extends PrintManager {

  constructor(parentObj, participant, clientName, obj) {
    super(parentObj)
    this.participant = participant
    this.clientName = clientName
    this.gameInfoObject = obj

    this.userIndex;
    this.blueDiv = super.getChild(0)
    this.redDiv = super.getChild(1)
  }

  async inputContent() {

    for (let i = 0; i < this.blueDiv.children.length; i++) {
      let playerDiv = this.blueDiv.children[i]
      let name = this.getUserName(this.participant[i])
      let id = this.participant[i].championId
      let src = this.gameInfoObject.champions[id].imgSrc

      if (name == this.clientName) {
        this.userIndex = i
      }

      for (let j = 0; j < playerDiv.children.length; j++) {
        playerDiv.children[j].tagName == "P" ?
          super.inputContent(playerDiv.children[j], name) :
          super.inputContent(playerDiv.children[j], { url: src, width: 24, height: 24 })
      }
    }

    for (let i = 0; i < this.redDiv.children.length; i++) {
      let playerDiv = this.redDiv.children[i]
      let name = this.getUserName(this.participant[i + 5])
      let id = this.participant[i + 5].championId
      let src = this.gameInfoObject.champions[id].imgSrc

      if (name == this.clientName) {
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
      name = user["riotIdGameName"].substr(0, 4) + "..." :
      name = user["riotIdGameName"]
    return name
  }

  getUserIndex() {
    return this.userIndex
  }
}