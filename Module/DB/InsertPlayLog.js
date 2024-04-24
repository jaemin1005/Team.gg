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