// * 단위테스트 O
import Database from 'better-sqlite3';
class IoDebounce {
  constructor() {
    this.CheckQuery = "SELECT * FROM summoners WHERE gameName LIKE ?";
    this.db = new Database("./summoner.db", { verbose: console.log });
    this.db.pragma("journal_mode = WAL");
  }
  nameComplete(str) {
    try {
      const receive = this.db.prepare(this.CheckQuery);
      const string = `${str}%`
      let list = receive.all(`${string}`);
      this.db.close();
      return list;
    } catch (error) {
      this.db.close();
      console.error(error.message);
    }
  }
}

export default IoDebounce;