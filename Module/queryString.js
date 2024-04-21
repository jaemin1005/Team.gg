const querySQL = {
  userTable : ["summoners","playLog","sessionTier", "mostPlay"],
  ddragon : ["champion", "item", "rune"],
  insertSummonerObject : `INSERT INTO summoners (puuid, gameName, tagLine) VALUES (?, ?, ?)`,
  firstCreateSummonerTbl : `CREATE TABLE summoners (puuid TEXT PRIMARY KEY,name TEXT,tag TEXT)`, 
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

Object.freeze(querySQL);
module.export = querySQL;


// const querySQL = {
//   create : "CREATE TABLE",
//   insert : "INSERT INTO",
//   select : "SELECT * FROM",
//   delete : "DELETE FROM",

//   selectWhereLike : function(...str){
//     if (typeof str == Object || typeof str == []){
//       switch(str.length){
//         case 1: return `${this.select} ${str[0]}`;
//         case 2: return `${this.select} ${str[0]} WHERE ${str[1]} LIKE ?`
//         default : console.error("error"); return;
//       }
//     }  
//   },
//   removeWhere : function(...str){
//     if (typeof str == Object || typeof str == []){
//       switch(str.length){
//         case 1: return `${this.delete} ${str[0]}`;
//         case 2: return `${this.select} ${str[0]} WHERE ${str[1]}`
//         default : console.error("error"); return;
//       }
//     }  
//   },
//   selectAll : function(str){
//     return `SELECT * FROM ${str}`;
//   },
//   summonerInsertData(obj){
//     const {puuid , name, tag} = obj;
//     try{
//       insert.run(puuid, name, tag);
//     }catch(error){
//       console.error(error.message);
//     } 
//   },
  
  
// }

// Object.freeze(querySQL);
// Object.freeze(tableType);