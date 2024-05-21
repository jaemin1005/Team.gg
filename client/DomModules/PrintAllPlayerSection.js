export class PrintAllPlayerSection extends PrintManager {

  constructor(parentObj, participant) {
    super(parentObj)
    this.nodeLength = super.getLength()
    this.participant = participant
  }

  inputContent() {
    let name = this.getUserName(this.participant)
    let champURL = this.getChampionImg(this.participant)

    for (let i = 0; i < this.nodeLength; i++) {
      let child = super.getChild(i)

      if (child.tagName == "P") {
        super.inputContent(child, name)
      }
      else {
        super.inputContent(child, { url: champURL, width: 24, height: 24 })
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