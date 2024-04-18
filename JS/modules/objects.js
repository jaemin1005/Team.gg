class Summoner {
  constructor(summonerObj) {
    this.puuid = summonerObj.puuid;
    this.gameName = summonerObj.gameName;
    this.tagLine = summonerObj.tagLine;
  }
}

let testObj = {
  puuid: `testPuuid`,
  gameName: `testGameName`,
  tagLine: `testTagLine`,
};

const summonerInfo = new Summoner(testObj);
