const USER_NAME = document.getElementById("username_inp_login");
const PASSWORD = document.getElementById("password_inp_login");
const IP_SWITCH = document.getElementById("ip_switch");
const KEEP_LOGIN_LABEL = document.getElementById("kepp-login--label");
const CHECK_BOX = document.getElementById("check_box");

USER_NAME.addEventListener("focus", handleFocusFunc);
PASSWORD.addEventListener("focus", handleFocusFunc);
USER_NAME.addEventListener("focusout", handleFocusOutFunc);
PASSWORD.addEventListener("focusout", handleFocusOutFunc);
IP_SWITCH.addEventListener("click", handleSwitchClickFunc);
KEEP_LOGIN_LABEL.addEventListener("click", handleKeepClickFunc);

function handleFocusFunc() {
  this.parentNode.style.border = "1px solid #67C8C1";
}

function handleFocusOutFunc() {
  this.parentNode.style.border = "1px solid #c6c6c6";
}

function handleSwitchClickFunc() {
  const first_click = document.getElementsByClassName("on");
  const switch_toggle = this.childNodes[1];
  if (first_click.length === 0) {
    switch_toggle.classList.remove("off");
    switch_toggle.classList.add("on");
    this.style.backgroundColor = "#008485";
  } else {
    switch_toggle.classList.remove("on");
    switch_toggle.classList.add("off");
    this.style.backgroundColor = "";
  }
}

function handleKeepClickFunc() {
  CHECK_BOX.click();
}
