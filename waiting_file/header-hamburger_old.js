window.addEventListener("load", () => {
  if (window.innerHeight < 1024) {
    const ham = document.querySelector("#ham");
    const menu = document.querySelector("header .gnb");

    function onClickButtonHam() {
      menu.classList.toggle("active");
    }

    ham.addEventListener("click", onClickButtonHam);
  }
});
