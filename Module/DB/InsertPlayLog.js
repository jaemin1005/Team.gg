/*
 * 날짜 : 2024-04-24
 * 작성자 : 배성빈
 * 설명 : Database.js를 리팩토링하여 모듈로 분할
 * match v5 api를 호출하여 로그 배열을 받았을 때 호출된다. - 외래키 : puuid, gameType : rank , nomal ...
 ? @ member : summoner db에 접근, 쿼리문 작성
 ? @ param {*}: 해당 유저의 puuid, arr, gametype을 받음.
 ? @ return : -
 * - prototype에서 사용하지 않는 정보는 포함시키지 않았으며 추후 필요한 데이터를 분류해둔 ERD 기준으로 수정 예정
*/



const Database = require("better-sqlite3");

class InsertPlayLog{
  constructor(){
    this.insertPlayLog = "INSERT INTO playLog (puuid, gameId, gameType) VALUES (?, ?, ?)";
    this.db = new Database("./summoner.db", { verbose: console.log });
    this.db.pragma("journal_mode = WAL");
  }

  insertPlayLog(puuid, arr, gameType){
    let query = this.db.prepare(this.insertPlayLog);
    for(let ele of arr){
      query.run(puuid, ele, gameType);
    }
    this.db.close();
  }

}

module.exports = InsertPlayLog;