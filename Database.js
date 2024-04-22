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
  select :function(tbl){
    return `SELECT * FROM ${tbl}`
  },
  delete : function(puuid){
    return `DELETE FROM ? WHERE puuid = ${puuid}`
  },
  update : function(keys, puuid){
    return `UPDATE summoners SET ${keys} WHERE puuid = ${puuid}` 
  },
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
    if(isTrue === !true){ 
      this.db.exec(querySQL.firstCreateSummonerTbl);
    }else{
      return;
    } 
  }

  //* 검색을 통한, 첫번째 api 호출 (puuid, gameName, taøgLine)를 받는 메서드
  summonerInsert(obj){
    const {puuid,name,tag} = obj;
     insert = this.db.prepare(querySQL.insertSummonerObject);
    try{
      insert.run(puuid, name, tag);
    }catch(error){
      console.error(error.message);
    } 
  }
  summonerUpdate(puuid, obj){
    let keys = Object.keys(obj).join(" = ?, "); keys += " = ?";
    let values = Object.values(obj);
    let query = this.db.query(
     querySQL.update(keys, puuid)
    );
    query.run(...values);    
  }
  //* 삭제된 계정이라면 해당 열을 삭제해야함.
  removeData(puuid){
    let tbl = querySQL.userTable;
    let remove = this.db.prepare(querySQL.delete(puuid));
    for(let element of tbl){
      remove.run(element);
    }
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
    let query = this.db.prepare(querySQL.select(`summoners`));
    let userObj = query.get();
    console.table(userObj);
  }
}

let obj = {
  "puuid": "m1VXGEiSIiTjtPGGWGVWYg7cmi27PR-RUQN_kv_LEcuCdWiz1tFuP6Ssuc2g",
  "name": "터검니",
  "tag": "000"
};

let mng = new Manager();
mng.tableCheck();
// mng.summonerInsert(obj);

module.exports = Manager;
