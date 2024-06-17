/**
 * * PrintManager
 * 2024/05/21 배성빈 : 상속을 위한 최상위 부모 클래스. 
 * ! 해당 클래스는 직접적인 인스턴스를 허용하지 않으며, 오로지 자식 클래스의 생성자에서 super을 통해 인스턴스 할 수 있다.
 * #role 
 * ? constructor
 * @param {*} parentObj : 하위 node로 pTag, imgTag를 직접적으로 상속하고 있는 부모 태그를 의미한다.
 *
 * ? member variable
 * * this.parentObj : 인자로 받은 parentObj로 초기화. 
 * * this.nodeLength : parentObj가 가지고 있는 자식의 갯수.
 *
 * ? Method 
 * getChild(index) 
 * @param {*} index : this.parentObj의 자식 노드를 인덱스로 접근하는 용도. 
 * @return : 해당 인덱스의 자식 노드를 반환한다. 
 * 
 * inputContent(child,content)
 * @param {*} child : pTag or imgTag
 * @param {*} content : string or object
 * 태그의 타입을 판단. p태그라면 cotent(string)을 innerHTML을 통해 삽입, img태그라면 content(object)의 url, width, height를 구조 분해하여 삽입.
*/


export class PrintManager {

  constructor(parentObj) {
    this.parentObj = parentObj
    if(parentObj !== undefined && parentObj !== null ){
      this.nodeLength = this.parentObj.children.length
    }
  }
  getChild(index = 0) { 
    if(this.parentObj.children[index] !== undefined){
      return this.parentObj.children[index]
    }else{
      return false
    } 
  }
  getLength() {
    try{
      return this.nodeLength
    }catch(error){
      console.error(error)
    }    
  }

  inputContent(child, content) {
    if (child.tagName === "P") {
      child.innerHTML = content
    } else if (child.tagName === "IMG") {
      let { url, width, height } = content
      child.src = url
      child.width = width
      child.height = height
    }
  }

  async getChampionImg(user) {
    let imgName = user["championName"]
    let res = await fetch(`/champImg/${imgName}_0`)
    let blob = await res.blob()
    let url = await URL.createObjectURL(blob)
    return url
  }

}