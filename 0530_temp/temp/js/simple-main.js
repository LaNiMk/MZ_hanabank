(() => {
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
  let enterNewScene = false; // 새로운 scene이 시작된 순간 true
  let acc = 0.2;
  let delayedYOffset = 0;
  let rafId;
  let rafState;
  // let homeTitle = document.querySelector(".home-title");
  // homeTitle.style.opacity = 1;

  const sceneInfo = [
    {
      // 0
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageZ: document.querySelector("#scroll-section-0 .main-message.z"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
      },
      values: {
        messageZ_opacity_in: [0, 1, { start: 0, end: 0.03 }],
        messageZ_translateY_in: [20, 0, { start: 0, end: 0.03 }],
        messageZ_opacity_out: [1, 0, { start: 0.05, end: 0.08 }],
        messageZ_translateY_out: [0, -20, { start: 0.05, end: 0.08 }],

        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],

        messageB_opacity_in: [0, 1, { start: 0.45, end: 0.5 }],
        messageB_translateY_in: [20, 0, { start: 0.45, end: 0.5 }],
        messageB_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        messageB_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],

        messageC_opacity_in: [0, 1, { start: 0.52, end: 0.57 }],
        messageC_translateY_in: [20, 0, { start: 0.52, end: 0.57 }],
        messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],

        messageD_opacity_in: [0, 1, { start: 0.59, end: 0.64 }],
        messageD_translateY_in: [20, 0, { start: 0.59, end: 0.64 }],
        messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
      },
    },

    {
      // 1
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
        messageZ: document.querySelector("#scroll-section-1 .card-message.z"),
        messageA: document.querySelector("#scroll-section-1 .card-message.a"),
        messageB: document.querySelector("#scroll-section-1 .card-message.b"),
      },
      values: {
        messageZ_opacity_in: [0, 1, { start: 0, end: 0.2 }],
        messageZ_translateY_in: [20, 0, { start: 0, end: 0.2 }],
        messageZ_opacity_out: [1, 0, { start: 0.8, end: 0.9 }],
        messageZ_translateY_out: [0, -20, { start: 0.8, end: 0.9 }],

        messageA_opacity_in: [0, 1, { start: 0.25, end: 0.45 }],
        messageA_translateY_in: [20, 0, { start: 0.25, end: 0.45 }],
        messageA_opacity_out: [1, 0, { start: 0.8, end: 0.9 }],
        messageA_translateY_out: [0, -20, { start: 0.8, end: 0.9 }],

        messageB_opacity_in: [0, 1, { start: 0.5, end: 0.7 }],
        messageB_translateY_in: [20, 0, { start: 0.5, end: 0.7 }],
        messageB_opacity_out: [1, 0, { start: 0.8, end: 0.9 }],
        messageB_translateY_out: [0, -20, { start: 0.8, end: 0.9 }],
      },
    },

    {
      // 2
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
        messageZ: document.querySelector("#scroll-section-2 .main-message.z"),
        messageA: document.querySelector("#scroll-section-2 .main-message.a"),
        messageB: document.querySelector("#scroll-section-2 .main-message.b"),
        grad: document.querySelector(".grad"),
      },
      values: {
        messageZ_opacity_in: [0, 1, { start: 0, end: 0.25 }],
        messageZ_translateY_in: [350, 0, { start: 0, end: 0.25 }],
        messageZ_opacity_out: [1, 0, { start: 0.8, end: 0.87 }],
        messageZ_translateY_out: [0, 0, { start: 0.8, end: 0.87 }],

        messageA_opacity_in: [0, 1, { start: 0.35, end: 0.5 }],
        messageA_translateY_in: [50, 0, { start: 0.35, end: 0.5 }],
        messageA_opacity_out: [1, 0, { start: 0.6, end: 0.62 }],
        messageA_translateY_out: [0, 0, { start: 0.6, end: 0.62 }],

        grad_in: [255, 0, { start: 0.4, end: 0.5 }],
        grad_out: [0, 255, { start: 0.5, end: 0.6 }],

        messageB_opacity_in: [0, 1, { start: 0.65, end: 0.8 }],
        messageB_translateY_in: [50, 0, { start: 0.65, end: 0.8 }],
        messageB_opacity_out: [1, 0, { start: 0.9, end: 0.93 }],
        messageB_translateY_out: [0, 0, { start: 0.9, end: 0.93 }],
      },
    },

    {
      // 3
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
        messageZ: document.querySelector("#scroll-section-3 .card-message.z"),
        messageA: document.querySelector("#scroll-section-3 .card-message.a"),
        messageB: document.querySelector("#scroll-section-3 .card-message.b"),
        messageC: document.querySelector("#scroll-section-3 .card-message.c"),
      },
      values: {
        messageZ_opacity_in: [0, 1, { start: 0, end: 0.05 }],
        messageZ_translateY_in: [20, 0, { start: 0, end: 0.05 }],
        messageZ_opacity_out: [1, 0, { start: 0.2, end: 0.22 }],
        messageZ_translateY_out: [0, -20, { start: 0.2, end: 0.22 }],

        messageA_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
        messageA_translateY_in: [20, 0, { start: 0.25, end: 0.3 }],
        messageA_opacity_out: [1, 0, { start: 0.45, end: 0.47 }],
        messageA_translateY_out: [0, -20, { start: 0.45, end: 0.47 }],

        messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        messageB_translateY_in: [20, 0, { start: 0.5, end: 0.55 }],
        messageB_opacity_out: [1, 0, { start: 0.7, end: 0.72 }],
        messageB_translateY_out: [0, -20, { start: 0.7, end: 0.72 }],

        messageC_opacity_in: [0, 1, { start: 0.75, end: 0.8 }],
        messageC_translateY_in: [20, 0, { start: 0.75, end: 0.8 }],
        messageC_opacity_out: [1, 0, { start: 0.95, end: 0.97 }],
        messageC_translateY_out: [0, -20, { start: 0.95, end: 0.97 }],
      },
    },

    {
      // 4
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-4"),
        messageA: document.querySelector("#scroll-section-4 .main-message.a"),
        messageB: document.querySelector("#scroll-section-4 .main-message.b"),
        messageC: document.querySelector("#scroll-section-4 .main-message.c"),
        messageD: document.querySelector("#scroll-section-4 .main-message.d"),
        messageE: document.querySelector("#scroll-section-4 .main-message.e"),
        messageF: document.querySelector("#scroll-section-4 .main-message.f"),
        messageG: document.querySelector("#scroll-section-4 .main-message.g"),
        messageH: document.querySelector("#scroll-section-4 .main-message.h"),
      },
      values: {
        messageA_opacity_in: [0, 1, { start: 0, end: 0.125 }],
        messageA_translateY_in: [500, 0, { start: 0, end: 0.125 }],
        messageA_opacity_out: [1, 0, { start: 0.13, end: 0.25 }],
        messageA_translateY_out: [0, -500, { start: 0.13, end: 0.25 }],

        messageB_opacity_in: [0, 1, { start: 0.08, end: 0.205 }],
        messageB_translateY_in: [500, 0, { start: 0.08, end: 0.205 }],
        messageB_opacity_out: [1, 0, { start: 0.21, end: 0.33 }],
        messageB_translateY_out: [0, -500, { start: 0.21, end: 0.33 }],

        messageC_opacity_in: [0, 1, { start: 0.16, end: 0.285 }],
        messageC_translateY_in: [500, 0, { start: 0.16, end: 0.285 }],
        messageC_opacity_out: [1, 0, { start: 0.29, end: 0.41 }],
        messageC_translateY_out: [0, -500, { start: 0.29, end: 0.41 }],

        messageD_opacity_in: [0, 1, { start: 0.24, end: 0.365 }],
        messageD_translateY_in: [500, 0, { start: 0.24, end: 0.365 }],
        messageD_opacity_out: [1, 0, { start: 0.37, end: 0.49 }],
        messageD_translateY_out: [0, -500, { start: 0.37, end: 0.49 }],

        messageE_opacity_in: [0, 1, { start: 0.32, end: 0.445 }],
        messageE_translateY_in: [500, 0, { start: 0.32, end: 0.445 }],
        messageE_opacity_out: [1, 0, { start: 0.45, end: 0.57 }],
        messageE_translateY_out: [0, -500, { start: 0.45, end: 0.57 }],

        messageF_opacity_in: [0, 1, { start: 0.4, end: 0.525 }],
        messageF_translateY_in: [500, 0, { start: 0.4, end: 0.525 }],
        messageF_opacity_out: [1, 0, { start: 0.53, end: 0.65 }],
        messageF_translateY_out: [0, -500, { start: 0.53, end: 0.65 }],

        messageG_opacity_in: [0, 1, { start: 0.48, end: 0.605 }],
        messageG_translateY_in: [500, 0, { start: 0.48, end: 0.605 }],
        messageG_opacity_out: [1, 0, { start: 0.61, end: 0.73 }],
        messageG_translateY_out: [0, -500, { start: 0.61, end: 0.73 }],

        messageH_opacity_in: [0, 1, { start: 0.56, end: 0.685 }],
        messageH_translateY_in: [500, 0, { start: 0.56, end: 0.685 }],
        messageH_opacity_out: [1, 0, { start: 0.69, end: 0.81 }],
        messageH_translateY_out: [0, -500, { start: 0.69, end: 0.81 }],
      },
    },

    {
      // 5
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-5"),
        messageZ: document.querySelector("#scroll-section-5 .main-message.z"),
        messageA: document.querySelector("#scroll-section-5 .main-message.a"),
        messageB: document.querySelector("#scroll-section-5 .main-message.b"),
        grad: document.querySelector(".grad"),
      },
      values: {
        messageZ_opacity_in: [0, 1, { start: 0, end: 0.25 }],
        messageZ_translateY_in: [50, 0, { start: 0, end: 0.25 }],
        messageZ_opacity_out: [1, 0, { start: 0.8, end: 0.87 }],
        messageZ_translateY_out: [0, 0, { start: 0.8, end: 0.87 }],

        messageA_opacity_in: [0, 1, { start: 0.35, end: 0.5 }],
        messageA_translateY_in: [50, 0, { start: 0.35, end: 0.5 }],
        messageA_opacity_out: [1, 0, { start: 0.8, end: 0.87 }],
        messageA_translateY_out: [0, 0, { start: 0.8, end: 0.87 }],

        messageA_font_in: [7, 4.5, { start: 0.35, end: 0.5 }],

        grad_in: [255, 0, { start: 0.4, end: 0.5 }],
        grad_out: [0, 255, { start: 0.5, end: 0.6 }],

        messageB_opacity_in: [0, 1, { start: 0.65, end: 0.8 }],
        messageB_translateY_in: [50, 0, { start: 0.65, end: 0.8 }],
        messageB_opacity_out: [1, 0, { start: 0.9, end: 0.93 }],
        messageB_translateY_out: [0, 0, { start: 0.9, end: 0.93 }],
      },
    },

    {
      // 6
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-6"),
        messageZ: document.querySelector("#scroll-section-6 .card-message.z"),
        messageA: document.querySelector("#scroll-section-6 .main-message.a"),
        messageB: document.querySelector("#scroll-section-6 .main-message.b"),
      },
      values: {
        messageZ_opacity_in: [0, 1, { start: 0, end: 0.05 }],
        messageZ_translateY_in: [50, 0, { start: 0, end: 0.05 }],
        messageZ_opacity_out: [1, 0, { start: 0.9, end: 0.95 }],
        messageZ_translateY_out: [0, 0, { start: 0.9, end: 0.95 }],

        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.15 }],
        messageA_translateY_in: [50, 0, { start: 0.1, end: 0.15 }],
        messageA_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
        messageA_translateY_out: [0, 0, { start: 0.45, end: 0.5 }],

        messageB_opacity_in: [0, 1, { start: 0.55, end: 0.6 }],
        messageB_translateY_in: [50, 0, { start: 0.55, end: 0.6 }],
        messageB_opacity_out: [1, 0, { start: 0.9, end: 0.95 }],
        messageB_translateY_out: [0, 0, { start: 0.9, end: 0.95 }],
      },
    },

    {
      // 7
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-7"),
        messageZ: document.querySelector("#scroll-section-7 .card-message.z"),
        messageA: document.querySelector("#scroll-section-7 .main-message.a"),
        messageB: document.querySelector("#scroll-section-7 .main-message.b"),
      },
      values: {
        messageZ_opacity_in: [0, 1, { start: 0, end: 0.05 }],
        messageZ_translateY_in: [50, 0, { start: 0, end: 0.05 }],
        messageZ_opacity_out: [1, 0, { start: 0.75, end: 0.85 }],
        messageZ_translateY_out: [0, 0, { start: 0.75, end: 0.85 }],

        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.15 }],
        messageA_translateY_in: [50, 0, { start: 0.1, end: 0.15 }],
        messageA_opacity_out: [1, 0, { start: 0.75, end: 0.85 }],
        messageA_translateY_out: [0, 0, { start: 0.75, end: 0.85 }],

        messageB_opacity_in: [0, 1, { start: 0.2, end: 0.25 }],
        messageB_translateY_in: [50, 0, { start: 0.2, end: 0.25 }],
        messageB_opacity_out: [1, 0, { start: 0.75, end: 0.85 }],
        messageB_translateY_out: [0, 0, { start: 0.75, end: 0.85 }],
      },
    },
  ];

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
      case 0:
        if (scrollRatio <= 0.04) {
          // in
          objs.messageZ.style.opacity = 1;
          // objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_in, currentYOffset);
          // objs.messageZ.style.transform = `translate3d(0, ${calcValues(
          //   values.messageZ_translateY_in,
          //   currentYOffset
          // )}%, 0)`;
        } else {
          // out
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_out, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.22) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.51) {
          // in
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.58) {
          // in
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.65) {
          // in
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(
            values.messageD_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(
            values.messageD_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        break;
      case 1:
        if (scrollRatio <= 0.22) {
          // in
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_in, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_out, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.47) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.75) {
          // in
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        break;
      case 2:
        if (scrollRatio <= 0.3) {
          // in
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_in, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_out, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.55) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          // objs.grad.style.background = `linear-gradient(to top right, #121fcf 0%, #131313 100%)`;
          // console.log(objs.grad.style.background);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.87) {
          // in
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
        }
        break;
      case 3:
        if (scrollRatio <= 0.1) {
          // in
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_in, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_out, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.3) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.6) {
          // in
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.8) {
          // in
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_out,
            currentYOffset
          )}%, 0)`;
        }
        break;
      case 4:
        if (scrollRatio <= 0.125) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.205) {
          // in
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.285) {
          // i
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.365) {
          // in
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(
            values.messageD_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(
            values.messageD_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.445) {
          // in
          objs.messageE.style.opacity = calcValues(values.messageE_opacity_in, currentYOffset);
          objs.messageE.style.transform = `translate3d(0, ${calcValues(
            values.messageE_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageE.style.opacity = calcValues(values.messageE_opacity_out, currentYOffset);
          objs.messageE.style.transform = `translate3d(0, ${calcValues(
            values.messageE_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.525) {
          // in
          objs.messageF.style.opacity = calcValues(values.messageF_opacity_in, currentYOffset);
          objs.messageF.style.transform = `translate3d(0, ${calcValues(
            values.messageF_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageF.style.opacity = calcValues(values.messageF_opacity_out, currentYOffset);
          objs.messageF.style.transform = `translate3d(0, ${calcValues(
            values.messageF_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.605) {
          // in
          objs.messageG.style.opacity = calcValues(values.messageG_opacity_in, currentYOffset);
          objs.messageG.style.transform = `translate3d(0, ${calcValues(
            values.messageG_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageG.style.opacity = calcValues(values.messageG_opacity_out, currentYOffset);
          objs.messageG.style.transform = `translate3d(0, ${calcValues(
            values.messageG_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.685) {
          // in
          objs.messageH.style.opacity = calcValues(values.messageH_opacity_in, currentYOffset);
          objs.messageH.style.transform = `translate3d(0, ${calcValues(
            values.messageH_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageH.style.opacity = calcValues(values.messageH_opacity_out, currentYOffset);
          objs.messageH.style.transform = `translate3d(0, ${calcValues(
            values.messageH_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        break;
      case 5:
        if (scrollRatio <= 0.3) {
          // in
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_in, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_out, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.55) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          // objs.grad.style.background = `linear-gradient(to top right, #121fcf 0%, #131313 100%)`;
          // console.log(objs.grad.style.background);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
          objs.messageA.style.fontSize = `${calcValues(values.messageA_font_in, currentYOffset)}rem`;
          console.log(objs.messageA.style);
          console.log(objs.messageZ.style);
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.87) {
          // in
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
        }
        break;
      case 6:
        if (scrollRatio <= 0.3) {
          // in
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_in, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_out, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.55) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          // objs.grad.style.background = `linear-gradient(to top right, #121fcf 0%, #131313 100%)`;
          // console.log(objs.grad.style.background);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
          // objs.messageA.style.fontSize = `${calcValues(values.messageA_font_in, currentYOffset)}rem`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.87) {
          // in
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
        }
        break;
      case 7:
        if (scrollRatio <= 0.07) {
          // in
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_in, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_out, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.55) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          // objs.grad.style.background = `linear-gradient(to top right, #121fcf 0%, #131313 100%)`;
          // console.log(objs.grad.style.background);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
          // objs.messageA.style.fontSize = `${calcValues(values.messageA_font_in, currentYOffset)}rem`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.55) {
          // in
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
        }
        break;
    }
  }

  function checkMenu() {
    console.log(yOffset);
    if (yOffset > 44) {
      document.body.classList.add("local-nav-sticky");
    } else {
      document.body.classList.remove("local-nav-sticky");
    }
  }

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === "sticky") {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if (sceneInfo[i].type === "normal") {
        // objs.content가 없는 경우, sceneInfo에 objs.content를 추가해야 합니다.
        // 예를들어 아래의 구조라면, content는 섹션의 내용을 통째로 감싸는 .description으로 지정해주시면 됩니다.
        // 강의에서 진행하는 메인 소스(main.js)에 구현되어 있는 부분을 참고하시면 쉽습니다.
        // <section class="scroll-section">
        //     <div class="description">
        //         lorem ipsum
        //     </div>
        // </section>
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.content.offsetHeight + window.innerHeight * 0.5;
      }
      console.log(sceneInfo[i].objs.container);
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset;

    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-scene-${currentScene}`);

    const heightRatio = window.innerHeight / 1080;
  }

  function calcValues(values, currentYOffset) {
    let rv;
    // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
      // start ~ end 사이에 애니메이션 실행
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
        rv = ((currentYOffset - partScrollStart) / partScrollHeight) * (values[1] - values[0]) + values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  }
  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (delayedYOffset < prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      document.body.classList.remove("scroll-effect-end");
    }

    if (delayedYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      if (currentScene === sceneInfo.length - 1) {
        document.body.classList.add("scroll-effect-end");
      }
      if (currentScene < sceneInfo.length - 1) {
        currentScene++;
      }
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (delayedYOffset < prevScrollHeight) {
      enterNewScene = true;
      // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
      if (currentScene === 0) return;
      currentScene--;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (enterNewScene) return;

    playAnimation();
  }

  function loop() {
    delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

    if (!enterNewScene) {
      // 이미지 시퀀스 비디오가 포함된 씬만 처리
      if (currentScene === 0) {
        const currentYOffset = delayedYOffset - prevScrollHeight;
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
      }
    }

    // 일부 기기에서 페이지 끝으로 고속 이동하면 body id가 제대로 인식 안되는 경우를 해결
    // 페이지 맨 위로 갈 경우: scrollLoop와 첫 scene의 기본 캔버스 그리기 수행
    if (delayedYOffset < 1) {
      scrollLoop();
    }
    // 페이지 맨 아래로 갈 경우: 마지막 섹션은 스크롤 계산으로 위치 및 크기를 결정해야할 요소들이 많아서 1픽셀을 움직여주는 것으로 해결
    if (document.body.offsetHeight - window.innerHeight - delayedYOffset < 1) {
      let tempYOffset = yOffset;
      scrollTo(0, tempYOffset - 1);
    }

    rafId = requestAnimationFrame(loop);

    if (Math.abs(yOffset - delayedYOffset) < 1) {
      cancelAnimationFrame(rafId);
      rafState = false;
    }
  }

  window.addEventListener("load", () => {
    document.body.classList.remove("before-load");
    setLayout();
    checkMenu();

    // 이미지 시퀀스 비디오가 있는 씬의 캔버스에 첫 장면 그려주기

    // 중간에서 새로고침 했을 경우 자동 스크롤로 제대로 그려주기
    let tempYOffset = yOffset;
    let tempScrollCount = 0;
    if (tempYOffset > 0) {
      let siId = setInterval(() => {
        scrollTo(0, tempYOffset);
        tempYOffset += 5;

        if (tempScrollCount > 20) {
          clearInterval(siId);
        }
        tempScrollCount++;
      }, 20);
    }

    window.addEventListener("scroll", () => {
      yOffset = window.pageYOffset;
      scrollLoop();

      if (!rafState) {
        rafId = requestAnimationFrame(loop);
        rafState = true;
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        setLayout();
      }
    });

    window.addEventListener("orientationchange", () => {
      setTimeout(setLayout, 500);
    });

    document.querySelector(".loading").addEventListener("transitionend", (e) => {
      document.body.removeChild(e.currentTarget);
    });
  });
})();
