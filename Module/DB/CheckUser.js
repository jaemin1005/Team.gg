/*
 * 날짜 : 2024-04-24
 * 작성자 : 배성빈
 * 설명 : Database.js를 리팩토링하여 모듈로 분할
 * 해당 소환사의 존재 유무를 bool 형태로 반환
 ? @ member : summoner db에 접근, 쿼리문 작성
 ? @ param {*}: 해당 User의 puuid
 ? @ return : boolean
 *
*/
const Database = require("better-sqlite3");
class CheckUser {
  constructor(params) {
    this.checkQuery = "SELECT * FROM summoners where puuid = ?";
    this.checkName =  "SELECT * FROM summoners where gameName = ? AND tagLine = ?";
    this.db = new Database("DataBase/summoner.db", { verbose: console.log });
    this.db.pragma("journal_mode = WAL");
  }

  checkExistencePuuid(puuid) {
    let query = this.db.prepare(this.checkQuery);
    let result = query.get(puuid);
    this.db.close();
    try{
      return result;
    }catch{
      console.log(error)
    }
  }

  checkExistenceName(nameArr) {
    let query = this.db.prepare(this.checkName);
    let result = query.get(nameArr[0], nameArr[1]);
    this.db.close();
    try{
      return result;
    }catch{
      console.log(error)
      return null;
    }
  }
}

module.exports = CheckUser;