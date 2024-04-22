/**
 * * 날짜 : 2024.04.17
 * * 이름 : 배성빈
 * * 설명 : 서버와 데이터베이스의 통신 구현
 */
<<<<<<< HEAD

const query_ = require("./Module/queryString.js");
const DataBase = require("better-sqlite3");


=======
const DataBase = require("better-sqlite3");
>>>>>>> origin/develop
class Manager{
  constructor(){
    this.db = new DataBase("./summoner.db", { verbose: console.log });
    this.db.pragma("journal_mode = WAL");
  }

<<<<<<< HEAD
  tableCheck(){
    let check = this.db.prepare(querySQL.checkSummonersTbl);
    let isTrue = check.get(); 
    if(isTrue === !true){ 
      this.db.exec(querySQL.firstCreateSummonerTable);
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



  receive
  





}

let obj = {
  "puuid": "m1VXGEiSIiTjtPGGWGVWYg7cmi27PR-RUQN_kv_LEcuCdWiz1tFuP6Ssuc2g",
  "name": "터검니",
  "tag": "000"
};

let mng = new Manager();
mng.insertData(obj);

module.exports = Manager;
=======
  createSummonerDB(){
    let check = this.db.prepare("SELECT COUNT(*) FROM sqlite_master WHERE name='summoners'");
    let canCreate = check.get();
    if(canCreate === !true){
      this.db.exec("CREATE TABLE summoners (puuid TEXT PRIMARY KEY,name TEXT,tag TEXT)");
    }else{ return; } 
  }
  insertData(obj){
    let insert = this.db.prepare(
      "INSERT INTO summoners (puuid, name, tag) VALUES (?, ?, ?)"  
    );
    const {puuid , name, tag} = obj;
    try{
      insert.run(puuid, name, tag);
    } catch(error){
      console.error(error.message);
    } 
  }

  removeData(puuid){
    //* db에 저장된 데이터를 서버로 전달해 서버에서 api에 요청했지만 존재하지 않는 아이디(계정 삭제, 기타)일 경우 
    const remove = this.db.prepare("DELETE FROM summoners WHERE puuid = ?");
    remove.run(`${puuid}`);
  }
  // 이름을 입력하면 입력 단어를 포함하는(앞에 글자가 존재한다면 제외)리스트 반환
  receiveName(str){
    try{
      const receive = this.db.prepare("SELECT * FROM summoners WHERE name LIKE ?");
      const string = `${str}%`
      let list = receive.all(`${string}`);
      console.table(list);
    }catch(error){
      console.error(error.message);
    }
    
  }
  //테스트 
  returnAll(){
    let table = this.db.prepare("SELECT * FROM summoners");
    let i = table.get();
    console.table(i);
  }
}


// let request = require("request");
// let key;//환경변수 설정.
// let id; //request 타고 오는 거/
>>>>>>> origin/develop
