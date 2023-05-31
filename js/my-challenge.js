const challengeBtn1 = document.querySelector("#challenge-btn1");
const challengeBtn2 = document.querySelector("#challenge-btn2");
const cheerName = document.querySelector("#cheerName");
const scene2cheerText = document.querySelector(".my-scene-2 h2");
const scene3content = document.querySelector(".my-scene-3 .content");
const scene4title = document.querySelector(".my-scene-4 h1");
const scene4content = document.querySelector(".my-scene-4 .content");
const scene4cardText = document.querySelector(".my-scene-4 .card-text");
const scene4cardImg = document.querySelector(
  ".my-scene-4 > div:nth-child(2) > div"
);
const downBtn = document.querySelector("#btn-down");
const shareBtn = document.querySelector("#btn-share");
const againBtn = document.querySelector("#btn-again");
let cardNum = 0;
const param = get_query();

const cards = [
  document.querySelector("#card-1"),
  document.querySelector("#card-2"),
  document.querySelector("#card-3"),
  document.querySelector("#card-4"),
  document.querySelector("#card-5"),
  document.querySelector("#card-6"),
  document.querySelector("#card-7"),
  document.querySelector("#card-8"),
];

const resultContent = [
  {
    id: 0,
    img: `../img/card-cloud.jpg`,
    content: `
    구름처럼 포근한 ‘낭만적인 도전 카드‘가 나왔네요. #님은 부드럽고 온화한 성격을 가졌어요. 
    다른 사람에게 크게 화를 내거나 험한 말을 뱉지 않는 사람이랄까요?
    <br /><br />
    그래서 때로는 속상한 순간도 찾아올 거예요. 가까운 사람에게 배려받지 못했을 때 특히 그렇죠.
    <br /><br />
    하지만 너무 신경 쓰지 말아요. 후회는 그 사람의 몫이니까요. 
    #님의 도전은 분명 성공할 거예요. 다른 사람을 자신만큼 소중히 여기는 #님이라면, 분명히요!`,
    cardTitle: "낭만적인 도전",
  },
  {
    id: 1,
    img: "../img/card-fire-2.jpg",
    content: `
    타오르는 불길처럼 용감한 ‘뜨거운 도전 카드‘가 나왔네요. #님은 현실에 안주하기보단 도전하는, 열정적인 사람이에요. 다른 사람들보다 더 크고 높은 꿈을 꾸죠.
    <br /><br />
    그래서 때로는 지치는 순간도 찾아올 거예요. ‘내가 해낼 수 있을까?’ 마음이 흔들리기도 할 거고요.
    <br /><br />
    하지만 조급해하지 않아도 괜찮아요. #님의 도전은 분명 성공할 거예요. 타오르는 용기가, 앞을 가로막는 방해물들을 화르르 다 태워버릴 테니까요!
    `,
    cardTitle: "뜨거운 도전",
  },
  {
    id: 2,
    img: "../img/card-fluffy-2.jpg",
    content: `
    몽글몽글 솜털 같은 ‘부드러운 도전 카드‘가 나왔네요. #님은 어떤 힘든 상황에서도 어린아이 같은 순수함을 잃지 않는 사람이에요. 
    #님과 함께 있으면 다른 사람들의 기분도 좋아지죠.
    <br /><br />
    그래서 때로는 불안한 순간도 찾아올 거예요. ‘내가 너무 현실적이지 않은가?’ 마음이 흔들리기도 할 거고요.
    <br /><br />
    하지만 확실하게 말할 수 있어요. #님의 도전은 분명 성공할 거예요. 이 험난한 세상에서, #님의 순수한 마음만큼 빛나는 가치는 없으니까요!
    `,
    cardTitle: "부드러운 도전",
  },
  {
    id: 3,
    img: "../img/card-leaf-2.jpg",
    content: `
    숲처럼 여유로움을 머금은 ‘싱그러운 도전 카드‘가 나왔네요. #님은 목표를 향해 질주하기보단, 주변을 둘러볼 줄 아는 여유를 가진 사람이에요. 함께 있으면 다른 사람들도 마음이 가벼워지죠.
    <br /><br />
    그래서 때로는 의심되는 순간도 찾아올 거예요. ‘내가 너무 느린 건 아닐까?’ 마음이 흔들리기도 할 거고요.
    <br /><br />
    하지만 모든 사람의 속도가 같을 수는 없어요. #님의 도전은 분명 성공할 거예요. #님만의 안정적인 속도로, 빛나는 미래를 향해서요!`,
    cardTitle: "싱그러운 도전",
  },
  {
    id: 4,
    img: "../img/card-colorful.jpg",
    content: `
    좁은 세상에 가둘 수 없는 ‘다채로운 도전 카드‘가 나왔네요. #님은 늘 궁금한 게 많고, 예상치 못한 순간에 톡톡 튀는 아이디어가 튀어나와요. 
    한 마디로.. 창의력 대장이랄까요?
    <br /><br />
    그래서 때로는 괴로운 순간도 찾아올 거예요. 현실적인 문제로 아무것도 할 수 없을 때 특히 더 그렇죠.
    <br /><br />
    하지만 슬퍼하지 말아요. #님의 도전은 분명 성공할 거예요. #님의 번뜩이는 아이디어 덕분에, 세상은 조금 더 재밌어질 테니까요!
    `,
    cardTitle: "다채로운 도전",
  },
  {
    id: 5,
    img: "../img/card-rock-1.jpg",
    content: `
    시간이 쌓일수록 더 가치 있어지는 ‘단단한 도전 카드‘가 나왔네요. 
    #님은 어떤 상황에서도 쉽게 휘둘리거나 무너지지 않는, 강인한 마음을 지녔어요. 주변 사람들도 안정감을 느낄 만큼요.
    <br /><br />
    그래서 실패가 더 크게 다가올지도 몰라요. 마음이 무너지는 순간이 온다면, 정말 크게 상처받았다는 의미니까요.
    <br /><br />
    하지만 #님의 도전은 분명 성공할 거예요. 단단한 마음에 금이 간다면, 그 누구보다 #님이 먼저 알아차리고 보듬어줄 테니까요. 언제나 그랬듯이요!
    `,
    cardTitle: "단단한 도전",
  },
  {
    id: 6,
    img: "../img/card-ice.jpg",
    content: `
    투명한 눈꽃처럼 ‘순수한 도전 카드‘가 나왔네요. #님은 문제가 생겼을 때 거짓말보다는 솔직함으로 상황을 풀어나가는 스타일이에요. 
    정면돌파형이라고도 할 수 있죠.
    <br /><br />
    그래서 때로는 후회하는 순간도 찾아올 거예요. ‘내가 너무 솔직했나?’ 마음이 흔들리기도 할 거고요.
    <br /><br />
    하지만 거짓과 속임수로 성공한다면, 그걸 성공이라고 부를 수 있을까요? #님의 투명한 마음은 아무나 쉽게 따라 할 수 없는 특별한 가치라는 걸 잊지 마세요!
    `,
    cardTitle: "순수한 도전",
  },
  {
    id: 7,
    img: "../img/card-glitter.jpg",
    content: `
    황금빛으로 물든 ‘빛나는 도전 카드’가 나왔네요. 3님은 어떤 힘든 상황에서도 밝은 에너지를 잃지 않으려고 노력하는 사람이에요. 함께 있으면 주변 사람들도 웃음 짓게 되죠.
    <br /><br />
    그래서 때로는 외로운 순간이 찾아올 거예요. 사람이 언제나 밝고 행복할 수는 없는데, 힘든 감정을 쉽게 터놓지 못하니까요.
    <br /><br />
    하지만 주변을 조금만 돌아본다면, 그리 큰 문제는 아닐 거예요. 모두가 3님을 응원하고 있다는 걸 금방 알게 될 테니까요. 3님이 다른 사람들에게 그랬듯이요!
    `,
    cardTitle: "빛나는 도전",
  },
];

