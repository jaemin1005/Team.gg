// * 인풋 값 유효성 검사 후, 메시지가 나올 p 태그
const pTag_for_warning_message = document.querySelector(
  `.warning_message_container > p:first-child`
);

const $form = document.querySelector("form");

// todo, a#qwekr1, asdk#r1
// ? 연관검색 뜨면 경고문 안 보이는 거

export const checkUser = (inputValue) => {
  const inputValueArr = [...inputValue];
  let hashTagCount = 0;

  let userName = inputValue.split(`#`)[0];
  let userCode = inputValue.split(`#`)[1];

  inputValueArr.forEach((hashTag) => {
    if (hashTag == `#`) {
      hashTagCount++;
    } else {
    }
  });

  if (inputValue == ``) {
    pTag_for_warning_message.classList.add(`class_for_red_message`);
    pTag_for_warning_message.textContent = `입력 값이 없습니다.`;
  } else if (
    !inputValue.includes(`#`) ||
    hashTagCount !== 1 ||
    userName == `` ||
    userCode == ``
  ) {
    hashTagCount = 0;
    pTag_for_warning_message.classList.add(`class_for_red_message`);
    pTag_for_warning_message.textContent = `${inputValue}는(은)잘못된 형식입니다.`;
  } else {
    //$form.action = "./public/HTML/userInfo.html";
    $form.action = "summoner/";
    $form.submit();
  }
};
