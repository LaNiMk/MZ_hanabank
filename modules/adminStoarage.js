const ADMINEMAIL = document.getElementById("useremail_inp");
const ADMINNAME = document.getElementById("username_inp");
const ADMINPW = document.getElementById("password_inp");
const CONFIRMUSERPW = document.getElementById("password_cofirm");
const ADMINPHONE = document.getElementById("phone_inp");

const signUpBtn = document.getElementById("signup-btn");


const registerAdmin = () => {
    let adminData = localStorage.getItem("ADMIN") ?
        JSON.parse(localStorage.getItem("ADMIN")) : [];

    let adminObj = {
        name: ADMINNAME.value,
        email: ADMINEMAIL.value,
        password: ADMINPW.value,
        phone: ADMINPHONE.value,
    };

    adminData.push(adminObj);

    if (localStorage) {
        localStorage.setItem("ADMIN", JSON.stringify(adminData));
        alert("회원가입 되셨습니다!");
        window.location.href = "loginId.html";
    }

    ADMINEMAIL.value = "";
    ADMINNAME.value = "";
    ADMINPW.value = "";
    CONFIRMUSERPW.value = "";
    ADMINPHONE.value = "";
}

signUpBtn.addEventListener("click", (e) => {
    e.preventDefault();
    registerAdmin();

});