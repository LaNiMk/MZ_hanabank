export const sceneInfo = [
  {
    // 0
    type: "sticky",
    heightNum: 5,
    scrollHeight: 0,
    videoImageCount: 480,
    imageSequence: [1, 480],
    objs: {
      z: document.querySelector("#scroll-section-0 .main-message.z"),
      a: document.querySelector("#scroll-section-0 .main-message.a"),
      b: document.querySelector("#scroll-section-0 .main-message.b"),
      c: document.querySelector("#scroll-section-0 .main-message.c"),
      d: document.querySelector("#scroll-section-0 .main-message.d"),
      videoImages: [],
      container: document.querySelector("#scroll-section-0"),
      canvas: document.querySelector("#video-canvas-0"),
      v: document.querySelector("#video-canvas-0"),
      context: document.querySelector("#video-canvas-0").getContext("2d"),
    },
    values: {
      z_opacity: [1, 1, { start: 0, end: 0.03 }, 1, 0, { start: 0.05, end: 0.08 }],
      z_transform: [20, 0, { start: 0, end: 0.03 }, 0, -20, { start: 0.05, end: 0.08 }],
      a_opacity: [0, 1, { start: 0.1, end: 0.2 }, 1, 0, { start: 0.25, end: 0.3 }],
      a_transform: [20, 0, { start: 0.1, end: 0.2 }, 0, -20, { start: 0.25, end: 0.3 }],
      b_opacity: [0, 1, { start: 0.45, end: 0.5 }, 1, 0, { start: 0.85, end: 0.9 }],
      b_transform: [20, 0, { start: 0.45, end: 0.5 }, 0, -20, { start: 0.85, end: 0.9 }],
      c_opacity: [0, 1, { start: 0.52, end: 0.57 }, 1, 0, { start: 0.85, end: 0.9 }],
      c_transform: [20, 0, { start: 0.52, end: 0.57 }, 0, -20, { start: 0.85, end: 0.9 }],
      d_opacity: [0, 1, { start: 0.59, end: 0.64 }, 1, 0, { start: 0.85, end: 0.9 }],
      d_transform: [20, 0, { start: 0.59, end: 0.64 }, 0, -20, { start: 0.85, end: 0.9 }],
      v_opacity: [1, 0, { start: 0.9, end: 1 }, 0, 0, { start: 1, end: 1 }],
    },
  },

  {
    // 1
    type: "sticky",
    heightNum: 5,
    scrollHeight: 0,
    objs: {
      container: document.querySelector("#scroll-section-1"),
      z: document.querySelector("#scroll-section-1 .card-message.z"),
      a: document.querySelector("#scroll-section-1 .card-message.a"),
      b: document.querySelector("#scroll-section-1 .card-message.b"),
    },
    values: {
      z_opacity: [0, 1, { start: 0, end: 0.2 }, 1, 0, { start: 0.8, end: 0.9 }],
      z_transform: [20, 0, { start: 0, end: 0.2 }, 0, -20, { start: 0.8, end: 0.9 }],
      a_opacity: [0, 1, { start: 0.25, end: 0.45 }, 1, 0, { start: 0.8, end: 0.9 }],
      a_transform: [20, 0, { start: 0.25, end: 0.45 }, 0, -20, { start: 0.8, end: 0.9 }],
      b_opacity: [0, 1, { start: 0.5, end: 0.7 }, 1, 0, { start: 0.8, end: 0.9 }],
      b_transform: [20, 0, { start: 0.5, end: 0.7 }, 0, -20, { start: 0.8, end: 0.9 }],
    },
  },

  {
    // 2
    type: "sticky",
    heightNum: 5,
    scrollHeight: 0,
    objs: {
      container: document.querySelector("#scroll-section-2"),
      z: document.querySelector("#scroll-section-2 .main-message.z"),
      a: document.querySelector("#scroll-section-2 .main-message.a"),
      b: document.querySelector("#scroll-section-2 .main-message.b"),
    },
    values: {
      z_opacity: [0, 1, { start: 0, end: 0.25 }, 1, 0, { start: 0.8, end: 0.85 }],
      z_transform: [350, 0, { start: 0, end: 0.25 }, 0, 0, { start: 0.8, end: 0.85 }],
      a_opacity: [0, 1, { start: 0.35, end: 0.5 }, 1, 0, { start: 0.55, end: 0.6 }],
      a_transform: [50, 0, { start: 0.35, end: 0.5 }, 0, 0, { start: 0.55, end: 0.6 }],
      b_opacity: [0, 1, { start: 0.65, end: 0.8 }, 1, 0, { start: 0.9, end: 0.95 }],
      b_transform: [50, 0, { start: 0.65, end: 0.8 }, 0, 0, { start: 0.9, end: 0.95 }],
    },
  },

  {
    // 3
    type: "sticky",
    heightNum: 5,
    scrollHeight: 0,
    objs: {
      k: document.querySelector(".container"),
      container: document.querySelector("#scroll-section-3"),
      z: document.querySelector("#scroll-section-3 .card-message.z"),
      a: document.querySelector("#scroll-section-3 .card-message.a"),
      b: document.querySelector("#scroll-section-3 .card-message.b"),
      c: document.querySelector("#scroll-section-3 .card-message.c"),
    },
    values: {
      z_opacity: [0, 1, { start: 0, end: 0.05 }, 1, 0, { start: 0.2, end: 0.22 }],
      z_transform: [1, 0, { start: 0, end: 0.05 }, 0, -1, { start: 0.2, end: 0.22 }],
      a_opacity: [0, 1, { start: 0.25, end: 0.3 }, 1, 0, { start: 0.45, end: 0.47 }],
      a_transform: [1, 0, { start: 0.25, end: 0.3 }, 0, -1, { start: 0.45, end: 0.47 }],
      b_opacity: [0, 1, { start: 0.5, end: 0.55 }, 1, 0, { start: 0.7, end: 0.72 }],
      b_transform: [1, 0, { start: 0.5, end: 0.55 }, 0, -1, { start: 0.7, end: 0.72 }],
      c_opacity: [0, 1, { start: 0.75, end: 0.8 }, 1, 0, { start: 0.95, end: 0.97 }],
      c_transform: [1, 0, { start: 0.75, end: 0.8 }, 0, -1, { start: 0.95, end: 0.97 }],
      k_background: [0, 255, { start: 0.8, end: 0.95 }, 255, 255, { start: 0.95, end: 0.95 }],
    },
  },

  {
    // 4
    type: "sticky",
    heightNum: 5,
    scrollHeight: 0,
    objs: {
      container: document.querySelector("#scroll-section-4"),
      a: document.querySelector("#scroll-section-4 .main-message.a"),
      b: document.querySelector("#scroll-section-4 .main-message.b"),
      c: document.querySelector("#scroll-section-4 .main-message.c"),
      d: document.querySelector("#scroll-section-4 .main-message.d"),
      e: document.querySelector("#scroll-section-4 .main-message.e"),
      f: document.querySelector("#scroll-section-4 .main-message.f"),
      g: document.querySelector("#scroll-section-4 .main-message.g"),
      h: document.querySelector("#scroll-section-4 .main-message.h"),
    },
    values: {
      a_opacity: [0, 1, { start: 0, end: 0.13 }, 1, 0, { start: 0.13, end: 0.24 }],
      a_transform: [300, 0, { start: 0, end: 0.13 }, 0, -300, { start: 0.13, end: 0.24 }],
      b_opacity: [0, 1, { start: 0.08, end: 0.21 }, 1, 0, { start: 0.21, end: 0.33 }],
      b_transform: [300, 0, { start: 0.08, end: 0.21 }, 0, -300, { start: 0.21, end: 0.33 }],
      c_opacity: [0, 1, { start: 0.16, end: 0.29 }, 1, 0, { start: 0.29, end: 0.41 }],
      c_transform: [300, 0, { start: 0.16, end: 0.29 }, 0, -300, { start: 0.29, end: 0.41 }],
      d_opacity: [0, 1, { start: 0.24, end: 0.37 }, 1, 0, { start: 0.37, end: 0.49 }],
      d_transform: [300, 0, { start: 0.24, end: 0.37 }, 0, -300, { start: 0.37, end: 0.49 }],
      e_opacity: [0, 1, { start: 0.32, end: 0.45 }, 1, 0, { start: 0.45, end: 0.57 }],
      e_transform: [300, 0, { start: 0.32, end: 0.45 }, 0, -300, { start: 0.45, end: 0.57 }],
      f_opacity: [0, 1, { start: 0.4, end: 0.53 }, 1, 0, { start: 0.53, end: 0.65 }],
      f_transform: [300, 0, { start: 0.4, end: 0.53 }, 0, -300, { start: 0.53, end: 0.65 }],
      g_opacity: [0, 1, { start: 0.48, end: 0.61 }, 1, 0, { start: 0.61, end: 0.73 }],
      g_transform: [300, 0, { start: 0.48, end: 0.61 }, 0, -300, { start: 0.61, end: 0.73 }],
      h_opacity: [0, 1, { start: 0.56, end: 0.69 }, 1, 0, { start: 0.69, end: 0.81 }],
      h_transform: [300, 0, { start: 0.56, end: 0.69 }, 0, -300, { start: 0.69, end: 0.81 }],
    },
  },

  {
    // 5
    type: "sticky",
    heightNum: 5,
    scrollHeight: 0,
    objs: {
      k: document.querySelector(".container"),
      v: document.querySelector(".s-5-video"),
      container: document.querySelector("#scroll-section-5"),
      z: document.querySelector("#scroll-section-5 .main-message.z"),
      a: document.querySelector("#scroll-section-5 .main-message.a"),
    },
    values: {
      z_color: [0, 255, { start: 0.35, end: 0.5 }, 255, 255, { start: 0.5, end: 0.5 }],
      z_opacity: [0, 1, { start: 0, end: 0.25 }, 1, 0, { start: 0.8, end: 0.87 }],
      z_transform: [50, 0, { start: 0, end: 0.25 }, 0, 0, { start: 0.8, end: 0.87 }],
      a_opacity: [0, 1, { start: 0.35, end: 0.5 }, 1, 0, { start: 0.8, end: 0.87 }],
      a_transform: [50, 0, { start: 0.35, end: 0.5 }, 0, 0, { start: 0.8, end: 0.87 }],
      a_fontSize: [7, 4.5, { start: 0.35, end: 0.5 }, 4.5, 4.5, { start: 0.8, end: 0.87 }],
      v_opacity: [0, 1, { start: 0.35, end: 0.5 }, 1, 0, { start: 0.8, end: 0.87 }],
      k_background: [255, 0, { start: 0.8, end: 0.95 }, 0, 0, { start: 0.95, end: 0.95 }],
    },
  },

  {
    // 6
    type: "sticky",
    heightNum: 3,
    scrollHeight: 0,
    objs: {
      container: document.querySelector("#scroll-section-6"),
      z: document.querySelector("#scroll-section-6 .card-message.z"),
      a: document.querySelector("#scroll-section-6 .main-message.a"),
      b: document.querySelector("#scroll-section-6 .main-message.b"),
    },
    values: {
      z_opacity: [0, 1, { start: 0, end: 0.05 }, 1, 0, { start: 0.9, end: 0.95 }],
      z_transform: [50, 0, { start: 0, end: 0.05 }, 0, 0, { start: 0.9, end: 0.95 }],
      a_opacity: [0, 1, { start: 0.1, end: 0.15 }, 1, 0, { start: 0.45, end: 0.5 }],
      a_transform: [50, 0, { start: 0.1, end: 0.15 }, 0, 0, { start: 0.45, end: 0.5 }],
      b_opacity: [0, 1, { start: 0.55, end: 0.6 }, 1, 0, { start: 0.9, end: 0.95 }],
      b_transform: [50, 0, { start: 0.55, end: 0.6 }, 0, 0, { start: 0.9, end: 0.95 }],
    },
  },

  {
    type: "sticky",
    heightNum: 5,
    scrollHeight: 0,
    objs: {
      v: document.querySelector(".s-7-video"),
      container: document.querySelector("#scroll-section-7"),
      a: document.querySelector("#scroll-section-7 .main-message.a"),
      b: document.querySelector("#scroll-section-7 .main-message.b"),
    },
    values: {
      a_opacity: [0, 1, { start: 0.1, end: 0.15 }, 1, 0, { start: 0.75, end: 0.85 }],
      a_transform: [50, 0, { start: 0.1, end: 0.15 }, 0, 0, { start: 0.75, end: 0.85 }],
      b_opacity: [0, 1, { start: 0.2, end: 0.25 }, 1, 0, { start: 0.75, end: 0.85 }],
      b_transform: [50, 0, { start: 0.2, end: 0.25 }, 0, 0, { start: 0.75, end: 0.85 }],
      v_opacity: [0, 1, { start: 0.15, end: 0.25 }, 1, 0, { start: 0.75, end: 0.85 }],
    },
  },
];
