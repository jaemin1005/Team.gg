/*
 * 날짜 : 2024-04-24
 * 작성자 : 배성빈
 * 설명 : Database.js를 리팩토링하여 모듈로 분할
 * 처음 호출한 api가 제공하는 정보를 일괄적으로 담는 함수. 고정적으로 3가지 정보가 들어오기에 정적 구조분해 문법을 사용
 ? @ member : summoner db에 접근. 
 ? @ param {*}: api를 통해 받은 소환사 정보가 담긴 객체를 매개변수로 받음
 ? @ return : -
 * - 
*/

const Database = require("better-sqlite3");

class InsertUser{
  constructor(){
    this.insertSummonerObject = `INSERT INTO summoners (puuid, gameName, tagLine) VALUES (?, ?, ?)`;
    this.db = new Database("./summoner.db", { verbose: console.log });
    this.db.pragma("journal_mode = WAL");
  }

  summonerInsert(obj){
    const {puuid,gameName,tagLine} = obj;
     let insert = this.db.prepare(this.insertSummonerObject);
    try{
      insert.run(puuid, gameName, tagLine);
    }catch(error){
      console.error(error.message);
    } 
  }

}

module.exports = InsertUser;