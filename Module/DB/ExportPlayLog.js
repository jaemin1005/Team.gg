/*
 * 날짜 : 2024-04-24
 * 작성자 : 배성빈
 * 설명 : Database.js를 리팩토링하여 모듈로 분할
 * puuid를 통해 일정량(한 페이지에서 기본적으로 출력되는 대전 기록의 갯수 - 미정)의 대전기록을 반환
 ? @ member : summoner db에 접근, 쿼리문 작성
 ? @ param {*}: 해당 User의 puuid
 ? @ return : -
 * - 현재는 대전기록의 코드만 반환하는 구조이기에 arr의 형태로 반환하지만 추후 테스트가 종료되면 객체의 형태로 반환해야할 필요 존재.
*/
const Database = require("better-sqlite3");
class ExportPlayLog {
  constructor() {
    this.logQuery = "SELECT * FROM playLog where puuid = ?";
    this.db = new Database("./summoner.db", { verbose: console.log });
    this.db.pragma("journal_mode = WAL");
  }
  exportBattleLog(puuid) {
    let query = this.db.prepare(this.logQuery);
    let logObj = query.all(puuid);
    let arr = [];
    for (let ele of logObj) {
      arr.push(ele.gameId);
    }
    this.db.close();
    return arr;
  }
}

module.exports = ExportPlayLog;