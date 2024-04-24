const Database = require("better-sqlite3");

class RemoveUser{
  constructor() {
    this.deleteQuery =  "DELETE FROM summoners WHERE puuid = ?";
    this.db = new Database("./summoner.db", { verbose: console.log });
    this.db.pragma("journal_mode = WAL");
  }
  removeData(puuid,tbl){
    let remove = this.db.prepare(this.deleteQuery);
    remove.run(puuid);
    this.db.close();
  }
}

module.exports = RemoveUser;