import { skills, intro } from "../assets/data/datos.js";

// Constantes
const root = $("#root");

// Variables
let view2, view3;
let desCountSkill = 0;
let countSkill = 0;
let footerView3open = false;
let skillsOpen = false;


//TimeOuts/Itervals
let mostrarSkill, ocultarSkills;

export function viewContent() {
  listenersView1();
  $("#root").append(view1Container());
  $("#root").append(view2Container());
  $("#root").append(view3Container());
  $("#root").append(footerView3());

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
  view3 = $("<div>", {
    id: "view3",
    class: "viewN",
    text: "Vestibulum non urna sed enim laoreet dapibus. In mi neque, dignissim ac leo in, maximus feugiat est. Proin sit amet luctus ipsum, non eleifend libero. Fusce vitae ipsum vitae est ultricies consectetur nec sed mauris. Integer vel rutrum urna. Proin lacus libero, vulputate tincidunt euismod quis, congue lacinia metus. Aliquam dignissim facilisis ipsum, quis posuere tortor eleifend eu. Proin at condimentum nibh. Mauris laoreet metus dolor, et blandit nunc semper quis. Ut at ullamcorper ligula, et luctus nunc. In rutrum ante felis, et dictum sem placerat ut. Duis mollis lorem in orci sagittis condimentum. Proin vitae lacus feugiat, fermentum turpis sit amet, malesuada tellus. Vivamus hendrerit dui odio, non sagittis urna mattis id.",
  });

  return view3;
}

function footerView3(){
  let footer = $("<footer>", {
    id: "footerView3",
    class: "disableFooterView3",
  }).html("<p>® Julián A. Ortiz</p><p>2024</p>");

  return footer;
}

function listenersView1() {
  $(window).on("scroll", function () {
    let windowHeight = $(window).height();
    let disparadorSkills = windowHeight * 0.35;
    let disparadorFooterVie3 = windowHeight * 0.35;
    let scrollTop = $(window).scrollTop();

    let view2Top = $("#view2").offset().top;
    let view3Top = $("#view3").offset().top;
    let diferenciaView2TopScrollTopPixeles = view2Top - scrollTop;
    let diferenciaView3TopScrollTopPixeles = view3Top - scrollTop;

    //console.log(`disparadorFooterVie3: ${disparadorFooterVie3} - diferenciaView3TopScrollTopPixeles: ${diferenciaView3TopScrollTopPixeles}`);

    //console.log(relacionView3TopScrollTopEnPorcentaje);

    //console.log(`view3Top: ${view3Top} - scrollTop: ${scrollTop} - diferenciaView3TopScrollTopPixeles: ${diferenciaView3TopScrollTopPixeles}`);

    //console.log(`windowHeight: ${windowHeight} - relacionView3TopScrollTop: ${relacionView3TopScrollTop}`);

    if (diferenciaView2TopScrollTopPixeles < disparadorSkills && !skillsOpen) {
      skillsOpen = true;

      mostrarSkill = setInterval(() => {
        if(countSkill <= $('.container-skill').length){
          $($('.container-skill')[countSkill]).removeClass('disable');
          $($('.container-skill')[countSkill]).addClass('enable');
          countSkill++
        } else {
          countSkill = 0;
          clearInterval(mostrarSkill);
        }
      }, 500);
    }

    if (diferenciaView2TopScrollTopPixeles > disparadorSkills && skillsOpen) {
      skillsOpen = false;
      countSkill = 0;
      clearInterval(mostrarSkill);

      $('.container-skill').each(function(){
        $(this).removeClass('enable');
        $(this).addClass('disable');
      });
    }


    if(diferenciaView3TopScrollTopPixeles < disparadorFooterVie3 && !footerView3open){
      $("#footerView3").removeClass("disableFooterView3");
        $("#footerView3").addClass("enableFooterView3");
        footerView3open = true;
    }

    if(diferenciaView3TopScrollTopPixeles > disparadorFooterVie3 && footerView3open){
      $("#footerView3").removeClass("enableFooterView3");
      $("#footerView3").addClass("disableFooterView3"); 
      footerView3open = false;
    }
  });
}