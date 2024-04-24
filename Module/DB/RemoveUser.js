import Database from 'better-sqlite3';

class RemoveUser{
  constructor() {
    this.deleteQuery =  "DELETE FROM summoners WHERE puuid = ?";
    this.db = new Database("./summoner.db", { verbose: console.log });
   this.db.pragma("journal_mode = WAL");
  }
  removeData(puuid,tbl){
    let remove = this.db.prepare(this.deleteQuery);
    remove.run(puuid);
  }
}
export default RemoveUser;