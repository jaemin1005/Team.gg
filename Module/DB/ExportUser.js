/*
 * 날짜 : 2024-04-24
 * 작성자 : 배성빈
 * 설명 : Database.js를 리팩토링하여 모듈로 분할
 * 제공받은 puuid를 통해 db에 접근. 해당 유저의 정보를 객체의 형태로 반환.
 ? @ member : summoner db에 접근, 쿼리문 작성
 ? @ param {*}: 해당 User의 puuid
 ? @ return : -
 * - 
*/

const Database = require("better-sqlite3");
class ExportUser{
  constructor() {
    this.findQuery = "SELECT * FROM summoners where puuid = ?";
    this.db = new Database("./summoner.db", { verbose: console.log });
    this.db.pragma("journal_mode = WAL");
  }
  async exportUserInfo(puuid){
    let query = this.db.prepare(this.findQuery);
    let userObj = query.get(puuid);
    this.db.close();
    return userObj;
  }
}

module.exports = ExportUser;