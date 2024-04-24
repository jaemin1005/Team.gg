import Database from 'better-sqlite3';
class SummonersUpdate{
  constructor(){
    this.db = new Database("./summoner.db", { verbose: console.log });
    this.db.pragma("journal_mode = WAL");
  }
  summonerUpdate(puuid, obj){
    let keys = Object.keys(obj).join(" = ?, "); keys += " = ?";
    console.log(keys);
    let string = "UPDATE summoners SET "+keys+" Where puuid = ?"
    let values = Object.values(obj);
    let query = this.db.prepare(string);
    // console.log(string);
    // console.log(...values, puuid);
    query.run(...values, puuid);    
    this.db.close();
  }
}

export default SummonersUpdate;