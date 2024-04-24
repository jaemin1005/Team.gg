/**
 * * 날짜 : 2024.04.17
 * * 이름 : 배성빈
 * * 설명 : 서버와 데이터베이스의 통신 구현
 */


const path = require('path');
const DataBase = require("better-sqlite3");
require("dotenv").config();

console.log(process.env.PATH);



const querySQL = {
  gameType : {
    ranked : "0",
    nomal : "1",
    tourney : "2",
  },
  insertPlayLog : "INSERT INTO playLog (puuid, gameId, gameType) VALUES (?, ?, ?)",
  updatePlayLog : "UPDATE playLog SET gameId = ?, gameType = ? Where puuid = ?", 
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
      case "champion" : 
        return "SELECT * FROM champion where key = ?"
      case "icon":
        return "SELECT * FROM icon where iconId = ?"
      default : break;
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



class Manager{
  constructor(){
    // this.db = new DataBase("Database/summoner.db", { verbose: console.log });
    this.db = new DataBase("../../Database/summoner.db", { verbose: console.log });
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
    const {puuid,gameName,tagLine} = obj;
     let insert = this.db.prepare(querySQL.insertSummonerObject);
    try{
      insert.run(puuid, gameName, tagLine);
    }catch(error){
      console.error(error.message);
    } 
  }
  // *특정 정보를 업데이트 , 객체의 형태로 사용 가능

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
  
  insertPlayLog(puuid, arr, gameType){
    let string = querySQL.insertPlayLog;
    let query = this.db.prepare(string);
    for(let ele of arr){
      query.run(puuid, ele, gameType);
    }
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
    }catch(error){ 
      console.error(error.message);
    }
    return list;
  }


  // ! Export용 SELECT 문 리팩토링 때 함수로 빼두기

  async exportUserInfo(puuid){
    let string = querySQL.select("summoners");
    let query = this.db.prepare(string);
    let userObj = query.get(puuid);
    return userObj;
  }

  exportBattleLog(puuid){
    let string = querySQL.select("playLog");
    let query = this.db.prepare(string);
    let logObj = query.all(puuid);
    let arr =[];
    for(let ele of logObj){
      arr.push(ele.gameId);
    }
    return arr;
  }

  exportChampionInfo(key){
    let string = querySQL.select("champion");
    let query = this.db.prepare(string);
    let champObj = query.get(key);
    return champObj;
  }

  exportIconInfo(iconId){
    let string = querySQL.select("icon");
    let query = this.db.prepare(string);
    let iconObj = query.get(iconId);
    return iconObj;
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

// console.log(mng.exportIconInfo("1"));
console.log(mng.exportBattleLog("m1VXGEiSIiTjtPGGWGVWYg7cmi27PR-RUQN_kv_LnHrAZLRt-IPFmZYTBZEcuCdWiz1tFuP6Ssuc2g"));



module.exports = Manager;
