import * as app from "../app.mjs";
import * as classList from "./classList.js";

/*
 * 2024.04.22/12:54PM 이종수
 * ../app.mjs파일에서 값을 전달받아 처리
 * ./classList.js에 값 전달해서 CSS입히거나 벗기는 작업
 */

// ! DB에서 값 비교하고 조건에 맞는 처리 무조건 해야됨
export const checkUser = (userName) => {
  if (userName == ``) {
    // * 입력값이 없을 때
    let pTag = app.pTag_for_warning_message;
    let nullMessage = `아이디를 입력해주세요.`;
    pTag.innerHTML = nullMessage;
    app.warningMessage(nullMessage);
    classList.funcForSetClass(pTag);
  } else if (userName !== null) {
    // * 입력 값이 있지만, 일치하는 데이터를 찾지 못 했을 때
    let pTag = app.pTag_for_warning_message;
    let unfoundedMessage = `${userName}는(은) 존재하지 않는 아이디입니다.`;
    pTag.innerText = unfoundedMessage;
    app.warningMessage(unfoundedMessage);
    classList.funcForSetClass(pTag);
    // !
    // * 일단 이 로직에서 유효한 검색이 됐다 치고, 로케이션 설정
    location.href = `../public/HTML/userInfo.html`;
  } else {
    location.href = `../public/HTML/userInfo.html`;
  }
  // todo, 메세지 "자체만" 전달, -> ../app.mjs에서 메세지 처리 작업,
  // todo, 클래스 리스트에는 p태그를 전달해서 처리
};
