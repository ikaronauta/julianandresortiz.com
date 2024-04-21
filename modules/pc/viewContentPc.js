
import { dataViewsPC } from "../../assets/data/datos.js";
import { createForm, sendMessage } from "../../core/main.js";

// Constantes
const root = $("#root");

// Variables
let windowHeight = $(window).height();
let skillsPCOpen = false;
let QRview3open = false;
let SocialNetWorkLeftOpen = false;
let SocialNetWorkRigthOpen = false
let countSkillsPc = 0;

//TimeOuts/Itervals
let mostrarSkillsPC;

export function viewContentPC(lenguaje) {
  root.addClass("scrollDisabled ");
  root.append(navPC(lenguaje));
  root.append(opcionesLenguaje());
  root.append(createSectionSocialNetworksPC(lenguaje, "snPCleft"));
  root.append(createSectionSocialNetworksPC(lenguaje, "snPCrigth ocultarRigth"));
  root.append(contentView1PC(lenguaje).addClass("viewDisable"));
  root.append(contentView2PC(lenguaje));
  root.append(contentView3PC(lenguaje));

  $('ul li:first-child').addClass('li-active');

  setTimeout(() => {
    root.removeClass("scrollDisabled");
  }, 3000);

  listenersPC();
}

function listenersPC() {
  $(document).ready(function () {
    $("#nav-pc").addClass("navActive");
    $("#view1PC").toggleClass("viewDisable viewEnable");

    $('.snPCleft').addClass('mostrarLeft');
    SocialNetWorkLeftOpen = true;
    SocialNetWorkRigthOpen = false;

    setTimeout(() => {
      $('.opcionesLenguaje').addClass('activeOpcioneslenguaje');
    }, 3000);
  });

  $(window).on("scroll", function () {
    let disparadorSkills = windowHeight * 0.35;
    let disparadorQR = windowHeight * 0.35;
    let disparador1 = windowHeight * 0.40;
    let disparador2 = - disparador1;
    let scrollTop = $(window).scrollTop();

    let view1Top = $("#view1PC").offset().top;
    let diferenciaView1TopScrollTopPixeles = view1Top - scrollTop;

    let view2Top = $("#view2PC").offset().top;
    let diferenciaView2TopScrollTopPixeles = view2Top - scrollTop;

    let view3Top = $("#view3PC").offset().top;
    let diferenciaView3TopScrollTopPixeles = view3Top - scrollTop;

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
    ) {
      setTimeout(() => {
        $('.imgQR').addClass('imgQRActive');
        QRview3open = true;
      }, 700);
    }

    if (diferenciaView1TopScrollTopPixeles > disparador2 && !SocialNetWorkRigthOpen) {
      $('.snPCleft').removeClass('ocultarLeft');
      $('.snPCleft').addClass('mostrarLeft');

      //console.log("Mostrar socialNetWork de la Izquierda");
      $('.snPCrigth').removeClass('mostrarRigth');
      $('.snPCrigth').addClass('ocultarRigth');

      SocialNetWorkRigthOpen = true;
      SocialNetWorkLeftOpen = false;
    }

    if (diferenciaView2TopScrollTopPixeles <= disparador1 && !SocialNetWorkLeftOpen) {
      $('.snPCleft').removeClass('mostrarLeft');
      $('.snPCleft').addClass('ocultarLeft');

      $('.snPCrigth').removeClass('ocultarRigth');
      $('.snPCrigth').addClass('mostrarRigth');

      SocialNetWorkLeftOpen = true;
      SocialNetWorkRigthOpen = false;
    }

    if (diferenciaView3TopScrollTopPixeles <= disparador1 && !SocialNetWorkRigthOpen) {
      //console.log("Ocultar socialNetWork Vista 2");
      $('.snPCleft').removeClass('ocultarLeft');
      $('.snPCleft').addClass('mostrarLeft');

      //console.log("Mostrar socialNetWork Vista 3");
      $('.snPCrigth').removeClass('mostrarRigth');
      $('.snPCrigth').addClass('ocultarRigth');

      SocialNetWorkRigthOpen = true;
      SocialNetWorkLeftOpen = false;
    }

    $('.viewP').each(function(){
      let target = $(this).offset().top;
      let id = $(this).attr('id');

      if (target <= scrollTop + window.innerHeight - 0.2 * window.innerHeight && target + $(this).outerHeight() > scrollTop + 0.2 * window.innerHeight) {
        $('nav ul li').removeClass('li-active');
        $(`nav ul li[id=li-${id}]`).addClass('li-active');
      }
    });
  });

  $("#es, #en").on("click", function(){
    var prueba = $(this).attr("id");

    QRview3open = false;
    skillsPCOpen = false;
    root.empty();
    viewContentPC(prueba);
    
    $("#contenedorLenguajes").children().each(function(i, item){
      $(item).toggleClass("activeLenguaje");
    });
  });

  $("#form-concact-pc").on("submit", function (e) {
    e.preventDefault();
    sendMessage(this);
  });

  $(".enlaceLi").on("click", function () {
    var target = $(this).attr('href');

    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 800);

  });
}

