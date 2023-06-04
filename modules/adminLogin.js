const loginBtn = document.getElementById("login-btn");

const ADMINEPHONE = document.getElementById("one-text");

const requestLogin = () => {
    let storePhone = ADMINEPHONE.value;
    const adminData = JSON.parse(localStorage.getItem("ADMIN"));

    if (adminData && Array.isArray(adminData)) {
        //admin정보가 존재한다면 -> 객체에 담아았으니 배열형으로 파싱된 값이 있다면
        const admin = adminData.find((item) => item.phone === storePhone);
        console.log(admin);
        if (admin) {
            window.location.href = "../home-v2.html";
        } else {
            alert("사번이나 휴대전화 번호가 일치하지 않습니다!");
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