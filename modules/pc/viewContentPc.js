import { dataViewsPC } from "../../assets/data/datos.js";
import { createForm } from "../../core/main.js";

// Constantes
const root = $("#root");

// Variables
let windowHeight = $(window).height();
let skillsPCOpen = false;
let QRview3open = false;
let snLeftOpen = false;
let countSkillsPc = 0;

//TimeOuts/Itervals
let mostrarSkillsPC;

export function viewContentPC() {
  root.addClass("scrollDisabled ");
  root.append(navPC());
  root.append(createSectionSocialNetworksPC("snPCleft ocultarLeft"));
  root.append(createSectionSocialNetworksPC("snPCrigth ocultarRigth"));
  root.append(contentView1PC().addClass("viewDisable"));
  root.append(contentView2PC());
  root.append(contentView3PC());

  setTimeout(() => {
    root.removeClass("scrollDisabled");
  }, 3000);

  listenersPC();
}

function listenersPC() {
  $(document).ready(function () {
    $("#nav-pc").addClass("navActive");
    $("#view1PC").toggleClass("viewDisable viewEnable");
    $('.snPCleft').toggleClass('mostrarLeft ocultarLeft');
    snLeftOpen = true;
  });

  $(window).on("scroll", function () {
    let disparadorSkills = windowHeight * 0.35;
    let disparadorQR = windowHeight * 0.35;
    let disparador1SNleft = windowHeight * 0.40;
    let disparador2SNleft = windowHeight * 0.99;
    let scrollTop = $(window).scrollTop();

    let view2Top = $("#view2PC").offset().top;
    let diferenciaView2TopScrollTopPixeles = view2Top - scrollTop;

    let view3Top = $("#view3PC").offset().top;
    let diferenciaView3TopScrollTopPixeles = view3Top - scrollTop;

    //console.log(`scrollTop: ${scrollTop} - view3Top: ${view3Top} - diferencia: ${diferenciaView3TopScrollTopPixeles}`);

    if (
      diferenciaView2TopScrollTopPixeles < disparadorSkills &&
      !skillsPCOpen
    ) {
      skillsPCOpen = true;

      mostrarSkillsPC = setInterval(() => {
        if (countSkillsPc <= $(".card-grid-pc").length) {
          $($(".card-grid-pc")[countSkillsPc]).addClass("active-pc");
          countSkillsPc++;
        } else {
          countSkillsPc = 0;
          clearInterval(mostrarSkillsPC);
        }
      }, 500);
    }

    if (
      diferenciaView3TopScrollTopPixeles < disparadorQR && !QRview3open
    ){
      setTimeout(() => {
        $('.imgQR').addClass('imgQRActive');
        QRview3open = true;
      }, 700);
    }

    
    let countOcultar = 0;
    let countMostrar = 0;
    if (diferenciaView2TopScrollTopPixeles <= disparador1SNleft 
    ) {
      countOcultar++;
      if (countOcultar < 2) {
        console.log("Ocultar");
        $('.snPCleft').removeClass('mostrarLeft');
        $('.snPCleft').addClass('ocultarLeft');

        $('.snPCrigth').removeClass('ocultarRigth');
        $('.snPCrigth').addClass('mostrarRigth');
      }
    } else {
      console.log(`disparador1SNleft: ${disparador1SNleft} \ndisparador2SNleft: ${disparador2SNleft} \ndiferenciaView2TopScrollTopPixeles: ${diferenciaView2TopScrollTopPixeles}`);
      countMostrar++;
      // if (countMostrar < 2) {
      //   console.log("Mostrat");
      //   $('.snPCleft').removeClass('ocultarLeft');
      //   $('.snPCleft').addClass('mostrarLeft');
      // }
    }

    // if(diferenciaView2TopScrollTopPixeles < disparadorSNleft && snLeftOpen){
    //   $('.snPCleft').removeClass('mostrarLeft');
    //   $('.snPCleft').addClass('ocultarLeft');
    //   snLeftOpen = false;
    // } else {
    //   $('.snPCleft').removeClass('ocultarLeft');
    //   $('.snPCleft').addClass('mostrarLeft');
    //   snLeftOpen = true;
    // }
  });
}

function navPC() {
  let nav = $("<nav>", {
    id: "nav-pc",
    class: "nav-pc",
  });

  let img = $("<img>", {
    src: "assets/images/logoPC_naranja.png",
    alt: "Julian A. ortiz",
    class: "logo-pc",
  });

  let ul = $("<ul>");

  for (const view in dataViewsPC) {
    ul.append(
      $("<li>", {
        text: dataViewsPC[view].title,
      })
    );
  }

  nav.append(img);
  nav.append(ul);

  return nav;
}

