//* 모듈 분기
//* 모듈 처리 


//#region  --Require--

// * 환경 변수의 값이 있으면 해당 변수들에게 환경변수에 적힌 값이 적용된다. 
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const LOG =require("./Module/Log.js");
const {JSONCOMMAND, HTMLCOMMAND} = require('./Module/EnumCommand.js');
const RiotAPI = require('./Module/Api.js');

const ChampionInfo = require("./Module/ChampionInfo");
const SpellInfo = require("./Module/SpellInfo");
const ItemInfo = require("./Module/ItemInfo");


<<<<<<< HEAD

http.createServer((req,res) => {

  if(req.method == "GET"){
    ProcessGETMethod(req,res);
=======
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
  console.log(req.url);
  
  if(req.method == "GET"){
    SwitchPath(req, res);
>>>>>>> origin/develop
  }
})
.listen(3000, () => {
  console.log("서버 시작하였음");
  console.log("http://localhost:3000");
});


async function ProcessGETMethod(req, res){

  //* Main Html 
  if(req.url ==='/'){
    SelectFile(res, 'index.html', "text/html");
    return;
  }

  //* Summoner 상세정보
  if(req.url.startsWith("/summoner/")){
    const parseUrl = url.parse(req.url, true);
    const query = parseUrl.query;

    //* 쿼리가 있다고 판단한다.
    if(Object.keys(query).length > 0){
      let path = "public/HTML/userInfo.html"
      SelectFile(res, path, GetContentType(path));
    }

    else{
      req.url = req.url.replace("/summoner/","");
      SelectFile(res, req.url, GetContentType(req.url));
    }
  }

  else if(req.url.startsWith("/searchuser/","")){
    const parseUrl = url.parse(req.url, true);
    const query = parseUrl.query;
    
    const server = query["first_search_form_select"];
    const name = query["userName_input"];

    let obj = await RiotAPI.GetUserInfo(name, res);
    if(obj != null){
        
      /**
      * *  2024.04.23 황재민
      * *  asnyc 함수는 항상 promise를 반환한다.
      * *  async function의 반환값이 암묵적으로 Promise.resolve로 감싸지기 때문이다.
      */

      const promise1 = RiotAPI.GetUserChampMastery(obj);
      const promise2 = RiotAPI.GetMatchInfo(obj);
      //const promise3 = await Promise.all(promise1, promise2).catch(() => obj = null);

      await Promise.all([promise1, promise2]);

      if(obj != null){
        obj["champions"] = ChampionInfo;
        obj["spells"] = SpellInfo;
        obj["items"] = ItemInfo;

        res.writeHead(200);
        res.end(JSON.stringify(obj));
      }

      else{
        res.writeHead(204);
        res.end();
      }
    }
  }

  //* 기타 다른 파일들 :)
  else {
    SelectFile(res, req.url, GetContentType(req.url));
  }
}

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
  let filePath = path;
  if(filePath[0] === '/')
    filePath = filePath.substring(1);
  

  fs.readFile(filePath, (err, data) => {
    {
      /**
       * * 파일을 읽을 수 없을 때
       * * 응답코드 500을 헤드에 넣어 응답한다. (500 : 서버가 처리방법을 모르는 상황이 발생했음을 나타냄)
       */
      if(err)
      {
        LOG("FS ERR : Failed Read File : " + path);
        res.writeHead(500, {'Content-Type' : 'text/plain'});
        res.end('500 - Internal Error');
        return;
      }

      res.writeHead(responscode, {'Content-Type' : contentType});
      res.end(data);
    }
  })
}

<<<<<<< HEAD
=======


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



>>>>>>> origin/develop
/**
 * * 2024.04.23 황재민
 * * 각 파일의 확장자에 맞게 Content-Type을 수정한다.
 * @param {*} fileName : 파일 이름
 * @returns : Content-Type
 */
function GetContentType(fileName)
{
  let split = fileName.split('.');
  //let extension = GetExtension(fileName);
  let extension = split[split.length-1];
  let contentType = null;

  if(extension == "js" || extension == "mjs")
    contentType = "text/javascript";
  else if(extension == "ico")
    contentType = "image/x-icon";
  else if(extension == "html" || extension == '/' || extension == '')
    contentType = "text/html";
  else if(extension == "css")
    contentType = "text/css";
  else if(extension == "png")
    contentType = "image/png";
  else
    contentType = "Multipart/related";
  return contentType;
}

