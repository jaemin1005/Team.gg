import Database from 'better-sqlite3';

class InsertPlayLog{
  constructor(){
    this.insertPlayLog = "INSERT INTO playLog (puuid, gameId, gameType) VALUES (?, ?, ?)";
  }

  insertPlayLog(puuid, arr, gameType){
    let query = this.db.prepare(this.insertPlayLog);
    for(let ele of arr){
      query.run(puuid, ele, gameType);
    }
    this.db.close();
  }

}