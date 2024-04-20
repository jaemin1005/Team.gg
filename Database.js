/**
 * * 날짜 : 2024.04.17
 * * 이름 : 배성빈
 * * 설명 : 서버와 데이터베이스의 통신 구현
 */


// !puuid, name, tag로 만들어진 프로토타입 테이블이라 
//! enum.js랑 합치면 다시 업데이트 하겠슴당 
const DataBase = require("better-sqlite3");

class Manager{
  //? constructor Role : db access || check summoners TBL
  constructor(accessDB){
    this.db = new DataBase("./summoner.db", { verbose: console.log });
    this.db.pragma("journal_mode = WAL");
    let check = this.db.prepare("SELECT COUNT(*) FROM sqlite_master WHERE name='summoners'");
    let isTrue = check.get(); //? check.get => bool type
    //summoners 테이블이 존재하지 않으면 생성.
    if(isTrue === !true){ 
      this.db.exec("CREATE TABLE summoners (puuid TEXT PRIMARY KEY,name TEXT,tag TEXT)");
    }
    else{
      return;
    } 
  }

  summonerInsertData(obj){
    const {puuid,name,tag} = obj;
     insert = this.db.prepare(`INSERT INTO summoners (${ele}) VALUES (?)`);
    try{
      insert.run(puuid, name, tag);
    }catch(error){
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
    }catch(error)
    { 
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

let obj = {
  "puuid": "m1VXGEiSIiTjtPGGWGVWYg7cmi27PR-RUQN_kv_LEcuCdWiz1tFuP6Ssuc2g",
  "name": "터검니",
  "tag": "000"
};

let mng = new Manager();
mng.insertData(obj);

