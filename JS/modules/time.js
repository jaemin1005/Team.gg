/**
 * * 2024.04.23 황재민
 * * Date() 관련된 걸 module로 분리.
 */
class Time {
  constructor() {
    this.date = new Date();
  }

  /**
   * * 시간 비교를 위해서 가져온다.
   * @returns : 현재 UTC 기준으로 1970년 1월 1일 0시 0분 0초부터 현재까지 경과된 밀리초를 가져온다
   */
  static GetTime() {
    return Date.now();
  }

  /**
   * * 년도 - 월 - 일을 이용하여 Log파일을 생성, 접근한다.
   * @returns 로그 파일 이름 : 년-월-일-LOG.txt
   */
  GetLogFileName() {
    return (
      "log/" +
      this.date.getFullYear() +
      "-" +
      (this.date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      this.date.getDay().toString().padStart(2, "0") +
      "-LOG.txt"
    );
  }

  /**
   * * 로그에 정보를 쓸 때마다 옆에 몇시, 몇분인지 추가한다.
   * @returns [현재시간, 현재 분]
   */
  GetLogline() {
    return (
      "[" +
      this.date.getHours().toString().padStart(2, "0") +
      ":" +
      this.date.getMinutes().toString().padStart(2, "0") +
      ":" +
      this.date.getSeconds().toString().padStart(2, "0") +
      "] "
    );
  }
}

const time = new Time();
// module.exports = time;
export { Time, time };
