// ! test version of js

// *
const bodyTags = {
  aboutMainInputForm: {
    main_form: document.querySelector(`.search_form`),
    userName: document.querySelector(`.search_form  .search_form_input`),
    search_form_icon: document.querySelector(`.search_form .search_form_icon`),
  },
};

// * 폼 제출 이벤트 감지
bodyTags.aboutMainInputForm.main_form.onsubmit = (e) => {
  e.preventDefault();
  location.href = `./HTML/userInfo.html`;
};

bodyTags.aboutMainInputForm.search_form_icon.onclick = () => {
  location.href = `./HTML/userInfo.html`;
};
