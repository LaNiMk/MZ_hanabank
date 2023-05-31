window.addEventListener("load", () => {
  const ham = document.querySelector("#ham");
  const menu = document.querySelector("header .gnb");

  function onClickButtonHam() {
    menu.classList.toggle("active");
  }

  ham.addEventListener("click", onClickButtonHam);
});
