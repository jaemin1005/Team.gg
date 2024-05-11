import * as checkUser from "./modules/checkUser.js";
import Debounce from "./modules/debounce.js";

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

// * 엔터 키 디바운스
main_contents.search_form.onkeypress = Debounce.Debounce((e) => {
  if (e.keyCode == 13) {
    console.log(e);
    checkUser.checkUser(main_contents.search_form_input.value);
  } else {
    return;
  }
}, 500);

// * 클릭 디바운스
main_contents.search_form_icon.onclick = Debounce.Debounce(() => {
  checkUser.checkUser(main_contents.search_form_input.value);
}, 500);

// main_contents.search_form.onkeypress = (e) => {
//   const input_value = main_contents.search_form_input.value;
//   if (e.keyCode == 13) {
//     checkUser.checkUser(main_contents.search_form_input.value);
//   }
// };

// const eventHandling = (e) => {
//   console.log(e);
//   if (e.keyCode == 13) {
//     checkUser.checkUser(main_contents.search_form_input.value);
//   } else if (e.type == `click`) {
//     console.log(e.type);
//     checkUser.checkUser(main_contents.search_form_input.value);
//   } else {
//     console.log(1);
//     return;
//   }
//   console.log("event 0.5초 Debounced");
// };

// ! 0.5초 뒤 입력한 만큼 실행 => X
// main_contents.search_form.onkeypress = (e) => {
//   Debounce.Debounce(() => {
//     console.log(1);
//   }, 500)();
// };

// // * 돋보기 클릭 시 값 물고 checkUser.js내 값 체크하는 함수로 연결
// main_contents.search_form_icon.onclick = (e) => {
//   Debounce.Debounce(eventHandling, 500)(e);
// };

// Debounce.Debounce(() => {
//   main_contents.search_form_icon.onclick = (e) => console.log(1);
// }, 500);

// main_contents.search_form.addEventListener(
//   "keypress",
//   Debounce.Debounce(eventHandling, 500)
// );

// main_contents.search_form_icon.addEventListener(
//   "click",
//   Debounce.Debounce(eventHandling, 500)
// );
