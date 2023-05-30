//import * as val from '../modules/validation';

const USEREMAIL = document.getElementById("username_inp");
const USERPW = document.getElementById("password_inp");
const signUpBtn = document.getElementById("signup-btn");
const currentPlus30Min = addTime(1);

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
    let userData = localStorage.getItem("details") ?
        JSON.parse(localStorage.getItem("details")) : [];

    let userObj = {
        email: USEREMAIL.value,
        password: USERPW.value,
        logoutTime: currentPlus30Min,
    };

    userData.push(userObj);

    if (localStorage) {
        localStorage.setItem("details", JSON.stringify(userData));
        alert("회원가입 되셨습니다!");
    }

    USEREMAIL.value = "";
    USERPW.value = "";
}

signUpBtn.addEventListener("click", (e) => {
    e.preventDefault();
    registerUser();
});