/**
 * * 날짜 : 2024.04.17
 * * 이름 : 황재민
 * * 설명 : Http 서버 만들기
 */
const http = require("http");
const fs = require("fs");

const app = http.createServer((req, res) => 
{
  /**
   * * statusCode : HTTP 응답 상태 코드는 특정 HTTP 요청이 성공적으로 완료되었는지 알려줌
   * * https://developer.mozilla.org/ko/docs/Web/HTTP/Status
   */
  // req.on('data', () => ResData(req,res));


  // res.writeHead(200); 
  // res.on('data', () => {ResData(req,res)})
  // res.end(fs.readFileSync("./ServerTest.html"))
  var jsonData = "";
  req.on('data', function (chunk) {
    jsonData += chunk;
  });
  req.on('end', function () {
    var reqObj = JSON.parse(jsonData);
    var resObj = {
      message: "Hello " + reqObj.name,
      question: "Are you a good " + reqObj.occupation + "?"
    };
    res.writeHead(200);
    res.end(JSON.stringify(resObj));
  });

}).listen(3000, () => console.log("Server Start!!"));;


function ResData(req, res)
{
  console.log(res);
  console.log(req);
}
