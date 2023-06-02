const accordionItems = document.querySelectorAll(".accordion-item");
// const accordionContents = document.querySelector('.accordion-content');

accordionItems.forEach((item) => {
  const title = item.querySelector(".accordion-title");
  const content = item.querySelector(".accordion-content");

  title.addEventListener("click", () => {
    content.classList.toggle("active");
    if (content.classList.contains("active")) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = "0";
    }
  });
});

document.getElementById("search-button").addEventListener("click", search);
document
  .getElementById("search-input")
  .addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      search();
    }
  });

function search() {
  var searchQuery = document.getElementById("search-input").value;
  var searchResultsContainer = document.getElementById("search-results");

  searchResultsContainer.innerHTML = "";

  var accordionTitles = document.getElementsByClassName("accordion-title");
  for (var i = 0; i < accordionTitles.length; i++) {
    var question = accordionTitles[i].textContent;

    if (question.includes(searchQuery)) {
      var resultItem = document.createElement("div");
      resultItem.textContent = question;
      resultItem.classList.add("search-result");
      resultItem.addEventListener("click", scrollToResult);
      searchResultsContainer.appendChild(resultItem);
    }
  }
}

// 검색 결과 항목을 클릭했을 때 해당 내용으로 페이지 스크롤 이동하는 함수
function scrollToResult(event) {
  var question = event.target.textContent;

  // FAQ 아코디언에서 해당 질문을 찾아서 스크롤 이동
  var accordionTitles = document.getElementsByClassName("accordion-title");
  var accordionContents = document.querySelectorAll(".accordion-content");
  for (var i = 0; i < accordionTitles.length; i++) {
    var itemQuestion = accordionTitles[i].textContent;

    if (itemQuestion === question) {
      accordionTitles[i].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // var accordionContent = accordionContents[i];
      // if (accordionContent.style.maxHeight) {
      //   accordionContent.style.maxHeight = null;
      // } else {
      //   accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
      // }

      accordionTitles[i].classList.toggle("active");
      accordionContents[i].classList.toggle("active");

      break;
    }
  }
}
