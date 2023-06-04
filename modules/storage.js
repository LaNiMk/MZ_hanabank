import {
  validateEmail,
  validatePassword,
  confirmPasswordMatch
} from "./validation.js";

const USEREMAIL = document.getElementById("username_inp");
const USERPW = document.getElementById("password_inp");
const CONFIRMUSERPW = document.getElementById("password_cofirm");
const signUpBtn = document.getElementById("signup-btn");
const currentPlus1Hours = addTime(1);

function addTime(minutes) {
  const userlogoutTime = new Date();
  userlogoutTime.setTime(userlogoutTime.getTime() + minutes * 60 * 60 * 1000);

  let hours = userlogoutTime.getHours();
  let min = userlogoutTime.getMinutes();
  let seconds = userlogoutTime.getSeconds();

  const formattedTime = `${hours}:${padZero(min)}:${padZero(seconds)}`;
  return formattedTime;
}

function padZero(num) {
  return num.toString().padStart(2, "0");
}

function registerUser() {
  let userData = localStorage.getItem("USER") ?
    JSON.parse(localStorage.getItem("USER")) : [];

  let userObj = {
    email: USEREMAIL.value,
    password: USERPW.value,
    logoutTime: currentPlus1Hours,
  };

  userData.push(userObj);

  if (localStorage) {
    localStorage.setItem("USER", JSON.stringify(userData));
    alert("회원가입 되셨습니다!");
    window.location.href = "loginId.html";
  }

  USEREMAIL.value = "";
  USERPW.value = "";
  CONFIRMUSERPW.value = "";
}

function validateForm() {
  if (!validateEmail(USEREMAIL)) {
    alert("이메일이 유효하지 않은 형식입니다!");
    return false;
  }
  if (!validatePassword(USERPW)) {
    alert("패스워드가 유효하지 않습니다!");
    return false;
  }
  if (!confirmPasswordMatch(USERPW, CONFIRMUSERPW)) {
    alert("비밀번호가 일치하지 않습니다!");
    return false;
  }
  return true;
}

signUpBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (validateForm()) {
    registerUser();
  }
});
/*
  if (validateEmail(USEREMAIL)) {
    validatePassword(USERPW);
    if (validatePassword(USERPW)) {
      confirmPasswordMatch(USERPW, CONFIRMUSERPW);
      if (confirmPasswordMatch(USERPW, CONFIRMUSERPW)) {
        registerUser();
      }
    }
  } else {
    alert("올바른 정보를 입력하세요!");
  }
  */