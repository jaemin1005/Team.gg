import * as checkUser from "./modules/checkUser.js";

console.log(checkUser);
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

main_contents.search_form.onkeypress = (e) => {
  const input_value = main_contents.search_form_input.value;
  if (e.keyCode == 13) {
    checkUser.checkUser(main_contents.search_form_input.value);
  }
};

// * 돋보기 클릭 시 값 물고 checkUser.js내 값 체크하는 함수로 연결
main_contents.search_form_icon.onclick = () => {
  // checkUser.checkUser(main_contents.search_form_input.value);
};