function contentView1PC() {
  let view1 = createView("view1PC");

  let containerSection1 = $("<div>", {
    class: "containerSection1",
  });

  let img = $("<img>", {
    id: "julian",
    class: "imgMain",
    alt: "Julian A. Ortiz",
    src: "assets/images/base.png",
  });

  let contTexto = $("<div>", {
    class: "contTexto",
  });

  let h2 = $("<h2>", {
    text: dataViewsPC.view1.title,
  });

  contTexto.append(h2);

  dataViewsPC.view1.items.forEach(function (item) {
    contTexto.append($(item.etiqueta).text(item.texto));
  });

  containerSection1.append(img);
  containerSection1.append(contTexto);
  view1.append(containerSection1);

  return view1;
}

function contentView2PC() {
  let count = 0;

  let view2 = createView("view2PC");

  let containerSection2 = $("<div>", {
    class: "containerSection2",
  });

  let containerSuperior = $("<div>", {
    class: "containerSuperior",
  });

  let containerLeft = $("<div>", {
    class: "containerLeft",
  });

  let h2 = $("<h2>", {
    text: dataViewsPC.view2.title,
  });

  let containerGrid = $("<div>", {
    class: "containerGrid",
  });

  containerLeft.append(h2);
  containerSuperior.append(containerLeft);
  containerSection2.append(containerSuperior);

  dataViewsPC.view2.items.forEach(function (item) {
    let position = count % 2 == 0 ? "left-pc" : "right-pc";

    count++;

    containerGrid.append(addCardGrid(item, position));
  });

  containerSection2.append(containerGrid);

  view2.append(containerSection2);

  return view2;
}

function contentView3PC() {
  let view3 = createView("view3PC");

  let containerSection3 = $("<div>", {
    class: "containerSection3",
  });

  let containerSuperior = $("<div>", {
    class: "containerSuperior",
  });

  let containerRigth = $("<div>", {
    class: "containerRigth",
  });

  let h2 = $("<h2>", {
    text: dataViewsPC.view3.title,
  });

  let containerInterior = $("<div>", {
    class: "containerInterior",
  });

  let containerQR = $("<div>", {
    class: "containerQR",
  });

  let img = $("<img>", {
    class: "imgQR",
    alt: "QR",
    src: "assets/images/qr.png",
  });

  let small = $("<div>", {
    class: "textQR",
    text: "* Puedes escanear el siguiente código QR y visualizar el contenido desde tu smarthphone.",
  });

  containerRigth.append(h2);
  containerSuperior.append(containerRigth);
  containerInterior.append(createForm("form-concact-pc"));
  containerQR.append(img);
  containerQR.append(small);
  containerInterior.append(containerQR);
  containerSection3.append(containerSuperior);
  containerSection3.append(containerInterior);

  view3.append(containerSection3);

  return view3;
}

function createView(idView) {
  return $("<div>", {
    id: idView,
    class: "viewP",
  });
}

function addCardGrid(dataCard, position) {
  let card = $("<div>", {
    class: `card-grid-pc ${position}`,
  });

  let left = $("<div>", {
    class: "left-card-grid-pc",
  });

  let img = $("<img>", {
    src: `assets/images/${dataCard.logo}`,
    class: "iconSkill-pc",
    alt: dataCard.title,
  });

  let title = $("<h3>", {
    text: dataCard.title,
  });

  let cotainerNivel = $("<div>", {
    class: "cotainerNivel-pc",
  });

  let nivel = $("<div>", {
    class: "nivel-pc",
  });

  nivel.css("width", dataCard.nivel);

  left.append(img);
  left.append(title);

  cotainerNivel.append(nivel);

  card.append(left);
  card.append(cotainerNivel);

  return card;
}

function createSectionSocialNetworksPC(clase){
  let containerSocialNetworksPC = $("<div>", {
    class: `containerSocialNetworks ${clase}`,
  });

  dataViewsPC.view3.items.forEach(function (item) {
    let a = $("<a>", {
      href: item.href,
    });

    if (item.title != "Email" && item.title != "Whatsapp") {
      a.attr("target", "_blank");
      a.attr("rel", "noopener noreferrer");
    }

    let img = $("<img>", {
      class: "red-social",
      src: `assets/images/${clase.includes("snPCrigth") ? item.logo.replace(".", "_naranja.") : item.logo}`,
    });

    a.append(img);
    containerSocialNetworksPC.append(a);
  });


  return containerSocialNetworksPC;
}
