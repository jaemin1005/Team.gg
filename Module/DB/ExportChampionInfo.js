// * 단위테스트 * 
const Database = require("better-sqlite3");

class ExportChampionInfo{
  constructor() {
   this.champQuery = "SELECT * FROM champion where key = ?"; 
   this.db = new Database("./summoner.db", { verbose: console.log });
   this.db.pragma("journal_mode = WAL");
  }
  exportChampionInfo(key){
    let string = this.champQuery;
    let query = this.db.prepare(string);
    let champObj = query.get(key);
    this.db.close();
    return champObj;
  }
}
module.exports = ExportChampionInfo;