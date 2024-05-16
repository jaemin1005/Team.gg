//* 모듈 분기
//* 모듈 처리

//#region  --Require--

// * 환경 변수의 값이 있으면 해당 변수들에게 환경변수에 적힌 값이 적용된다.
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const http = require("http");
const fs = require("fs");
const path = require("path");



// ! 05.12 이종수
const {Log, LogAPICallCount} = require("./Module/Log.js");
const { JSONCOMMAND, HTMLCOMMAND } = require("./Module/EnumCommand.js");
const RiotAPI = require("./Module/Api.js");

const ChampionInfo = require("./Module/ChampionInfo");
const SpellInfo = require("./Module/SpellInfo");
const ItemInfo = require("./Module/ItemInfo");
const RuneInfo = require("./Module/RuneInfo");
const func = require('./Module/Api.js');


/**
 * * 2024.05.10 황재민
 * * Get으로 리뉴얼 하였음.
 */
http.createServer((req,res) => {
  if(req.method == "GET"){
    ProcessGETMethod(req,res);
  }
})
.listen(3000, () => {
  console.log("서버 시작하였음");
  console.log("http://localhost:3000");
});


/**
 * * 2025.05.10 황재민
 * * Get을 처리하기 위한 함수
 * @param {*} req : 요청
 * @param {*} res : 응답
 * @returns
 */
async function ProcessGETMethod(req, res){
  //* Main Html
  if(req.url ==='/'){
    SelectFile(res, 'main.html', "text/html");
    return;
  }
  if(req.url.startsWith("/summoner/")) ReqSearchUser(req,res);
  //else if(req.url.startsWith("/searchuser/")) ReqSearchUser(req,res);
  else if(req.url.startsWith("/json/")) ReqJSON(req,res);
  else ReadFiles(req,res);
}
/**
 * * 2024.05.11 황재민
 * * 가공된 Riot data를 읽어오기 위한 함수
 * @param {*} req : 요청
 * @param {*} res : 응답
 */
async function ReqJSON(req, res){
  const reqEtag = req.headers['if-none-match'];
  if(reqEtag != undefined && reqEtag == process.env.RIOT_DATA_VERSION){
     res.writeHead(304);
     res.end();
  }
  else{
    try{
      res.setHeader('ETag', process.env.RIOT_DATA_VERSION);
      let resObj = {};
      resObj.version = process.env.RIOT_DATA_VERSION;
      
      const promise1 = ChampionInfo().then((res) => resObj["champions"] = res);
      const promise2 = SpellInfo().then((res) => resObj["spells"] = res);
      const promise3 = ItemInfo().then((res) => resObj["items"] = res);
      const promise4 = RuneInfo().then((res) => resObj["runes"] = res);

      await Promise.all([promise1,promise2,promise3,promise4]);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(resObj));
    } catch(err) {
      res.writeHead(500);
      res.end('Server JSON Error');
    }
  }
}

/**
 * * 2024.05.13 황재민
 * * 파일 읽어오기
 * @param {*} req 클라이언트 요청
 * @param {*} res 서버 응답
 */
function ReadFiles(req, res){
  //* Resource 같은 경우 대용량 파일이 대부분이다.
  //* createReadStream을 이용하여 파일을 읽는다.
  if(req.url.startsWith("/resources/")){
    const reqEtag = req.headers['if-none-match'];
    //* 버전에 맞는 이미지 파일인지 확인
    if(reqEtag != undefined && reqEtag === process.env.RIOT_DATA_VERSION){
      res.writeHead(304);
      res.end();
    }
    else{
      res.setHeader('ETag', process.env.RIOT_DATA_VERSION);
      res.setHeader('Content-Type', GetContentType(req.url));
      //* 캐시를 설정하여 해당 Resouce를 저장한다.
      res.setHeader('Cache-Control', 'public, no-transform, max-age=15552000');
      ReadResouceFile(req.url, res);
    }
  }
  //* 일반 문서 파일들
  else{
    SelectFile(res, req.url, GetContentType(req.url));
  }
}

