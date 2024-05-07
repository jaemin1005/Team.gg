//var http = require('http');
// const { userInfo } = require('os');
//const func = require("../../Module/FullName");
// document.querySelector(`.main_logo`).onclick = () =>
//   (location.href = `../index.html`);
let url = "http://localhost:3000";

let queryParams = getQueryParams();
let reqObj = {
  command : "reqUser",
  detail : queryParams["userName_input"]
}

// POST 요청 보내기
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(reqObj)
})
.then(response => response.json())
.then(data => console.dir(data))
.catch(error => console.error('Error:', error));


function getQueryParams() {
  const queryParams = {};
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  // URLSearchParams를 사용하여 모든 쿼리스트링 파라미터를 객체에 저장
  for (const [key, value] of urlParams.entries()) {
    queryParams[key] = value;
  }
  return queryParams;
}