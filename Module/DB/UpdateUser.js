/*
 * 날짜 : 2024-04-24
 * 작성자 : 배성빈
 * 설명 : Database.js를 리팩토링하여 모듈로 분할
 * Summoners table의 특정 열을 업데이트, 갱신 
 ? @ member : summoner db에 접근. 
 ? @ param {*}: 해당 User의 puuid와 객체화된 데이터를 매개변수로 받음.
 ? @ return : -
 * - 범용성에 대해 고려. 해당 모듈로 모든 정보를 업데이트할 수 있나 검토. 
*/
const Database = require("better-sqlite3");

class SummonersUpdate{
  constructor(){
    this.db = new Database("./summoner.db", { verbose: console.log });
    this.db.pragma("journal_mode = WAL");
  }
  summonerUpdate(puuid, obj){
    let keys = Object.keys(obj).join(" = ?, "); keys += " = ?";
    console.log(keys);
    let string = "UPDATE summoners SET "+keys+" Where puuid = ?"
    let values = Object.values(obj);
    let query = this.db.prepare(string);
    // console.log(string);
    // console.log(...values, puuid);
    query.run(...values, puuid);    
    this.db.close();
  }
}

module.exports = SummonersUpdate;