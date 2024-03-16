import { skills, intro } from "../assets/data/datos.js";

// Constantes
const root = $("#root");

// Variables
let view2;
let countMostrar = 0;
let countSkill = 0;


//TimeOuts/Itervals
let mostrarSkill;

export function viewContent() {
  listenersView1();
  $("#root").append(view1Container());
  $("#root").append(view2Container());
  $("#root").append(view3Container());

  setTimeout(() => {
    $(".viewN").addClass("mostrar");
  }, 400);
}

function view1Container() {
  let view1 = $("<div>", {
    id: "view1",
    class: "viewN",
  });

  let logo = $("<img>", {
    id: "logoFull",
    class: "logoFull",
    alt: "Julian A. Ortiz",
    src: "assets/images/logoFull_blanco.png",
  });

  let subTitle = $("<h2>", {
    text: "Acerca de mí",
  });

  let hr = $("<hr>");

  let parrafo = $("<p>").html(intro[0].mensaje);

  view1.append(logo);
  view1.append(subTitle);
  view1.append(hr);
  view1.append(parrafo);

  return view1;
}

function view2Container() {
  view2 = $("<div>", {
    id: "view2",
    class: "viewN",
  });

  let h2 = $("<h2>", {
    text: "Skills"
  });

  let hr = $("<hr>");

  view2.append(h2);
  view2.append(hr);

  skills.forEach(function(skill){
    let container = $("<div>", {
      class: "container-skill disable"
    });

    let left = $("<div>", {
      class: "left"
    });

    let img = $("<img>", {
      src: `assets/images/${skill.logo}`,
      class: "iconSkill",
      alt: skill.title
    })

    let title = $("<h3>", {
      text: skill.title
    });

    let cotainerNivel = $("<div>", {
      class: "cotainerNivel"
    });

    let nivel = $("<div>", {
      class: "nivel",
    });

    nivel.css("width", skill.nivel);

    left.append(img);
    left.append(title);
    cotainerNivel.append(nivel);
    container.append(left);
    container.append(cotainerNivel);
    view2.append(container);
  });

  return view2;
}

function view3Container() {
  let view3 = $("<div>", {
    id: "view3",
    class: "viewN",
    text: "Vestibulum non urna sed enim laoreet dapibus. In mi neque, dignissim ac leo in, maximus feugiat est. Proin sit amet luctus ipsum, non eleifend libero. Fusce vitae ipsum vitae est ultricies consectetur nec sed mauris. Integer vel rutrum urna. Proin lacus libero, vulputate tincidunt euismod quis, congue lacinia metus. Aliquam dignissim facilisis ipsum, quis posuere tortor eleifend eu. Proin at condimentum nibh. Mauris laoreet metus dolor, et blandit nunc semper quis. Ut at ullamcorper ligula, et luctus nunc. In rutrum ante felis, et dictum sem placerat ut. Duis mollis lorem in orci sagittis condimentum. Proin vitae lacus feugiat, fermentum turpis sit amet, malesuada tellus. Vivamus hendrerit dui odio, non sagittis urna mattis id.",
  });

  return view3;
}

function listenersView1() {
  $(window).on("scroll", function () {
    let windowHeight = $(window).height();
    let disparador = windowHeight * 0.35;
    let scrollTop = $(window).scrollTop();

    if (scrollTop > disparador) {
      countMostrar++

      if (countMostrar < 2) {
        mostrarSkill = setInterval(() => {
          if(countSkill <= $('.container-skill').length){
            $($('.container-skill')[countSkill]).removeClass('disable');
            $($('.container-skill')[countSkill]).addClass('enable');
            countSkill++
          } else {
            clearInterval(mostrarSkill);
          }
        }, 500);
      }
    }
  });
}
