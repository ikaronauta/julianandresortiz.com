import { viewContentPC } from "./pc/viewContentPc.js";

// Constantes
const root = $("#root");

// Variables
let viewMain;

// TimeOuts/Intervals
let mainTimeout;

export function homePC() {
  cargarContenido();
  initEventListenersPC();
}

function cargarContenido() {
  viewMain = $("<div>", {
    id: "mainPC",
    class: "view homePC disableHomePC",
  });

  let imgMain = $("<img>", {
    src: "assets/images/jao_naranja.png",
    alt: "",
    class: "imgC1",
  });

  let card = $("<div>", {
    class: "card",
  });

  let divImg1 = $("<div>", {
    id: "img1",
    class: "frontAct",
  });

  let img1 = $("<img>", {
    src: "assets/images/julianAortiz_naranja.png",
    alt: "",
    class: "imgC2",
  });

  let divImg2 = $("<div>", {
    id: "img2",
    class: "backDes",
  });

  let img2 = $("<img>", {
    src: "assets/images/sd_naranja.png",
    alt: "",
    class: "imgC2",
  });

  divImg1.append(img1);
  divImg2.append(img2);

  card.append(divImg1);
  card.append(divImg2);

  viewMain.append(imgMain);
  viewMain.append(card);

  root.append(viewMain);
}

function initEventListenersPC() {
  $(window).on("load", function () {
    let count = 0;

    $("#mainPC").toggleClass("enableHomePC disableHomePC");

    setTimeout(() => {
      $("#img1").toggleClass("frontAct frontDes");
      $("#img2").toggleClass("backDes backAct");

      setTimeout(() => {
        $("#mainPC").toggleClass("enableHomePC disableHomePC");
        setTimeout(() => {
          root.empty();
          viewContentPC();
        }, 500);

      }, 1500);
    }, 1500);    

    return;

    setTimeout(() => {
      $("#mainPC").toggleClass("enableHomePC disableHomePC");

      mainTimeout = setInterval(() => {
        count++;
        $("#img1").toggleClass("frontAct frontDes");
        $("#img2").toggleClass("backDes backAct");

        if (count > 1) {
          clearInterval(mainTimeout);
          $("#mainPC").toggleClass("enableHomePC disableHomePC");
          setTimeout(() => {
            root.empty();
            viewContentPC();
          }, 1000);
        }
      }, 1000);
    }, 100);
  });
}
