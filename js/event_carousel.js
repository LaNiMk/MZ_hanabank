window.onload = function () {
  var $carouselInner = $(".carousel-inner");
  var $carouselItems = $(".carousel-items");

  $carouselInner.on(
    "init reInit afterChange",
    function (event, slick, currentSlide, nextSlide) {
      // 현재 슬라이드 인덱스와 전체 슬라이드 개수 계산
      var currentSlideIndex = (currentSlide ? currentSlide : 0) + 1;
      var totalSlides = slick.slideCount;

      // 슬라이드 정보 업데이트
      $(".carousel-count").text(currentSlideIndex + " / " + totalSlides);
    }
  );

  $carouselInner.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: $(".carousel-prev"),
    nextArrow: $(".carousel-next"),
    autoplay: true, // 자동 재생 설정
    autoplaySpeed: 2000, // 재생 간격(ms)
    infinite: true, // 무한 반복
  });

  $carouselItems.slick("slickPlay"); // 자동 재생 시작

  $(".carousel-prev").click(function () {
    $carouselItems.slick("slickPrev");
  });

  $(".carousel-next").click(function () {
    $carouselItems.slick("slickNext");
  });
};

// const slider = document.querySelector(".carousel-inner");
// const slides = [...document.querySelectorAll(".carousel-item")];
// this.wallop = new Wallop(slider);

// const button_next = document.querySelector(".carousel-next");

// function AutoSlide() {
//   button_next.click();
// }

// setInterval(AutoSlide, 3000);

//   var slickOptions = {
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     prevArrow: carouselPrev,
//     nextArrow: carouselNext,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     infinite: true,
//   };
