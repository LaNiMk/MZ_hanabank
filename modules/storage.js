const loginbtn = document.querySelector('#signup-btn')

loginbtn.addEventListener('click', (e) => {
    const emailInput = document.getElementById('email');
    const userIdInput = document.getElementById('userId');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('password');

    const email = emailInput.value;
    const userId = userIdInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (email.trim() === "") {
        alert("이메일을 입력하세요 !");
        return;
    }

    if (password.trim() === "") {
        alert("비밀번호를 입력하세요 !");
        return;
    }

    if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다 !");
        return;
    }

    //user 데이터 객체화
    const userData = {
        userId: userId,
        email: email,
        password: password
    }

    localStorage.setItem('userData', JSON.stringify(userData));
    alert('회원가입이 완료되었습니다.')

    const logoutTime = new Date().getTime() + 30 * 60 * 1000;
    localStorage.setItem('logoutTime', logoutTime);

    emailInput.value = '';
    userIdInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';

    window.location.href = 'login.html';
})

//좌우 공백제거해서 빈칸일 경우