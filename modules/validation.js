const showError = (message) => {
  const form = document.getElementById("c");
  const form_small = document.getElementById("error");
  form.classList.add("e2");
  form_small.innerText = message;
};

const success = (input) => {
  const form = input.parentElement;
  form.className = 'form-control success';
};
const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

export const validateEmail = (email) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRegex.test(email.value.trim())) {
    success(email);
  } else {
    showError("이메일이 유효하지 않은 형식입니다!");
  }
}
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,10}$/;
  if (passwordRegex.test(password.value)) {
    success(password)
  } else {
    showError("패스워드가 유효하지 않습니다.");
    return;
  }
}

export const confirmPasswordMatch = (pw1, pw2) => {
  if (pw1.value != pw2.value) {
    showError("패스워드가 다릅니다!");
  }
}

export const checkRequired = (inputArr) => {
  inputArr.forEach(input => {
    if (input.value.trim() === "") {
      showError(`${getFieldName(input)}가 비었습니다!`);
    } else {
      success(input);
    }
  });
}

/**
 * 아이디 중복 검사 로직 추가 구현
 */