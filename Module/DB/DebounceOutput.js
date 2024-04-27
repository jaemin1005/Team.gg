/*
 * 날짜 : 2024-04-24
 * 작성자 : 배성빈
 * 설명 : Database.js를 리팩토링하여 모듈로 분할
 * 입력받은 문자를 기준으로 해당 문자를 포함하며 후열에 다른 문자열이 나열된 name을 찾아 반환.
 ? @ member : summoner db에 접근, 쿼리문 작성 
 ? @ param {*}: client를 통해 받아온 문자열 or 문자
 ? @ return : 배열, 객체
 * - 작동 확인이 필요하며 해당 로직이 필요한 지. 매 입력마다 DB에 접근해야할 필요가 존재하는 지 고려해야함. (불필요한 통신으로 성능 저하를 고려), 가져올 배열, 객체의 양을 지정해야함.
*/
const Database = require("better-sqlite3");

class IoDebounce {
  constructor() {
    this.CheckQuery = "SELECT * FROM summoners WHERE gameName LIKE ?";
    this.db = new Database("./summoner.db", { verbose: console.log });
    this.db.pragma("journal_mode = WAL");
  }
  nameComplete(str) {
    try {
      const receive = this.db.prepare(this.CheckQuery);
      const string = `${str}%`
      let list = receive.all(`${string}`);
      this.db.close();
      return list;
    } catch (error) {
      this.db.close();
      console.error(error.message);
    }
  }
}

module.exports = IoDebounce;