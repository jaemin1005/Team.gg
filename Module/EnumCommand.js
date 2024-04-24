const JSONCOMMAND = Object.freeze({
  
  // API Command
  GET_USER_INFO : "reqUser",
  GET_MATCH_INFO : "reqMatch",
  UPDATE_USER_INFO : "reqUpdateUserInfo",
  MORE_MATCH_INFO : "reqMoreMatchInfo"
})

const LOGCOOMAND = Object.freeze({
  
  DB_ERR : "DB Err : ",
  CONN_ERR : "CONN ERR : ",
  IO_ERR : "IO ERR : "
})

module.exports = JSONCOMMAND;
