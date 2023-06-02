// const input = document.getElementById("input");
// const button = document.getElementById("button");
// const list = document.getElementById("list");
const googleMap = document.querySelector("#googleMap");

// var map;
// var jsonData;

// button.addEventListener("click", getInputData);

// // initialize googleMap
function initMap() {
  // center coordinate of Korea
  var centerofKorea = { lat: 35.95, lng: 128.24 };
  // set center of the map at centerofKorea.
  map = new google.maps.Map(googleMap, {
    zoom: 6,
    center: centerofKorea,
  });
}

const youtube1URL = "https://www.youtube.com/embed/cL_rQgCjkJ8";
const youtube2URL = "https://www.youtube.com/embed/FPWJW2v6jUA";
const youtube3URL = "https://www.youtube.com/embed/H-DpLysP3xo";
const youtube1 = document.querySelector("#youtube1");
const youtube2 = document.querySelector("#youtube2");
const youtube3 = document.querySelector("#youtube3");

function onClickYoutube(element, url) {
  element.innerHTML = `<iframe
src=${url}
title="YouTube video player"
width="320"
height="176"
frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowfullscreen
></iframe>`;
}

function onClickYoutube1() {
  onClickYoutube(youtube1, youtube1URL);
}

function onClickYoutube2() {
  onClickYoutube(youtube2, youtube2URL);
}

function onClickYoutube3() {
  onClickYoutube(youtube3, youtube3URL);
}

youtube1.addEventListener("click", onClickYoutube1);
youtube2.addEventListener("click", onClickYoutube2);
youtube3.addEventListener("click", onClickYoutube3);
