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

