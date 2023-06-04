const showError = (message) => {
  const small = document.querySelector('small');
  small.innerText = message;
  small.removeAttribute('hidden');
};

const success = () => {
  const small = document.querySelector('small');
  small.innerHTML = '회원가입이 가능합니다!';
  //small.setAttribute('hidden', 'true');
};
const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

export const validateEmail = (email) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRegex.test(email.value.trim())) {
    return true;
  } else {
    showError("이메일이 유효하지 않은 형식입니다!");
    return false;
  }
}
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*\d).{8,}$/
  if (passwordRegex.test(password.value)) {
    return true;
  } else {
    showError("패스워드가 유효하지 않습니다!");
    return false;
  }
}

export const confirmPasswordMatch = (pw1, pw2) => {
  if (pw1.value === pw2.value) {
    return true;
  } else {
    showError("패스워드가 일치하지 않습니다!");
    return false;
  }
}

/**
 * 아이디 중복 검사 로직 추가 구현
 */