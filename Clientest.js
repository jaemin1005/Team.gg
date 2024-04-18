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

function readJSONResponse(response) {
  var responseData = '';
  response.on('data', function (chunk) {
    responseData += chunk;
  });
  response.on('end', function () {
    var dataObj = JSON.parse(responseData);
    console.log("Raw Response: " +responseData);
    console.log("Message: " + dataObj.message);
    console.log("Question: " + dataObj.question);
  });
}


var req = http.request(clientOption, readJSONResponse);
req.write('{"name":"Bilbo", "occupation":"Burglar"}');
req.end();
