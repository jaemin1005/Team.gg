let dragEvent = (ele)=>{

  ele.onmousedown = ()=>{
    ele.style.position = 'absolute'
    document.body.append(ele)
  }

}