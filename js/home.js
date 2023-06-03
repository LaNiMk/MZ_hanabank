(() => {
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
  let enterNewScene = false; // 새로운 scene이 시작된 순간 true
  let acc = 0.2;
  let delayedYOffset = 0;
  let rafId;
  let rafState;

  // Scene Information
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

        canvas: document.querySelector("#video-canvas-0"),
        context: document.querySelector("#video-canvas-0").getContext("2d"),
        videoImages: [],
      },
      values: {
        videoImageCount: 480,
        imageSequence: [0, 480],
        canvas_opacity: [1, 0, { start: 0.9, end: 1 }],

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
        ctn: document.querySelector(".container"),
        container: document.querySelector("#scroll-section-2"),
        messageZ: document.querySelector("#scroll-section-2 .main-message.z"),
        messageA: document.querySelector("#scroll-section-2 .main-message.a"),
        messageB: document.querySelector("#scroll-section-2 .main-message.b"),
      },
      values: {
        messageZ_opacity_in: [0, 1, { start: 0, end: 0.25 }],
        messageZ_translateY_in: [350, 0, { start: 0, end: 0.25 }],
        messageZ_opacity_out: [1, 0, { start: 0.8, end: 0.85 }],
        messageZ_translateY_out: [0, 0, { start: 0.8, end: 0.85 }],

        messageA_opacity_in: [0, 1, { start: 0.35, end: 0.5 }],
        messageA_translateY_in: [50, 0, { start: 0.35, end: 0.5 }],
        messageA_opacity_out: [1, 0, { start: 0.55, end: 0.6 }],
        messageA_translateY_out: [0, 0, { start: 0.55, end: 0.6 }],

        messageB_opacity_in: [0, 1, { start: 0.65, end: 0.8 }],
        messageB_translateY_in: [50, 0, { start: 0.65, end: 0.8 }],
        messageB_opacity_out: [1, 0, { start: 0.9, end: 0.95 }],
        messageB_translateY_out: [0, 0, { start: 0.9, end: 0.95 }],
      },
    },

    {
      // 3
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        ctn: document.querySelector(".container"),
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

        ctn_bg_in_x: [0, 255, { start: 0.8, end: 0.95 }],
        ctn_bg_in_y: [0, 255, { start: 0.8, end: 0.95 }],
        ctn_bg_in_z: [0, 255, { start: 0.8, end: 0.95 }],
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
        messageA_opacity_in: [0, 1, { start: 0, end: 0.13 }],
        messageA_translateY_in: [300, 0, { start: 0, end: 0.13 }],
        messageA_opacity_out: [1, 0, { start: 0.13, end: 0.24 }],
        messageA_translateY_out: [0, -300, { start: 0.13, end: 0.24 }],

        messageB_opacity_in: [0, 1, { start: 0.08, end: 0.21 }],
        messageB_translateY_in: [300, 0, { start: 0.08, end: 0.21 }],
        messageB_opacity_out: [1, 0, { start: 0.21, end: 0.33 }],
        messageB_translateY_out: [0, -300, { start: 0.21, end: 0.33 }],

        messageC_opacity_in: [0, 1, { start: 0.16, end: 0.29 }],
        messageC_translateY_in: [300, 0, { start: 0.16, end: 0.29 }],
        messageC_opacity_out: [1, 0, { start: 0.29, end: 0.41 }],
        messageC_translateY_out: [0, -300, { start: 0.29, end: 0.41 }],

        messageD_opacity_in: [0, 1, { start: 0.24, end: 0.37 }],
        messageD_translateY_in: [300, 0, { start: 0.24, end: 0.37 }],
        messageD_opacity_out: [1, 0, { start: 0.37, end: 0.49 }],

        messageE_opacity_in: [0, 1, { start: 0.32, end: 0.45 }],
        messageE_translateY_in: [300, 0, { start: 0.32, end: 0.45 }],
        messageE_opacity_out: [1, 0, { start: 0.45, end: 0.57 }],
        messageE_translateY_out: [0, -300, { start: 0.45, end: 0.57 }],

        messageF_opacity_in: [0, 1, { start: 0.4, end: 0.53 }],
        messageF_translateY_in: [300, 0, { start: 0.4, end: 0.53 }],
        messageF_opacity_out: [1, 0, { start: 0.53, end: 0.65 }],
        messageF_translateY_out: [0, -300, { start: 0.53, end: 0.65 }],

        messageG_opacity_in: [0, 1, { start: 0.48, end: 0.61 }],
        messageG_translateY_in: [300, 0, { start: 0.48, end: 0.61 }],
        messageG_opacity_out: [1, 0, { start: 0.61, end: 0.73 }],
        messageG_translateY_out: [0, -300, { start: 0.61, end: 0.73 }],

        messageH_opacity_in: [0, 1, { start: 0.56, end: 0.69 }],
        messageH_translateY_in: [300, 0, { start: 0.56, end: 0.69 }],
        messageH_opacity_out: [1, 0, { start: 0.69, end: 0.81 }],
        messageH_translateY_out: [0, -300, { start: 0.69, end: 0.81 }],
      },
    },

    {
      // 5
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        ctn: document.querySelector(".container"),
        video: document.querySelector(".s-5-video"),
        container: document.querySelector("#scroll-section-5"),
        messageZ: document.querySelector("#scroll-section-5 .main-message.z"),
        messageA: document.querySelector("#scroll-section-5 .main-message.a"),
      },
      values: {
        messageZ_opacity_in: [0, 1, { start: 0, end: 0.25 }],
        messageZ_translateY_in: [50, 0, { start: 0, end: 0.25 }],
        messageZ_opacity_out: [1, 0, { start: 0.8, end: 0.87 }],
        messageZ_translateY_out: [0, 0, { start: 0.8, end: 0.87 }],

        messageZ_c_in_x: [0, 255, { start: 0.35, end: 0.5 }],
        messageZ_c_in_y: [0, 255, { start: 0.35, end: 0.5 }],
        messageZ_c_in_z: [0, 255, { start: 0.35, end: 0.5 }],

        messageA_opacity_in: [0, 1, { start: 0.35, end: 0.5 }],
        messageA_translateY_in: [50, 0, { start: 0.35, end: 0.5 }],
        messageA_opacity_out: [1, 0, { start: 0.8, end: 0.87 }],
        messageA_translateY_out: [0, 0, { start: 0.8, end: 0.87 }],

        messageA_font_in: [7, 4.5, { start: 0.35, end: 0.5 }],

        video_opacity_in: [0, 1, { start: 0.35, end: 0.5 }],
        video_opacity_out: [1, 0, { start: 0.8, end: 0.87 }],

        ctn_bg_in_x: [255, 0, { start: 0.8, end: 0.95 }],
        ctn_bg_in_y: [255, 0, { start: 0.8, end: 0.95 }],
        ctn_bg_in_z: [255, 0, { start: 0.8, end: 0.95 }],
      },
    },

    {
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
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        video: document.querySelector(".s-7-video"),
        container: document.querySelector("#scroll-section-7"),
        messageA: document.querySelector("#scroll-section-7 .main-message.a"),
        messageB: document.querySelector("#scroll-section-7 .main-message.b"),
      },
      values: {
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.15 }],
        messageA_translateY_in: [50, 0, { start: 0.1, end: 0.15 }],
        messageA_opacity_out: [1, 0, { start: 0.75, end: 0.85 }],
        messageA_translateY_out: [0, 0, { start: 0.75, end: 0.85 }],

        messageB_opacity_in: [0, 1, { start: 0.2, end: 0.25 }],
        messageB_translateY_in: [50, 0, { start: 0.2, end: 0.25 }],
        messageB_opacity_out: [1, 0, { start: 0.75, end: 0.85 }],
        messageB_translateY_out: [0, 0, { start: 0.75, end: 0.85 }],

        video_opacity_in: [0, 1, { start: 0.15, end: 0.25 }],
        video_opacity_out: [1, 0, { start: 0.75, end: 0.85 }],
      },
    },
  ];

  // canvas
  function setCanvasImages() {
    let imgElem;
    for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
      imgElem = new Image();
      let sequenceNum = String(1 + i);
      let sequenceStr = sequenceNum.padStart(3, "0");
      imgElem.src = `../sequence/${sequenceStr}.jpg`;
      sceneInfo[0].objs.videoImages.push(imgElem);
    }
  }

  // Header Check
  function checkMenu() {
    if (yOffset > 44) {
      document.body.classList.add("local-nav-sticky");
    } else {
      document.body.classList.remove("local-nav-sticky");
    }
  }

  // 스크롤섹션 번호에 따라 switch문으로 애니메이션 구현
  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
      case 0:
        objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);

        if (scrollRatio <= 0.04) {
          objs.messageZ.style.opacity = 1;
        } else {
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_out, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.22) {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.51) {
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.58) {
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.65) {
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(
            values.messageD_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(
            values.messageD_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        break;
      case 1:
        if (scrollRatio <= 0.22) {
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_in, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_out, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.47) {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.75) {
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        break;
      case 2:
        if (scrollRatio <= 0.3) {
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_in, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_out, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.55) {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.87) {
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
        }
        break;
      case 3:
        if (scrollRatio >= 0.8) {
          let bg_x = calcValues(values.ctn_bg_in_x, currentYOffset);
          let bg_y = calcValues(values.ctn_bg_in_y, currentYOffset);
          let bg_z = calcValues(values.ctn_bg_in_z, currentYOffset);
          objs.ctn.style.background = `rgb(${bg_x}, ${bg_y}, ${bg_z})`;
        }

        if (scrollRatio <= 0.1) {
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_in, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_out, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.3) {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.6) {
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.8) {
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_out,
            currentYOffset
          )}%, 0)`;
        }
        break;
      case 4:
        if (scrollRatio <= 0.13) {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.21) {
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.29) {
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.37) {
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(
            values.messageD_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(
            values.messageD_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.45) {
          objs.messageE.style.opacity = calcValues(values.messageE_opacity_in, currentYOffset);
          objs.messageE.style.transform = `translate3d(0, ${calcValues(
            values.messageE_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageE.style.opacity = calcValues(values.messageE_opacity_out, currentYOffset);
          objs.messageE.style.transform = `translate3d(0, ${calcValues(
            values.messageE_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.53) {
          objs.messageF.style.opacity = calcValues(values.messageF_opacity_in, currentYOffset);
          objs.messageF.style.transform = `translate3d(0, ${calcValues(
            values.messageF_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageF.style.opacity = calcValues(values.messageF_opacity_out, currentYOffset);
          objs.messageF.style.transform = `translate3d(0, ${calcValues(
            values.messageF_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.61) {
          objs.messageG.style.opacity = calcValues(values.messageG_opacity_in, currentYOffset);
          objs.messageG.style.transform = `translate3d(0, ${calcValues(
            values.messageG_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageG.style.opacity = calcValues(values.messageG_opacity_out, currentYOffset);
          objs.messageG.style.transform = `translate3d(0, ${calcValues(
            values.messageG_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.69) {
          objs.messageH.style.opacity = calcValues(values.messageH_opacity_in, currentYOffset);
          objs.messageH.style.transform = `translate3d(0, ${calcValues(
            values.messageH_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageH.style.opacity = calcValues(values.messageH_opacity_out, currentYOffset);
          objs.messageH.style.transform = `translate3d(0, ${calcValues(
            values.messageH_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        break;
      case 5:
        if (scrollRatio >= 0.8) {
          let bg_x = calcValues(values.ctn_bg_in_x, currentYOffset);
          let bg_y = calcValues(values.ctn_bg_in_y, currentYOffset);
          let bg_z = calcValues(values.ctn_bg_in_z, currentYOffset);
          objs.ctn.style.background = `rgb(${bg_x}, ${bg_y}, ${bg_z})`;
        }

        if (scrollRatio <= 0.3) {
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_in, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_out, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.55) {
          let c_x = calcValues(values.messageZ_c_in_x, currentYOffset);
          let c_y = calcValues(values.messageZ_c_in_y, currentYOffset);
          let c_z = calcValues(values.messageZ_c_in_z, currentYOffset);
          objs.messageZ.style.color = `rgb(${c_x}, ${c_y}, ${c_z})`;
          objs.messageA.style.fontSize = `${calcValues(values.messageA_font_in, currentYOffset)}rem`;
          objs.video.style.opacity = calcValues(values.video_opacity_in, currentYOffset);
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.video.style.opacity = calcValues(values.video_opacity_out, currentYOffset);
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        break;
      case 6:
        if (scrollRatio <= 0.3) {
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_in, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageZ.style.opacity = calcValues(values.messageZ_opacity_out, currentYOffset);
          objs.messageZ.style.transform = `translate3d(0, ${calcValues(
            values.messageZ_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.55) {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.87) {
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
        }
        break;
      case 7:
        if (scrollRatio <= 0.55) {
          objs.video.style.opacity = calcValues(values.video_opacity_in, currentYOffset);
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.video.style.opacity = calcValues(values.video_opacity_out, currentYOffset);
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.55) {
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
        }
        break;
    }
  }

  // 각 스크롤 섹션의 높이 세팅
  function setLayout() {
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === "sticky") {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if (sceneInfo[i].type === "normal") {
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.content.offsetHeight + window.innerHeight * 0.5;
      }
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

    const heightRatio = window.innerHeight / 1000;
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  }

  // 각 스크롤섹션에서의 스크롤 비율 구하기
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

  // 스크롤할 때마다 eventListner 1
  function scrollLoop() {
    checkMenu();
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

  // 스크롤할 때마다 eventListner 2
  function loop() {
    delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

    if (!enterNewScene) {
      // 이미지 시퀀스 비디오가 포함된 씬만 처리
      if (currentScene === 0) {
        const currentYOffset = delayedYOffset - prevScrollHeight;
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        if (objs.videoImages[sequence]) {
          objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        }
      }
    }

    // 일부 기기에서 페이지 끝으로 고속 이동하면 body id가 제대로 인식 안되는 경우를 해결
    // 페이지 맨 위로 갈 경우: scrollLoop와 첫 scene의 기본 캔버스 그리기 수행
    if (delayedYOffset < 1) {
      scrollLoop();
      sceneInfo[0].objs.canvas.style.opacity = 1;
      sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
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

  function init() {
    yOffset = window.pageYOffset;
    if (yOffset === 0) {
      const title = document.querySelector("#scroll-section-0 .main-message.z");
      title.style.opacity = 1;
    }
  }

  setCanvasImages();
  init();
})();
