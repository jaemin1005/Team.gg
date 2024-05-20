const fs = require('fs');
const func = require('./FullName');


/**
 * * 2024.05.09 황재민
 * * Riot 정보가 적혀있는 JSON을 읽기 위한 함수
 * * JSON 파일을 읽어서 객체로 만들어준다.
 * @param {*} path : JSON 파일 위치
 * @param {*} callbackFunc  : 콜백 함수
 */
let ReadJSON = async (path, callbackFunc, property = "data") => {
  await new Promise((res, rej) => {fs.readFile(path, "utf-8", (err, data) => {
      if(err){
        console.log('Error Reading File: ' + path);
        rej();
      }

      const jsonData = JSON.parse(data);
      
      //* Riot의 데이터는 data프로퍼티에 상세정보가 적혀있다 
      Object.keys(jsonData[property]).forEach(key => {
        let KeyObj = jsonData.data[key];
        callbackFunc(KeyObj, key);
      });
      res();
    })
  });
}

module.exports = ReadJSON;