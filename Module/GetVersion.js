require('dotenv').config();

function GetVersion(){
  return process.env.RIOT_DATA_ROOT_PATH + process.env.RIOT_DATA_VERSION;
}

module.exports = GetVersion;