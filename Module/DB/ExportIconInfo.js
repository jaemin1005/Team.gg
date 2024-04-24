// * 단위 테스트 O
const Database = require("better-sqlite3");
class ExportIconInfo {
  constructor() {
    this.iconQuery = "SELECT * FROM icon where iconId = ?";
    this.db = new Database("./summoner.db", { verbose: console.log });
    this.db.pragma("journal_mode = WAL");
  }
  exportIconInfo(iconId) {
    let query = this.db.prepare(this.iconQuery);
    let iconObj = query.get(iconId);
    this.db.close();
    return iconObj;
  }
}

module.exports = ExportIconInfo;