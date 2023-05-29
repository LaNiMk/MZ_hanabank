window.onload = function () {
    console.log("");
    console.log("=========================================");
    console.log("[window onload] : [start]");
    console.log("=========================================");
    console.log("");

    const signUpBtn = document.getElementById("signUpBtn");
    const GETEMAIL = document.getElementById("username_inp");
    const GETPASSWORD = document.getElementById("password_inp");
    const GETCONFIRM = document.getElementById("password_cofirm");
    const logoutTime = new Date().getTime() + 30 * 60 * 1000;

    //let userInfo = userData.find((userInfo) => userInfo.id === userId);

    function getUserData() {
        const userInfos = localStorage.getItem('userData');
        try {
            return userInfos ? JSON.parse(userInfos) : []
        } catch {
            return []
        }
    }

    function registerUser(userData) {
        localStorage.setItem('userData', JSON.stringify(userData));
        alert('회원가입이 완료되었습니다!');

        GETEMAIL.value = '';
        GETPASSWORD.value = '';
        GETCONFIRM.value = '';
    }


    const userId = 12; //스트링 난수 
    let userData = getUserData();

    signUpBtn.addEventListener("submit", (e) => {
        e.preventDefault()

        userData.push({
            id: userId,
            email: GETEMAIL.value,
            password: GETPASSWORD.value,
            logoutTime: logoutTime
        })

        registerUser(userData)
        console.log('등록 완료')
    })
}

// 현재 시간에 30분을 더한 로그아웃 시간 계산


// 사용자 데이터 객체 생성


//좌우 공백제거해서 빈칸일 경우