var http = require('http');
const path = require('path');

var clientOption = {
  host: "localhost",
  port: "3000",
  path: "/ClientTest.html",
  method: "POST"
}

// function HandleRes(res)
// {
//   let serverData = "";
//   res.on('DataJs', () => console.log("Client: DataJs"));
//   res.on('data', () => console.log("Client : Res Data"));
//   res.on('end', () => console.log("Client : Res End"));
// }

function readPOSTJSONResponse(response) {
  var responseData = '';

  response.on('data', (data) => responseData += data);

  response.on('end', () => {
      let obj = JSON.parse(responseData);
      console.log("User Id : " + obj.puuId);
      console.log("USer Name : " + obj.gameName);
      console.log("User Tag : " + obj.tag);      
  });
}

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


function TestPOSTRequest()
{
  let req = http.request(clientOption, readPOSTJSONResponse);
  req.write('{"command":"reqUser", "detail":"터검니#000"}');
  req.end();
}

function TestGETRequest()
{
  clientOption.method = "GET";
  var req = http.request(clientOption, readGETResponse);

  req.end();
}

TestGETRequest();