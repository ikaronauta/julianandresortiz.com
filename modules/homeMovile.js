import { viewContent } from "./movile/viewContent.js";

// Constantes
const root = $("#root");

// Variables
let viewMain, omitirItro;
let showV1 = true;

// TimeOuts/Intervals
let vibrar, interContador, mostrarView1;

export function homeMovile() {
  viewMain = $("<div>", {
    id: "mainPhone",
    class: "view homePhone",
  });

  root.append(viewMain);

  timeOutsIntervals();
  initEventListeners();
}

function initEventListeners() {
  $(window).on("load", function () {
    setTimeout(() => {
      omitirItro = $("<div>", {
        id: "container-mensaje",
      });

      let p = $("<p>").text("Touch the screen to skip the Intro"); //Toque la pantalla para omitir el Intro.

      omitirItro.append(p);
      viewMain.append(omitirItro);

      contadorInicio();
    }, 1000);
  });

  viewMain.on("click", function () {
    showV1 = false;
    clearTimeout(mostrarView1);
    root.empty();
    viewContent("es");
  });
}

function animacionImagen(viewMain) {
  let imgHome = $("<img>", {
    src: "assets/images/main.jpg",
    id: "imgHome",
    alt: "Julian A. Ortiz",
  });

  imgHome.css("background-color", "#e0e0e0");

  imgHome.on("load", function () {
    if (!showV1) return;

    $(this).css("background-color", "transparent");
    $("#imgHome").addClass("mostrar");

    vibrar = setInterval(function () {
      $("#imgHome").addClass("vibrar");
      setTimeout(function () {
        $("#imgHome").removeClass("vibrar");
      }, 200);
    }, 1000);

    mostrarView1 = setTimeout(() => {
      clearInterval(vibrar);
      setTimeout(() => {
        $("#imgHome").addClass("ocultar");
        setTimeout(() => {
          viewMain.addClass("ocultar");
          setTimeout(() => {
            root.empty();
            viewContent("en");
          }, 1000);
        }, 1000);
      }, 1000);
    }, 4000);
  });

  imgHome.on("error", function () {
    $(this).hide();
    viewMain.append(`<p>${$(this).attr("alt")}</p>`).css("color", "white");
  });

  return imgHome;
}

function timeOutsIntervals() {
  setTimeout(() => {
    $("#imgHome").addClass("mostrar");
  }, 1000);
}

function contadorInicio() {
  let contador;

  contador = $("<div>", {
    id: "contador",
    text: 5,
  });

  viewMain.append(contador);

  setTimeout(() => {
    let count = 5;
    $("#contador, #container-mensaje").addClass("mostrar");
    interContador = setInterval(() => {
      count--;
      $("#contador").text(count);

      if (count == 1) $("#container-mensaje").toggleClass("mostrar ocultar");

      if (count == -1) {
        clearInterval(interContador);
        $("#contador").toggleClass("mostrar");
        viewMain.empty();
        let imgHome = animacionImagen(viewMain);
        viewMain.append(imgHome);
      }
    }, 1000);
  }, 100);
}
