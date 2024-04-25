/*
 * 날짜 : 2024-04-24
 * 작성자 : 배성빈
 * 설명 : Database.js를 리팩토링하여 모듈로 분할
 * 제공받은 유저의 정보를 summoners table에서 삭제.
 ? @ member : summoner db에 접근. 
 ? @ param {*}: 해당 User의 puuid와 객체화된 데이터를 매개변수로 받음.
 ? @ return : -
 * - prototype에서는 summoners table이외는 불필요하기에 추후 수정 가능성이 존재.
*/

const Database = require("better-sqlite3");
class RemoveUser{
  constructor() {
    this.deleteQuery =  "DELETE FROM summoners WHERE puuid = ?";
    this.db = new Database("./summoner.db", { verbose: console.log });
    this.db.pragma("journal_mode = WAL");
  }
  removeData(puuid){
    let remove = this.db.prepare(this.deleteQuery);
    remove.run(puuid);
    this.db.close();
  }
}

module.exports = RemoveUser;