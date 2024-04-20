const tableType = {
  summoner : "summoner",
  log : "playLog",
  most : "mostPlay",
  tier : "sessionTier"
}

const querySQL = {
  create : "CREATE TABLE",
  insert : "INSERT INTO",
  select : "SELECT * FROM",
  delete : "DELETE FROM",

  selectWhereLike : function(...str){
    if (typeof str == Object || typeof str == []){
      switch(str.length){
        case 1: return `${this.select} ${str[0]}`;
        case 2: return `${this.select} ${str[0]} WHERE ${str[1]} LIKE ?`
        default : console.error("error"); return;
      }
    }  
  },
  removeWhere : function(...str){
    if (typeof str == Object || typeof str == []){
      switch(str.length){
        case 1: return `${this.delete} ${str[0]}`;
        case 2: return `${this.select} ${str[0]} WHERE ${str[1]}`
        default : console.error("error"); return;
      }
    }  
  },
  selectAll : function(str){
    return `SELECT * FROM ${str}`;
  },
  summonerInsertData(obj){
    const {puuid , name, tag} = obj;
    try{
      insert.run(puuid, name, tag);
    }catch(error){
      console.error(error.message);
    } 
  },
  
  
}

Object.freeze(querySQL);
Object.freeze(tableType);