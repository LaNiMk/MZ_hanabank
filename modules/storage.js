import {
  validateEmail,
  validatePassword,
  confirmPasswordMatch,
  checkRequired
} from "./validation.js";

const USEREMAIL = document.getElementById("username_inp");
const USERPW = document.getElementById("password_inp");
const CONFIRMUSERPW = document.getElementById("password-confirm");
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
}

signUpBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // checkRequired([USEREMAIL, USERPW, CONFIRMUSERPW]);
  validateEmail(USEREMAIL);
  validatePassword(USERPW);
  // confirmPasswordMatch(USERPW, CONFIRMUSERPW);
  registerUser();
});