//var http = require('http');
// const { userInfo } = require('os');

// document.querySelector(`.main_logo`).onclick = () =>
//   (location.href = `../index.html`);



/**
 * * 2024.05.05 황재민
 * * Server에서 받아온 정보를 이용히여 DOM Element를 수정한다.
 * @param {*} obj : Server에서 받아온 객체
 */
function SetUserInfoDOM(obj){ 
  let $userInfoContainer = document.getElementById("user_name_container");
  let $userProfileImg = $userInfoContainer.children[0].children[0]; 

  let $userInfo = $userInfoContainer.children[1];
  let $userName = $userInfo.children[1];

  if(obj != null && obj != undefined){
    $userProfileImg = obj.icon;
    $userName.children[0].textContent = obj.gameName + " " + obj.tagLine;
    $userName.children[1].textContent = obj.refresh;
  }

  else
  {
    $userProfileImg.src = "../../resources/profile/dummy.png";
    $userName.children[0].textContent = "TEAMGG #000"
    $userName.children[1].textContent = "최근업데이트 9999년전"
  }
}

SetUserInfoDOM(null);

/**
 * 
 */