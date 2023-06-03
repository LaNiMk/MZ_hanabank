const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  const title = item.querySelector(".accordion-title");
  const content = item.querySelector(".accordion-content");

  // 초기 상태로 설정 --> 컨텐츠가 숨겨진 상태에서 애니메이션 적용
  content.style.maxHeight = "0";
  content.style.transition = "max-height 0.3s ease";

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
  clearSearchResults();

  var searchQuery = document.getElementById("search-input").value;
  var searchResultsContainer = document.getElementById("search-results");

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

  clearSearchResults();

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

      accordionTitles[i].classList.toggle("active");
      accordionContents[i].classList.toggle("active");

      break;
    }
  }
}

function clearSearchResults() {
  var searchResultsContainer = document.getElementById("search-results");
  searchResultsContainer.innerHTML = "";

  // 이전 검색 결과에 대한 아코디언 초기화
  var activeTitles = document.querySelectorAll(".accordion-title.active");
  var activeContents = document.querySelectorAll(".accordion-content.active");

  activeTitles.forEach(function (title) {
    title.classList.remove("active");
  });

  activeContents.forEach(function (content) {
    content.style.maxHeight = "0";
    content.classList.remove("active");
  });
}
