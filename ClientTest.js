var http = require('http');
const path = require('path');

var clientOption = {
  host: "localhost",
  port: "3000",
  path: "/?year=2017&month=July",
  method: "POST"
}

// function HandleRes(res)
// {
//   let serverData = "";
//   res.on('DataJs', () => console.log("Client: DataJs"));
//   res.on('data', () => console.log("Client : Res Data"));
//   res.on('end', () => console.log("Client : Res End"));
// }

/**
 * * 2024.04.18
 * * 황재민
 * * 요청한 POST 통신을 통한 응답처리
 * @param {*} response : Server로 부터 받은 값.
 */
function readPOSTJSONResponse(response) {
  var responseData = '';

  response.on('data', (data) => responseData += data);

  // * JSON값 파싱하여 객체에 넣어주기.
  response.on('end', () => {
      let obj = JSON.parse(responseData);
      console.log("User Id : " + obj.puuId);
      console.log("USer Name : " + obj.gameName);
      console.log("User Tag : " + obj.tag);      
  });
}

/**
 * * 2024.04.18
 * * 황재민
 * * 요청한 GET 통신을 통한 응답처리
 * @param {*} response 
 */
function readGETResponse(response)
{
  let responseData = ""
  response.on("data", (chunk) => responseData += chunk);
  response.on("end", () => {
   console.log("Response Status : ", response.statusCode)
   console.log("Response Headers : ", response.headers);
   console.log(responseData); 
  })
}

/**
 * * POST 요청 보내기
 */
function TestPOSTRequest()
{
  let req = http.request(clientOption, readPOSTJSONResponse);
  req.write('{"command":"reqUser", "detail":"터검니#000"}');
  req.end();
}

/**
 * * GET 요청 보내기
 */
function TestGETRequest()
{
  clientOption.method = "GET";
  var req = http.request(clientOption, readGETResponse);

  req.end();
}

TestGETRequest();