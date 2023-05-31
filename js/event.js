window.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const itemWidth = carouselItems[0].offsetWidth;
    let currentPosition = 0;
  
    prevButton.addEventListener('click', function(event) {
      event.preventDefault();
      currentPosition += itemWidth;
      if (currentPosition > 0) {
        currentPosition = -(itemWidth * (carouselItems.length - 1));
      }
      carouselInner.style.transform = `translateX(${currentPosition}px)`;
    });
  
    nextButton.addEventListener('click', function(event) {
      event.preventDefault();
      currentPosition -= itemWidth;
      if (currentPosition < -(itemWidth * (carouselItems.length - 1))) {
        currentPosition = 0;
      }
      carouselInner.style.transform = `translateX(${currentPosition}px)`;
    });
  });
  