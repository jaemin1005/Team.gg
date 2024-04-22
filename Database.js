/**
 * * 날짜 : 2024.04.17
 * * 이름 : 배성빈
 * * 설명 : 서버와 데이터베이스의 통신 구현
 */

const querySQL = {
  userTable : ["summoners","playLog","sessionTier", "mostPlay"],
  ddragon : ["champion", "item", "rune"],
  insertSummonerObject : `INSERT INTO summoners (puuid, gameName, tagLine) VALUES (?, ?, ?)`,
  firstCreateSummonerTbl : `CREATE TABLE summoners (puuid TEXT PRIMARY KEY,gameName TEXT,tagLine TEXT)`, 
  checkSummonersTbl : "SELECT COUNT(*) FROM sqlite_master WHERE name='summoners'",
  create : "CREATE TABLE",
  insert : "INSERT INTO",
  select : function(str){
    switch(str){
      case "summoners":
        return "SELECT * FROM summoners where puuid = ?"
      case "playLog" :
        return "SELECT * FROM playLog where puuid = ?"
      case "sessionTier":
        return "SELECT * FROM sessionTier where puuid = ?"
    }
  },
  delete : function(str){
    switch(str){
      case "summoner":
        return "DELETE FROM summoners WHERE puuid = ?"
      case "playLog" :
        return "DELETE FROM playLog WHERE puuid = ?"
      case "sessionTier":
        return "DELETE FROM sessionTier WHERE puuid = ?"
    }
  },


  update : `UPDATE summoners SET ? WHERE puuid = ?`
}


const DataBase = require("better-sqlite3");

class Manager{
  constructor(){
    this.db = new DataBase("./summoner.db", { verbose: console.log });
    this.db.pragma("journal_mode = WAL");
  }


  tableCheck(){
    let check = this.db.prepare(querySQL.checkSummonersTbl);
    let isTrue = Object.values(check.get()) * 1; 
    console.log(isTrue);
    if(isTrue == !true){ 
      this.db.exec(querySQL.firstCreateSummonerTbl);
    }else{
      return;
    } 
  }

  //* 검색을 통한, 첫번째 api 호출 (puuid, gameName, taøgLine)를 받는 메서드
  summonerInsert(obj){
    const {puuid,name,tag} = obj;
     let insert = this.db.prepare(querySQL.insertSummonerObject);
    try{
      insert.run(puuid, name, tag);
    }catch(error){
      console.error(error.message);
    } 
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
  
  //* 삭제된 계정이라면 해당 열을 삭제해야함.
  
  removeData(puuid,tbl){
    let remove = this.db.prepare(querySQL.delete(tbl));
    remove.run(puuid);
  }
  // 검색 자동 완성 
  nameComplete(str){
    try{
      const receive = this.db.prepare(
        `${querySQL.select("summoners")} WHERE gameName LIKE ?`);
      const string = `${str}%`
      let list = receive.all(`${string}`);
    }catch(error)
    { 
      console.error(error.message);
    }
    return list;
  }


  exportUserInfo(puuid){
    let string = querySQL.select("summoners");
    let query = this.db.prepare(string);
    let userObj = query.get(puuid);
    return userObj;
  }

  checkExistence(puuid){
    let string = querySQL.select("summoners");
    let query = this.db.prepare(string);
    if(query.get(puuid) == null || query.get(puuid) == undefined){
      return false;
    }
    return true;
  }
}


let mng = new Manager();

module.exports = Manager;