/**
 * * 2024.05.13 황재민
 * * 소환사 정보 요청
 * @param {*} req 클라이언트 요청
 * @param {*} res 서버 응답
 */
function ReqSummoner(req, res){
  const parseUrl = url.parse(req.url, true);
  const query = parseUrl.query;
  //* Summoner의 Html을 보낸다.
  if(Object.keys(query).length > 0){
    let path = "public/HTML/userInfo.html"
    SelectFile(res, path, GetContentType(path));
  }
  else{
    req.url = req.url.replace("/summoner/","");
    SelectFile(res, req.url, GetContentType(req.url));
  }
}

/**
* * 2024.05.11 황재민
* * 요청한 유저의 정보를 처리하기 위한 조건문
* * 쿼리스트링으로 유저의 아이디를 받고, 그 아이디를 이용하여 API를 처리한다
* *.
* * 2024.05.13 황재민
* * SPA로 변경, 쿼리스트링으로 요청하지 않음
*/
async function ReqSearchUser(req, res){



  let name = req.url.replace("/summoner/","");
  name = decodeURI(name);
  name = name.replace("-", "#");


  //* 유저의 puuid, gameName, tagLine의 정보를 받아옴.
  let obj = await RiotAPI.GetUserInfo(name, res);
  if(obj != null){
    //* 유저의 챔피언 숙련도 정보
    const promise1 = RiotAPI.GetUserChampMastery(obj);
    //* 유저의 매칭 정보
    const promise2 = RiotAPI.GetMatchInfo(obj);
    //* 유저의 프로필 아이콘 번호, 랭크 정보.
    const promise3 = RiotAPI.GetAccountID(obj);

    //* 유저의 최근 매칭
    const promise4 = RiotAPI.GetCurrentGame(obj);


<<<<<<< HEAD

    await Promise.all([promise1, promise2,promise3,promise4]).catch(() => (obj = null));
    Log("API Call Num : " + RiotAPI.nKeyCount);

=======
    await Promise.all([promise1, promise2,promise3]).catch(() => (obj = null));
>>>>>>> origin/develop
    if(obj != null){
      res.writeHead(200);
      res.end(JSON.stringify(obj));
    }
    else{
      res.writeHead(204);
      res.end();
    }
  }
  //* 해당 유저의 정보가 없음.
  else{
    res.writeHead(204);
    res.end();
  }
}
function ReadResouceFile(path, res){
  if(path[0] === '/')
      path = path.substring(1);
  const readStream = fs.createReadStream(path);
  readStream.on("error", (err) => {
    Log("Resource Read Err : " + path );
    res.statusCode = 500;
    res.end();
  });
  readStream.pipe(res);
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
function SelectFile(res, path, contentType, responscode = 200) {
  let filePath = path;
  if (filePath[0] === "/") filePath = filePath.substring(1);

  fs.readFile(filePath, (err, data) => {
    {
      /**
       * * 파일을 읽을 수 없을 때
       * * 응답코드 500을 헤드에 넣어 응답한다. (500 : 서버가 처리방법을 모르는 상황이 발생했음을 나타냄)
       */
      if (err) {
        Log("FS ERR : Failed Read File : " + path);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 - Internal Error");
        return;
      }

      res.writeHead(responscode, { "Content-Type": contentType });
      res.end(data);
    }
  });
}
/**
 * * 2024.04.23 황재민
 * * 각 파일의 확장자에 맞게 Content-Type을 수정한다.
 * @param {*} fileName : 파일 이름
 * @returns : Content-Type
 */

function GetContentType(fileName)
{
  let split = fileName.split('.');
  let extension = split[split.length-1];
  let contentType = null;
  if (extension == "js" || extension == "mjs") contentType = "text/javascript";
  else if (extension == "ico") contentType = "image/x-icon";
  else if (extension == "html" || extension == "/" || extension == "")
    contentType = "text/html";
  else if (extension == "css") contentType = "text/css";
  else if (extension == "png") contentType = "image/png";
  else contentType = "Multipart/related";
  return contentType;
}