function navPC(lenguaje) {
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
  let countLi = 0;

  for (const view in dataViewsPC[lenguaje]) {
    countLi++;

    let li = $("<li>", {
      id: `li-view${countLi}PC`,
      class: "itemPC",
    });

    li.append($("<a>", {
      href: `#${view}PC`,
      class: "enlaceLi"
    }).text(dataViewsPC[lenguaje][view].title));
    
    ul.append(li);

    // ul.append(
    //   $("<li>", {
    //     id: `li-view${countLi}PC`,
    //     text: dataViewsPC[lenguaje][view].title,
    //   })
    // );
  }

  nav.append(img);
  nav.append(ul);

  return nav;
}

function opcionesLenguaje(){
  let opcionesLenguaje = $("<div>", {
    id: "contenedorLenguajes",
    class: "opcionesLenguaje",
  });

  let opcionEs = $("<p>", {
    id: "es",
    class: "opcionLenguaje activeLenguaje",
    text: "Es"
  });

  let opcionEn = $("<p>", {
    id: "en",
    class: "opcionLenguaje",
    text: "En"
  });

  opcionesLenguaje.append(opcionEs);
  opcionesLenguaje.append(opcionEn);

  return opcionesLenguaje;
}

function contentView1PC(lenguaje) {
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
    text: dataViewsPC[lenguaje].view1.title,
  });

  contTexto.append(h2);

  dataViewsPC[lenguaje].view1.items.forEach(function (item) {
    contTexto.append($(item.etiqueta).text(item.texto));
  });

  containerSection1.append(img);
  containerSection1.append(contTexto);
  view1.append(containerSection1);

  return view1;
}

function contentView2PC(lenguaje) {
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
    text: dataViewsPC[lenguaje].view2.title,
  });

  let containerGrid = $("<div>", {
    class: "containerGrid",
  });

  containerLeft.append(h2);
  containerSuperior.append(containerLeft);
  containerSection2.append(containerSuperior);

  dataViewsPC[lenguaje].view2.items.forEach(function (item) {
    let position = count % 2 == 0 ? "left-pc" : "right-pc";

    count++;

    containerGrid.append(addCardGrid(item, position));
  });

  containerSection2.append(containerGrid);

  view2.append(containerSection2);

  return view2;
}

function contentView3PC(lenguaje) {
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
    text: dataViewsPC[lenguaje].view3.title,
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
    text: dataViewsPC[lenguaje].view3.small,
  });

  containerRigth.append(h2);
  containerSuperior.append(containerRigth);
  containerInterior.append(createForm(lenguaje,"form-concact-pc"));
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

function createSectionSocialNetworksPC(lenguaje, clase) {
  let containerSocialNetworksPC = $("<div>", {
    class: `containerSocialNetworks ${clase}`,
  });

  dataViewsPC[lenguaje].view3.items.forEach(function (item) {
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
