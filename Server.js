//* 모듈 분기
//* 모듈 처리 

/**
 * * 날짜 : 2024.04.17
 * * 이름 : 황재민
 * * 설명 : Http 서버 만들기
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const user = require("./Module/User.js");

const app = http.createServer((req, res) => 
{
  /**
   * * statusCode : HTTP 응답 상태 코드는 특정 HTTP 요청이 성공적으로 완료되었는지 알려줌
   * * https://developer.mozilla.org/ko/docs/Web/HTTP/Status
   */

  if(req.method == "connetction")
  {
    res.writeHead(200);
    res.write(fs.readFileSync("ServerTest.html"));
    res.end();  
  }


  if(req.method == "GET")
  {
    //res.setHeader("Content-Type", "text/html");
    //res.writeHead(200);
    //res.write(fs.readFileSync("ServerTest.html"));
    //res.write();
    //res.end();   
  }

  if(req.method == "POST")
  {
    let jsonData = "";
    req.on('data',  (data) => jsonData += data );

    req.on('end', function () {
      let reqObj = JSON.parse(jsonData);

      /**
      * * API를 이용해 해당 유저의 정보를 받아오는게 아직 구현 X
      * * CommandAPI(reqObj.command, reqObj.detail) 이런 식으로 구분해서 처리하면 되지 않을까?
      * * 현재는 정보를 받아왔다고 임의로 작성 하겠음 :)
      */
      let dummyObj = new user.CreateUser("#45622", "터검니", "000");
      res.writeHead(200);
      res.end(JSON.stringify(dummyObj));
    });
  }

}).listen(3000, () => console.log("Server Start!!"));


