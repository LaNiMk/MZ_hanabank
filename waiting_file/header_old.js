window.onload = function () {
  let screen = $(window).width();
  const gnbdiv = $(".gnb > li > div");
  const bg = $(".bg_gnb");
  const li = $(".gnb > li");
  if (screen > 1024) {
    li.on("mouseover focusin", function () {
      /* 하위 메뉴 보이기
          1. 각 메뉴에서 가장 높은 높이 구하기
          2. outerHeight()
      */
      hig = 0;
      gnbdiv.each(function () {
        temp = parseInt($(this).outerHeight());
        if (hig <= temp) {
          hig = temp;
        }
      });
      gnbdiv.show().css("height", hig);
      bg.show().css("height", hig);
    });

    li.on("mouseleave", function () {
      hide_el();
    });

    $(".lang, h1").on("focusin", function () {
      hide_el();
    });

    function hide_el() {
      gnbdiv.hide().removeAttr("style");
      bg.hide().removeAttr("style");
    }
  } else {
    $("header .gnb > li").click(function () {
      $("header .gnb > li > div").slideUp();
      if ($(this).children("header .gnb > li > div").is(":hidden")) {
        $(this).children("header .gnb > li > div").slideDown();
      } else {
        $(this).children("header .gnb > li > div").slideUp();
      }
    });
  }
};

$(window).on("resize", function () {
  console.log("resize event!");

  document.location.reload();
});
