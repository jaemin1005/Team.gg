import Database from 'better-sqlite3';
class InsertUser{
  constructor(){
    this.insertSummonerObject = `INSERT INTO summoners (puuid, gameName, tagLine) VALUES (?, ?, ?)`;
    this.db = new Database("./summoner.db", { verbose: console.log });
   this.db.pragma("journal_mode = WAL");
  }

  summonerInsert(obj){
    const {puuid,gameName,tagLine} = obj;
     let insert = this.db.prepare(this.insertSummonerObject);
    try{
      insert.run(puuid, gameName, tagLine);
    }catch(error){
      console.error(error.message);
    } 
  }

}