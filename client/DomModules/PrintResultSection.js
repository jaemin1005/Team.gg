import { PrintManager } from "./PrintManager.js"
/**
 * * PrintResultSection
 * 2024/05/21 배성빈 : ResultSection 내부에 data들을 삽입하는 클래스.
 * #role 
 * ? constructor
 * @param {*} parentObj : 하위 node로 pTag, imgTag를 직접적으로 상속하고 있는 부모 태그를 의미한다.
 * @param {*} arr : 가공된 data가 배열의 형태로 들어온다. ex) ["결과", "게임 타입", "진행 시간", "지난 시간"]

 * ? member variable
 * * super를 통해 부모 클래스를 인스턴스. 
 * * this.nodeLength : parentObj가 가지고 있는 자식의 갯수, 인스턴스 된 부모 객체에게 받아온다.
 * * this.arr : param으로 들어온 배열로 초기화.
 *
 * ? Method 
 * inputContent()
 * 생성자를 통해 생선된 멤버 변수인 nodeLength까지 for문이 동작. i를 index로써 부모 클래스인 getChild를 호출하여 child 변수에 리턴을 담는다. 
 * 그 후 super.inputContent(child, arr[i]) 호출을 통해 해당 태그에 content 삽입.
*/
export class PrintResultSection extends PrintManager {

  constructor(parentObj, arr) {
    super(parentObj)
    this.nodeLength = super.getLength()
    this.arr = arr
  }

  inputContent() {
    console.log(this.nodeLength)
    for (let i = 0; i < this.nodeLength; i++) {
      let child = super.getChild(i)
      super.inputContent(child, this.arr[i])
    }
  }
}