function get_query() {
  var url = document.location.href;
  var qs = url.substring(url.indexOf("?") + 1).split("&");
  for (var i = 0, result = {}; i < qs.length; i++) {
    qs[i] = qs[i].split("=");
    result[qs[i][0]] = decodeURIComponent(qs[i][1]);
  }
  return result;
}

function showScene(sceneNum) {
  if (sceneNum === 2) {
    for (let i = 0; i < cards.length; i++) {
      showCard(cards[i], i + 1);
    }
  }
  if (sceneNum === 3) {
    setTimeout(() => showScene(4), 4000);
  }
  if (sceneNum === 4) {
    let name = "";
    let id = "";
    if (param.id && param.username) {
      name = param.username;
      id = param.id;
    } else {
      name = cheerName.value;
      id = cardNum;
    }
    scene4cardText.innerHTML = `${name}님의 <br />${resultContent[id].cardTitle}`;
    scene4title.innerHTML = `${name}님을 위한<br /> 응원 카드`;
    scene4content.innerHTML = resultContent[id].content.replaceAll(/#/g, name);
    scene4cardImg.style.backgroundImage = `url(${resultContent[id].img})`;
  }
  document.body.setAttribute("id", `show-scene-${sceneNum}`);
}

function onClickChallengeBtn1() {
  showScene(1);
}

function onClickChallengeBtn2() {
  if (cheerName.value.length == 0) {
    alert("이름을 입력해주세요");
  } else {
    scene2cheerText.innerText = `${cheerName.value}님의 성격을 이모지로 표현한다면?`;
    showScene(2);
  }
}

function showCard(cardId, num) {
  setTimeout(() => {
    cardId.style.visibility = "visible";
    if (window.innerWidth > 480) {
      cardId.style.animation = "showCard 0.2s ease-in";
    }
  }, 200 * num);
}
function onClickCard(num) {
  cardNum = num;
  showScene(3);
}
function onClickButtonShare() {
  window.navigator.clipboard.writeText(
    window.location.href + `?id=${cardNum}&username=${cheerName.value}`
  );
  alert("링크를 복사했어요. 친구에게 공유해보세요❤️");
}

// ========= START: html2canvas.js 사용 코드 =========
//Creating dynamic link that automatically click
function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
  //after creating link you should delete dynamic link
  //clearDynamicLink(link);
}

function saveAs(uri, filename) {
  var link = document.createElement("a");
  if (typeof link.download === "string") {
    link.href = uri;
    link.download = filename;
    //Firefox requires the link to be in the body
    document.body.appendChild(link);
    //simulate click
    link.click();
    //remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}
// ========= END: html2canvas.js 사용 코드 =========

function onClickButtonDown() {
  html2canvas(
    document.querySelector(".my-scene-4 > div:nth-child(2) > div")
  ).then(function (canvas) {
    saveAs(canvas.toDataURL(), "file-name.png");
  });
}

function onClickButtonAgain() {
  window.location.href = window.location.origin + window.location.pathname;
}

(() => {
  challengeBtn1.addEventListener("click", onClickChallengeBtn1);
  challengeBtn2.addEventListener("click", onClickChallengeBtn2);
  shareBtn.addEventListener("click", onClickButtonShare);
  downBtn.addEventListener("click", onClickButtonDown);
  againBtn.addEventListener("click", onClickButtonAgain);

  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", () => onClickCard(i));
  }

  if (param.id && param.username) {
    showScene(4);
  } else {
    showScene(0);
  }
})();
