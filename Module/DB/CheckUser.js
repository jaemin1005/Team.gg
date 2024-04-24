// *  단위 테스트 O
import Database from 'better-sqlite3';
class CheckUser {
  constructor(params) {
    this.checkQuery = "SELECT * FROM summoners where puuid = ?";
    this.db = new Database("./summoner.db", { verbose: console.log });
    this.db.pragma("journal_mode = WAL");
  }

  checkExistence(puuid) {
    let string = "SELECT * FROM summoners WHERE puuid = ?";
    let query = this.db.prepare(string);
    let result = query.get(puuid);
    this.db.close();
    try{
      return result;
    }catch{
      console.log(error)
    }

  }
}

export default CheckUser;