let section = document.getElementsByClassName("right_section")[0];




function createSetElement(tagName, attri = {}){
  
  if (attri != null && attri != undefined){
    let element = document.createElement(tagName);
    
    let keys = Object.keys(attri);
    console.log(keys);
    

    for(let i =0; i < keys.length; i++){
      element.setAttribute(keys[i], attri[keys[i]])
    }
    
    return element;

  }else{
    return;
  }

}


function loadRecordArea(){
  
  let logLabel = createSetElement("div" , {"id" : "logLabel", "class" : "game_record"})
  let main = createSetElement("div", {"class": "main_game_record"})
  let shadow = createSetElement("div", {"class":"shadow_game_record"})
  let container = createSetElement("div", {"class" : "right_section_left_container", "id":"game_record"})
  let mainSec1 = createSetElement("div", {"id" : "mainSec1"})
  let mainSec2 = createSetElement("div", {"id" : "mainSec2"})
  
  section.appendChild(container)
  container.appendChild(logLabel)
  logLabel.appendChild(main)
  logLabel.appendChild(shadow)  
  main.appendChild(mainSec1)
  main.appendChild(mainSec2)

}

for(let i = 0; i < 5; i ++){
  loadRecordArea()
}

