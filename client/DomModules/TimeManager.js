/**
 * * TimeManager
 * 2024/05/21 배성빈 : 유닉스 시간, ms를 지난 시간과 진행 시간의 형태로 변환해주는 클래스.
 * ! 해당 클래스는 직접적인 인스턴스를 허용하지 않으며, 오로지 자식 클래스의 생성자에서 super을 통해 인스턴스 할 수 있다.
 * #role 
 * ? constructor
 * @param {*} parentObj : 유닉스 시간, ms
 *
 * ? member variable
 * gamedurationTime -> 진행시간
 * gameEndTimestamp -> 게임이 종료된 유닉스 시간
 * ? Method 
 * datecal -> endtimestamp를 통해 지난 날짜를 계산하여 문자열로 반환.
 * duration -> ms를 분 초로 변환하여 문자열로 반환.
 * 
*/




export class TimeManager {
  constructor(gameEndTimestamp, duration) {
    this.gameEndTimestamp = gameEndTimestamp
    this.durationTime = duration
    // this.endOfGameResult = endOfGameResult
  }
  dateCal() {
    let time = this.gameEndTimestamp;
    let now = new Date();
    let gtime = new Date(time);
    let resultTime = now.getTime() - gtime.getTime();
    let diff = resultTime / (24 * 60 * 60 * 1000);
    // * ms단위로 차이를 구해 date로 변환 후에 if문을 통해 조건을 검사함.
    if (diff >= 365) {
      // * n년 전
      let years = Math.floor(diff / 365);
      return `${years}년 전`;

    } else if (diff >= 30) {
      // * n개월 전
      let months = Math.floor(diff / 30);
      return `${months}달 전`;
    } else if (diff >= 1) {
      // * n일 전
      return `${Math.floor(diff)}일 전`;
    } else {
      // * n시간 전
      let hdif = resultTime / (60 * 60 * 1000);

      if (hdif >= 1) {
        return `${Math.floor(hdif)}시간 전`;
      } else {
        // * n분 전
        let mdif = resultTime / (60 * 1000);
        return `${Math.floor(mdif)}분 전`;
      }
    }
  }

  // * 게임 길이 반환
  duration() {
    let sec = this.durationTime % 60;
    let min = Math.floor(this.durationTime / 60);
    let timeline = `${min}분` + `${sec}초`
    return timeline
  }

  // checkWin() {
  //   let result = this.endOfGameResult;
  //   if (result == "GameComplete") {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

}