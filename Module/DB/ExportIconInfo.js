/*
 * 날짜 : 2024-04-24
 * 작성자 : 배성빈
 * 설명 : Database.js를 리팩토링하여 모듈로 분할
 * icon의 id로 이미지 경로에 접근할 수 있게 도와줌.
 ? @ member : summoner db에 접근. 
 ? @ param {*}: icon의 id
 ? @ return : -
 * 테스트 종료 후 summoners table의 column 작성이 완료되면 삭제를 고려. - id와 img파일에 이름을 맞추는 형태로 해결 가능
*/
const Database = require("better-sqlite3");
class ExportIconInfo {
  constructor() {
    this.iconQuery = "SELECT * FROM icon where iconId = ?";
    this.db = new Database("./summoner.db", { verbose: console.log });
    this.db.pragma("journal_mode = WAL");
  }
  exportIconInfo(iconId) {
    let query = this.db.prepare(this.iconQuery);
    let iconObj = query.get(iconId);
    this.db.close();
    return iconObj;
  }
}

module.exports = ExportIconInfo;