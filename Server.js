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

const LOG =require("./Module/Log.js");
const user = require("./Module/User.js");
const {JSONCOMMAND, HTMLCOMMAND} = require('./Module/EnumCommand.js');
const RiotAPI = require('./Module/Api.js');
const { checkPrime } = require('crypto');
//const { default: SummonersUpdate } = require('./Module/DB/UpdateUser.js');



// * Access Database 
//const { default: ExportPlayLog } = require('./Module/DB/ExportPlayLog.js');
// const { default: CheckUser } = require('./Module/DB/CheckUser.js');
// const { default: IoDebounce } = require('./Module/DB/DebounceOutput.js');
// const { default: ExportChampionInfo } = require('./Module/DB/ExportChampionInfo.js');
// const { default: ExportIconInfo } = require('./Module/DB/ExportIconInfo.js');
// const { default: ExportUser } = require('./Module/DB/ExportUser.js');
// const { default: InsertPlayLog } = require('./Module/DB/InsertPlayLog.js');
// const { default: InsertUser } = require('./Module/DB/InsertUser.js');
// const { default: RemoveUser } = require('./Module/DB/RemoveUser.js');
// const { default: SummonersUpdate } = require('./Module/DB/UpdateUser.js');









//#endregion --Require--
/**
 * * 2024.04.18 황재민
 * * 서버 시작 하는 부분
 * * statusCode : HTTP 응답 상태 코드는 특정 HTTP 요청이 성공적으로 완료되었는지 알려줌
 * * https://developer.mozilla.org/ko/docs/Web/HTTP/Status
 */
const app = http.createServer(async(req, res) => 
{
  
  /**
   * * GET 요청 받았을 시 처리.
   * * 서버가 처음 요청 받을 때 여러 개의 GET일 올 수 있음 => Hyperlink 
   * * ex) html안에서 js파일을 요청할 때
   */
  if(req.method == "GET"){
    
    SwitchPath(req, res);
    // ProcessPOSTMethod(req, res); 
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
        LOG("FS ERR : Failed Read File : " + PATH + path);
        res.writeHead(500, {'Content-Type' : 'text/plain'});
        res.end('500 - Internal Error');
        return;
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
  // * 정규표현식으로 해당 특수문자를 찾고 빈 공백으로 바꾼다. 
  //const path = req.url.replace(/\/?(?:\?.*)?%/, '');
  //let path = req.url.replace(/[/]+/g, ''); 
  const path = req.url;
  LOG("GET Url : " + path);

  // * MainHomePage
  if(path == '' || path == '/')
  {
    
    SelectFile(res, '/index.html', "text/html");
  }

  else if(GetExtension(path) == null)
  {
    const htmlCommand = path.split('/');
    GetHTML(res,htmlCommand[1]);
  }

  else
  {
    SelectFile(res, path, GetContentType(path));
  }
}

/**
 * * 2024-04-24 황재민
 * * 파일의 확장자를 통해, 해당 GET 요청이 파일인지 아닌지 구분 하기 위해 만들었다.
 * @param {*} fileName 파일 이름
 * @returns 파일일 경우 해당 확장자를 반환. 아니면 null 반환 :)
 */
function GetExtension(fileName)
{
  const arrWord = fileName.split('.');
  if(arrWord.length == 0)
    return null;
  let extension = arrWord[arrWord.length-1]
  if(extension == "js" || extension == "mjs" || extension == "ico" || extension == "html" || extension == "css")
  {
    return extension;
  }

  else
  {
    return null;
  }
}

/**
 * * 2024-04-24 황재민
 * * 클라이언트의 요청에 따라, 해당 url를 보내준다
 * * ex) http://localhost:3000/summoner/
 * * summoner만 잘라서 매개변수로 :) 
 * @param {*} res 응답
 * @param {*} name 요청한 url을 split한 부분
 */
function GetHTML(res, name)
{
  switch(name)
  {
    case HTMLCOMMAND.SUMMONERS:
    {
      const path = "/public/HTML/userInfo.html"
      SelectFile(res, path, GetContentType(path));
    }
  }
}



/**
 * * 2024.04.23 황재민
 * * 각 파일의 확장자에 맞게 Content-Type을 수정한다.
 * @param {*} fileName : 파일 이름
 * @returns : Content-Type
 */
function GetContentType(fileName)
{
  let extension = GetExtension(fileName);
  let contentType = null;

  if(extension == "js" || extension == "mjs")
    contentType = "text/javascript";
  else if(extension == "ico")
    contentType = "image/x-icon";
  else if(extension == "html" || extension == '/' || extension == '')
    contentType = "text/html";
  else if(extension == "css")
    contentType = "text/css";
  else
    contentType = "Multipart/related";
  return contentType;
}


/**
 * * 2024.04.19 황재민
 * * 요청받은 POST 처리 
 * * jsonData에 require의 jsonData가 쌓인다.
 * * jsonData를 객체로 변환하여 swich문에 따라 분기가 되어 데이터 처리.
 *  - 2024 _ 04 _ 24 v 배성빈 TODO : 데이터 베이스 처리 해야됨. 
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
          obj = await RiotAPI.GetUserInfo(reqObj.detail, res);
          console.log(obj);

          if(obj != null)
          {
            /**
            * *  2024.04.23 황재민
            * *  asnyc 함수는 항상 promise를 반환한다.
            * *  async function의 반환값이 암묵적으로 Promise.resolve로 감싸지기 때문이다.
            */
            const promise1 = RiotAPI.GetUserChampMastery(obj);
            //const promise2 = await RiotAPI.GetMatchInfo(obj);
            //await Promise.all(promise1, promise2).catch(() => obj = null);
          }
          break;
        }
      /**
       * * 2024.04.24 황재민
       * * User 정보 갱신
       * * req.detail에 User.js의 클래스 User를 보내주면 될 듯 합니다.
       */
      case JSONCOMMAND.UPDATE_USER_INFO:{
          obj = reqObj.detail;
          
          const promise1 = RiotAPI.GetUserChampMastery(obj);
          const promise2 = RiotAPI.GetMatchInfo(obj);
          await Promise.all([promise1, promise2]).catch(() => obj = null);
        }
        break;
      
      /**
       * * 2024.04.24 황재민
       * * Match 정보를 더 요청한다. ex) (0 ~ 20) => (0 ~ 40) 개를 더 요청할 때.
       * * req.detail User.js의 클래스 User에 property에 call을 추가하여 호출횟수를 보내 주었으면 함. 
       */
      case JSONCOMMAND.MORE_MATCH_INFO:{
          obj = reqObj.detail;

          await RiotAPI.GetMatchInfo(obj, obj.call).catch(() => obj = null);
        }
    }

    /**
     * * 제대로된 데이터를 못가져왔을 경우
     * * Status Code 204 : 이 요청에 대해 보낼 콘텐츠는 없지만 헤더가 유용 
     */
    if(obj === null){
      res.writeHead(204);
      res.end();
    }

    else{
      res.writeHead(200);
      res.end(JSON.stringify(obj));
    }
  }); 
}