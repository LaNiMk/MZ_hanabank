const showError = (input, message) => {
  const form = input.parentElement;
  form.className = "username";
  const small = form.querySelector("small");
  small.innerText = message;
};

const success = (input) => {
  const form = input.parentElement;
};
const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

const validateEmail = (email) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRegex.test(email.value.trim())) {
    success(email);
  } else {
    showError(email, "이메일이 유효하지 않은 형식입니다!");
  }
};
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,10}$/;
  return passwordRegex.test(password.value.trim());
};

const confirmPasswordMatch = (pw1, pw2) => {
  if (pw1.value.trim() !== pw2.value.trim()) {
    showError(pw2, "패스워드가 다릅니다!");
  }
};

const checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim === "") {
      showError(input, `${getFieldName(input)}가 비었습니다!`);
    }
  });
};

/**
 * 아이디 중복 검사 로직 추가 구현
 */
/*
export {
  showError,
  validateEmail,
  validatePassword,
  confirmPasswordMatch,
  checkRequired,
};
*/
