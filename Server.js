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
const url = require("url");

const { Script } = require("vm");

const app = http.createServer((req, res) => 
{
  /**
   * * statusCode : HTTP 응답 상태 코드는 특정 HTTP 요청이 성공적으로 완료되었는지 알려줌
   * * https://developer.mozilla.org/ko/docs/Web/HTTP/Status
   */


  // if(req.method == "connetction")
  // {
  //   res.writeHead(200);
  //   res.write(fs.readFileSync("ServerTest.html"));
  //   res.end();  
  // }


  /**
   * * GET 요청 받았을 시 처리.
   */
  if(req.method == "GET")
  {
    SwitchPath(req, res);
  }
  
  /**
   * * POST 요청 받았을 시 처리.
   */
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

/**
 * 
 * @param {*} res 
 * @param {*} path 
 * @param {*} contentType 
 * @param {*} responscode 
 */
function SelectDOCFile(res, path, contentType, responscode = 200)
{
  fs.readFile(__dirname + path, (err, data) => {
    {
      // * 파일을 읽지 못하였을 떄
      if(err)
      {
        res.writeHead(500, {'Content-Type' : 'text/plain'});
        return res.end('500 - Internal Error');
      }

      res.writeHead(responscode, {'Content-Type' : contentType});
      res.end(data);
    }
  })
}

function SwitchPath(req, res)
{
  const path = req.url.replace(/\/?(?:\?.*)?%/, '').toLowerCase();
  switch(path){
    case '':
    case '/':
      SelectDOCFile(res, '/doc/ServerTest.html', 'text/html');
      break;
    case '/about':
      SelectDOCFile(res, '/public/about.html', 'text/html');
      break;
    default:
      SelectDOCFile(res, '/public/404.html', 'text/html', 404)
      break;
  }
}