// *  단위 테스트 O
const Database = require("better-sqlite3");
class CheckUser {
  constructor(params) {
    this.checkQuery = "SELECT * FROM summoners where puuid = ?";
    this.checkName =  "SELECT * FROM summoners where gameName = ? tagLine = ?";
    this.db = new Database("./summoner.db", { verbose: console.log });
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