const USER_NAME = document.getElementById("username_inp");
const PASSWORD = document.getElementById("password_inp");
const CONFIRMPASSWORD = document.getElementById("password_cofirm");

USER_NAME.addEventListener("focus", handleFocusFunc);
USER_NAME.addEventListener("focusout", handleFocusOutFunc);
PASSWORD.addEventListener("focus", handleFocusFunc);
PASSWORD.addEventListener("focusout", handleFocusOutFunc);
CONFIRMPASSWORD.addEventListener("focus", handleFocusFunc);
CONFIRMPASSWORD.addEventListener("focusout", handleFocusOutFunc);

function handleFocusFunc() {
  this.parentNode.style.border = "1px solid #67C8C1";
}

function handleFocusOutFunc() {
  this.parentNode.style.border = "1px solid #c6c6c6";
}