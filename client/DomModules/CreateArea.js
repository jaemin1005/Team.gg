/**
 * * CreateArea.js
 * 2024/05/21 배성빈 : DOMElementContainer.js 를 접근하는 모듈로, 재귀를 통해 배열이 나올 때 까지 객체 내부의 객체를 접근한다. 
 * 배열에 접근한다면 Return을 통해 재귀를 중단하며, 배열 내부의 n%2 = 0 , n%2 = 1을 통하여 태그와 갯수를 판단하는 로직을 통해, HTML 요소를 생성하는 
 * 역할을 수행한다.

 * #role 
 * ? constructor
 * @param {*} number : 해당 LogContainer의 넘버 라벨링을 의미함.
 *
 * ? member variable
 * this.currentId = {} ? 불필요한 멤버변수. 수정 전 IMG 태그와 P태그를 가진 HTML 부모 태그를 currentId 에 추가함으로 접근해주는 역할을 진행할 수 있게 된다.
 * gameEndTimestamp -> 게임이 종료된 유닉스 시간
 * ? Method 
 * datecal -> endtimestamp를 통해 지난 날짜를 계산하여 문자열로 반환.
 * duration -> ms를 분 초로 변환하여 문자열로 반환.
 * 
*/

export class CreateArea {

  constructor(number) {
    this.currentId = {}
    this.root = document.getElementById("main")
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
