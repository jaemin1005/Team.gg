import { test123, test124 } from "./modules/events.js";

// * 헤더 영역 컨텐츠들
const header_contents = {
  main_logo: document.querySelector(`.main_logo`),
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

console.log(test123, test124);

export { main_contents };
