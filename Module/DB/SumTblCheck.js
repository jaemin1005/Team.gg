/*
 * 날짜 : 2024-04-24
 * 작성자 : 배성빈
 * 설명 : Database.js를 리팩토링하여 모듈로 분할
 * 테이블 체크 후 존재하지 않는 테이블을 생성.
 ? @ member : summoner db에 접근. 
 ? @ param {*}: 해당 User의 puuid와 객체화된 데이터를 매개변수로 받음.
 ? @ return : -
 * - 예비용, 메인이 되는 스크립트인 api.js에서 사용하지 않는다.
*/


const Database = require("better-sqlite3");
class SummonerTableCheck{
  constructor(){
    this.checkSummonersTbl = "SELECT COUNT(*) FROM sqlite_master WHERE name='summoners'";
    this.firstCreateSummonerTbl = `CREATE TABLE summoners (puuid TEXT PRIMARY KEY,gameName TEXT,tagLine TEXT)`;
    this.db = new Database("./summoner.db", { verbose: console.log });
    this.db.pragma("journal_mode = WAL");
  }

  tableCheck(){
    let check = this.db.prepare(querySQL.checkSummonersTbl);
    let isTrue = Object.values(check.get()) * 1; 
    console.log(isTrue);
    if(isTrue == !true){ 
      this.db.exec(querySQL.firstCreateSummonerTbl);
      this.db.close();
    }else{
      this.db.close();
      return;
    } 
  }
}
module.exports = SummonerTableCheck;

