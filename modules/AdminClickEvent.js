const USER_NAME = document.getElementById("username_inp");
const USER_EMAIL = document.getElementById("useremail_inp");
const PASSWORD_CONFIRM = document.getElementById("password_confirm");
const PASSWORD = document.getElementById("password_inp");
const PHONE = document.getElementById("phone_inp");

PASSWORD.addEventListener("focus", handleFocusFunc);
PASSWORD.addEventListener("focusout", handleFocusOutFunc);
USER_EMAIL.addEventListener("focus", handleFocusFunc);
USER_EMAIL.addEventListener("focusout", handleFocusOutFunc);
USER_NAME.addEventListener("focus", handleFocusFunc);
USER_NAME.addEventListener("focusout", handleFocusOutFunc);
PASSWORD_CONFIRM.addEventListener("focus", handleFocusFunc);
PASSWORD_CONFIRM.addEventListener("focusout", handleFocusOutFunc);

PHONE.addEventListener("focus", handleFocusFunc);
PHONE.addEventListener("focusout", handleFocusOutFunc);

function handleFocusFunc() {
    this.parentNode.style.border = "1px solid #67C8C1";
}

function handleFocusOutFunc() {
    this.parentNode.style.border = "1px solid #c6c6c6";
}