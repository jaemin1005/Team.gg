import * as saveUser from "./modules/saveUser.js";
import * as checkUser from "./modules/checkUser.js";
import { funcForSetClass } from "./modules/classList.js";

// * 헤더 영역 컨텐츠들
const header_contents = {
  // * 로고( team.gg )
  main_logo: document.querySelector(`.main_logo`),
  // * 메뉴바 내에 메뉴들( 왼쪽부터 오른쪽으로 )
  first_menu: document.querySelector(`.menus_container > ul > li:first-child`),
  second_menu: document.querySelector(
    `.menus_container > ul > li:nth-child(2)`
  ),
  third_menu: document.querySelector(`.menus_container > ul > li:nth-child(3)`),
  fourth_menu: document.querySelector(
    `.menus_container > ul > li:nth-child(4)`
  ),
  fifth_menu: document.querySelector(`.menus_container > ul > li:nth-child(5)`),
};

// * 메인 영역 컨텐츠들
const main_contents = {
  // * 인풋 폼
  search_form: document.querySelector(`.search_form`),
  // * 전적 검색 창
  search_form_input: document.querySelector(`.search_form_input`),
  // * 전전 검색 아이콘
  search_form_icon: document.querySelector(`.search_form_icon`),
};

// * 인풋 값 유효성 검사 후, 메시지가 나올 p 태그
const pTag_for_warning_message = document.querySelector(
  `.warning_message_container > p:first-child`
);

// * 폼 서브밋 시 (엔터로 입력) 값 물고 checkUser.js내 값 체크하는 함수로 연결
// ! 유효성 검증 없이 바로 제출하는게 옳은 방식인지
main_contents.search_form.onsubmit = (e) => {
  e.preventDefault();
  let userName = main_contents.search_form_input.value;
  checkUser.checkUser(userName);
};

// * 돋보기 클릭 시 값 물고 checkUser.js내 값 체크하는 함수로 연결
main_contents.search_form_icon.onclick = () => {
  let userName = main_contents.search_form_input.value;
  checkUser.checkUser(userName);
};

// * 상황에 맞는 메시지를 전달받아서 메인에 나타내주는 함수
// todo, classList에서의 공정 처리 또한 필요
const warningMessage = (message) => {
  pTag_for_warning_message.innerText = message;
};

// const classControl = (classList) => console.log(classList);

export {
  main_contents,
  pTag_for_warning_message,
  warningMessage,
  classControl,
};
