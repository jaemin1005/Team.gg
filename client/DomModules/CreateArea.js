export class CreateArea {

  constructor(number) {
    this.currentId = {}
    this.root = document.getElementById("match")
    this.matchNum = number
  }
  CreateLogArea(Root, current = this.root) {
    let keys = Object.keys(Root)
    for (let i = 0; i < keys.length; i++) {
      if (Array.isArray(Root)) {
        this.currentId[current.id] = current
        for (let j = 0; j <= Root.length / 2; j += 2) {
          for (let k = 0; k < Root[j + 1]; k++) {
            let tag = document.createElement(Root[j]);
            current.appendChild(tag)
          }
        }
        return
      }
      else {
        let newTag = document.createElement("div")
        newTag.setAttribute("class", `${keys[i]}`+" "+`${this.matchNum}`)
        current.appendChild(newTag)
        this.CreateLogArea(Root[keys[i]], newTag)
      }
    }
  }
  getCurrentId() {
    return this.currentId
  }
}
