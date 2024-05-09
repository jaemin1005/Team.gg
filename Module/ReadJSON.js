const fs = require('fs');
const func = require('./FullName');


let ReadJSON = async (path, callbackFunc) => {

  await new Promise((res, rej) => {fs.readFile(path, "utf-8", (err, data) => {
      if(err){
        Log('Error Reading File: ', CHAMPION_JSON_DATA);
        rej();
      }

      const jsonData = JSON.parse(data);
      Object.keys(jsonData.data).forEach(key => {
        let KeyObj = jsonData.data[key];
        callbackFunc(KeyObj, key);
        res();
      });
    })
  });

  console.log("hi");
}

module.exports = ReadJSON;