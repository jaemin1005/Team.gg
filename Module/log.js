require("dotenv").config();
const LOG_STATE = process.env.LOG;

const fs = require("fs");
const Queue = require("./queue.js");
const Time = require("./Time.js");
const Title = "INFO\n";

/**
 * * 2024.04.22 황재민
 * * Log 파일을 만드는 곳
 * * 파일이 없으면 파일을 해당 title로 만든다.
 * @param {*} filePath : 파일 경로
 * @param {*} title  : 파일 타이틀
 * @returns
 */
function CreateLogFile(filePath, title) {
  if (fs.existsSync(filePath) == true) return;
  else {
    fs.writeFileSync(filePath, title);
  }
}

/**
 * * 2024.04.22 황재민
 * * filePath는 log디렉토리를 가리키며, 파일을 저장한다.
 * * 문자열들을 queue에 저장하며, 문자열을 하나씩 뽑아와 해당 텍스트파일에 기록한다.
 * @returns
 */
function WriteLog() {
  /**
   * * date 날짜를 기록하기 위한 변수
   * * filePath : 파일 위치
   * * queue : 문자열 저장
   * * isWrite : 현재 작성중인지 확인
   */
  let date = new Date();
  let queue = new Queue();
  let isWrite = false;
  const title = "LOG START\n";

  /**
   * * 클로져
   * * 해당 파일이 작성 중이면 (isWirte == true) 빠져나간다
   * * 작성 중이 아니면 비동기 상태에서 queue에 문자열이 없는 동안 계속 파일에 써나간다.
   * * 작성이 끝나면 isWrite는 false로 바뀜.
   */
  return async function (text) {
    queue.enqueue(text);
    if (isWrite == true) return;
    else {
      // Promise 가 Pending 이어야만 then. 가능 async, await =>
      // Promise race(), all()
      await new Promise((res, rej) => {
        isWrite = true;
        while (queue.peek() != null && isWrite == true) {
          CreateLogFile(Time.GetLogFileName(), Title);

          if (LOG_STATE === "DEBUG") console.log(text);
          
          let strText = Time.GetLogline() + queue.dequeue() + "\n";
          fs.appendFileSync(Time.GetLogFileName(), strText);
        }
        isWrite = false;
      });
    }
  };
}

let Log = WriteLog();

// ! 05.12 이종수
// module.exports = Log;
const LogAPICallCount = (count) => {
  Log(`API 호출 횟수: ${count}회`);
};

module.exports = { Log, LogAPICallCount };
// ! 05.12 이종수
