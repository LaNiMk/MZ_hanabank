const loginBtn = document.getElementById("login-btn");
const USEREMAIL = document.getElementById("username_inp_login");
const USERPW = document.getElementById("password_inp_login");

const clearInputArea = () => {
  document.getElementById("username_inp_login").value = "";
  document.getElementById("password_inp_login").value = "";
};

const requestLogin = () => {
  let storeEmail = USEREMAIL.value;
  let storePw = USERPW.value;
  const userData = JSON.parse(localStorage.getItem("USER"));

  if (userData && Array.isArray(userData)) {
    //user정보가 존재한다면 -> 객체에 담아았으니 배열형으로 파싱된 값이 있다면
    const user = userData.find((item) => item.email === storeEmail);
    console.log(user);
    if (user && user.password === storePw) {
      window.location.href = "../home-v2.html";
      clearInputArea();
    } else {
      alert("이메일 또는 비밀번호가 일치하지 않습니다!");
      clearInputArea();
    }
  } else {
    alert("회원가입 이력이 없습니다!");
    clearInputArea();
  }
};

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  requestLogin();
});
