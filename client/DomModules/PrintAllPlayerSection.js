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

    this.imgTagSize = 24
  }

  async inputContent() {

    // AllplayerSection BlueTeam DIV 출력. 
    // ? this.blueDiv.children.length -> BlueTeam 인원을 의미한다. 


    for (let i = 0; i < this.blueDiv.children.length; i++) {

      let playerDiv = this.blueDiv.children[i]
      let name = this.getUserName(this.participant[i])
      let playChampionId = this.participant[i].championId
      let playerChampionImgSrc = this.gameInfoObject.champions[playChampionId].imgSrc

      if (name == this.clientName) {
        this.userIndex = i
      }

      for (let j = 0; j < playerDiv.children.length; j++) {
        playerDiv.children[j].tagName == "P" ?
          super.inputContent(playerDiv.children[j], name) :
          super.inputContent(playerDiv.children[j], { url: playerChampionImgSrc, width: this.imgTagSize, height: this.imgTagSize })
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