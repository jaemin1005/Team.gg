//* 모듈 분기
//* 모듈 처리 


//#region  --Require--

// * 환경 변수의 값이 있으면 해당 변수들에게 환경변수에 적힌 값이 적용된다. 
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const PATH = process.env.DirPATH || __dirname;

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const user = require("./Module/User.js");
const JSONCOMMAND = require('./Module/EnumCommand.js');
const RiotAPI = require('./Module/Api.js');

//#endregion --Require--


//#region  --Express--
// * 이렇게 사용하면 서버를 시작하기 전에 환경 변수를 설정해 포트를 덮어 쓸 수 있음.
// const PORT = process.env.PORT || 3000;
// const app = express();

// /**
//  * * app.get은 라우트를 추가하는 메서드(GET, POST etc..)
//  * * 두 개의 매개변수를 가짐. 경로, 함수
//  * ! 경로는 기본적으로 대소문자를 구분하지 않으며 경로 끝에 슬래시가 있든 없든 똑같 동작, 쿼리스트링 역시 무시 :)
//  * ! 익스프레스는 기본적으로 상태 코드 200을 반환한다.  
//  */
// app.get('/', (req, res) => {
//   res.type('text/plain');
//   res.send('Meadowlark Travel');
// })

// app.get('/about', (req, res) =>{
//   res.type('text/plain');
//   res.send('About Meadowlark Travel');
// })


// app.use((req, res) => {
//   res.type('text/plain');
//   res.status(404);
//   res.send('404 - Not Found');
// })

// app.use((err, req, res, next) => {
//   console.error(err.message);
//   res.type('text/plain');
//   res.status(500);
//   res.send('500 - Server Error');
// })

// app.listen(PORT, () => console.log('Express Server Start : http://localhost:${PORT}'));







//#endregion --Express--

  /**
   * * 2024.04.18 황재민
   * * 서버 시작 하는 부분
   * * statusCode : HTTP 응답 상태 코드는 특정 HTTP 요청이 성공적으로 완료되었는지 알려줌
   * * https://developer.mozilla.org/ko/docs/Web/HTTP/Status
   */
const app = http.createServer((req, res) => 
{

  /**
   * * GET 요청 받았을 시 처리.
   * * 서버가 처음 요청 받을 때 여러 개의 GET일 올 수 있음 => Hyperlink
   * * ex) html안에서 js파일을 요청할 때
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
    ProcessPOSTMethod(req, res); 
  }

}).listen(3000, () => console.log("Server Start!!"));

/**
 * * 2024.04.19 황재민
 * * 경로에 따른 파일 선택하여 응답해준다.
 * * __dirname : __은 자바스크립트에서 기본적의 정의된 함수를 의미, 해당 소스파일까지의 경로를 나타냄
 * @param {*} res : response (응답) 을 하기 위한 매개변수
 * @param {*} path : 파일 경로
 * @param {*} contentType : Content - Type
 * @param {*} responscode  : 응답 코드. 200 (요청이 성공적으로 완료되었다는걸 나타냄
 */
function SelectFile(res, path, contentType, responscode = 200)
{
  
  fs.readFile(PATH + path, (err, data) => {
    {
      /**
       * * 파일을 읽을 수 없을 때
       * * 응답코드 500을 헤드에 넣어 응답한다. (500 : 서버가 처리방법을 모르는 상황이 발생했음을 나타냄)
       */
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

/**
 * * 2024.04.19 황재민
 * * GET으로 요청받은 url에 따라 switch에서 분기하여 원하는 파일을 건네준다.
 * @param {*} req : request (요청)
 * @param {*} res : response (응답)
 */
function SwitchPath(req, res)
{
  const path = req.url.replace(/\/?(?:\?.*)?%/, '').toLowerCase();
  switch(path){
    case '':
    case '/':
      SelectFile(res, '/doc/ServerTest.html', 'text/html');
      break;
    // case '/about':
    //   SelectDOCFile(res, '/public/about.html', 'text/html');
    //   break;
    case '/test.js':
      SelectFile(res, '/test.js', 'text/javascript');
      break;
    case '/test.css':
      SelectFile(res, '/doc/test.css', 'text/css');
      break;
    default:
      SelectFile(res, '/doc/404.html', 'text/html', 404)
      break;
  }
}

/**
 * * 2024.04.19 황재민
 * * 요청받은 POST 처리 
 * * jsonData에 require의 jsonData가 쌓인다.
 * * jsonData를 객체로 변환하여 swich문에 따라 분기가 되어 데이터 처리.
 * TODO : 데이터 베이스 처리 해야됨.
 * @param {*} req : requst의 Body는 { command : value , detail : value } JSON으로 구성되어 있다.
 * @param {*} res : response(응답)
 */
async function ProcessPOSTMethod(req, res)
{
  let jsonData = "";
  req.on('data',  (data) => jsonData += data );

  /**
   * * GetUserInfo가 끝날때 까지 대기.
   * * 대기가 끝나면(데이터 완성) res를 통해 응답.
   */
  req.on('end', async () => {
    let reqObj = JSON.parse(jsonData);
    let obj = null;
    
    /**
    * * 2024.04.18 황재민
    * * API를 이용해 해당 유저의 정보를 받아오는게 아직 구현 X
    * * CommandAPI(reqObj.command, reqObj.detail) 이런 식으로 구분해서 처리하면 되지 않을까?
    * * 현재는 정보를 받아왔다고 임의로 작성 하겠음 :)
    * *
    * * 2024.04.20 황재민
    * * reqObj.command를 구분하여 처리. JSONCOMMAND를 열거형 처럼 사용
    */  
    switch(reqObj.command)
    {
      case JSONCOMMAND.GET_USER_INFO:
        {
          obj = RiotAPI.GetUserInfo(reqObj.detail, res);
          break;
        }
      case JSONCOMMAND.GET_MATCH_INFO:
        break;
    }

    /**
     * * 제대로된 데이터를 못가져왔을 경우
     * * Status Code 204 : 이 요청에 대해 보낼 콘텐츠는 없지만 헤더가 유용 
     */
    if(obj === false)
    {
      res.writeHead(204);
      res.end();
    }

    else
    {
      res.writeHead(200);
      res.end(JSON.stringify(obj));
    }
  }); 
}