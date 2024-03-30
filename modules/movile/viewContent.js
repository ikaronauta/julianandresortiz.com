import { dataViews } from "../../../assets/data/datos.js";
// import { createLouder, destroyLouder, alert1 } from "../../../core/main.js";
import { createForm, sendMessage } from "../../core/main.js";

// Variables
let windowHeight = $(window).height();
let countSkill = 0;
let footerView3open = false;
let skillsOpen = false;

//TimeOuts/Itervals
let mostrarSkill, ocultarSkills;

export function viewContent() {
  $("#root").append(view1Container());
  $("#root").append(view2Container());
  $("#root").append(view3Container());
  $("#root").append(footerView3());

  listenersView1();

  setTimeout(() => {
    $(".viewN").addClass("mostrar");
  }, 400);
}

function view1Container() {
  let view1 = createView("view1");

  let logo = $("<img>", {
    id: "logoFull",
    class: "logoFull",
    alt: "Julian A. Ortiz",
    src: "assets/images/logoFull_blanco.png",
  });

  view1.append(logo);
  view1.append(subTitle(dataViews.view1.title));
  view1.append($("<hr>"));

  dataViews.view1.items.forEach(function (item) {
    view1.append(
      $(item.etiqueta, {
        text: item.texto,
      })
    );
  });

  return view1;
}

function view2Container() {
  let view2 = createView("view2");

  view2.append(subTitle(dataViews.view2.title));
  view2.append($("<hr>"));

  dataViews.view2.items.forEach(function (skill) {
    let container = $("<div>", {
      class: "container-skill disable",
    });

    let left = $("<div>", {
      class: "left",
    });

    let img = $("<img>", {
      src: `assets/images/${skill.logo}`,
      class: "iconSkill",
      alt: skill.title,
    });

    let title = $("<h3>", {
      text: skill.title,
    });

    let cotainerNivel = $("<div>", {
      class: "cotainerNivel",
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
  let view3 = createView("view3");

  view3.append(subTitle(dataViews.view3.title));
  view3.append($("<hr>"));
  view3.append(createForm("form-concact"));

  return view3;
}

function listenersView1() {
  $(window).on("scroll", function () {
    let disparadorSkills = windowHeight * 0.35;
    let disparadorFooterVie3 = windowHeight * 0.35;
    let scrollTop = $(window).scrollTop();

    let view2Top = $("#view2").offset().top;
    let view3Top = $("#view3").offset().top;
    let diferenciaView2TopScrollTopPixeles = view2Top - scrollTop;
    let diferenciaView3TopScrollTopPixeles = view3Top - scrollTop;

    if (diferenciaView2TopScrollTopPixeles < disparadorSkills && !skillsOpen) {
      skillsOpen = true;

      mostrarSkill = setInterval(() => {
        if (countSkill <= $(".container-skill").length) {
          $($(".container-skill")[countSkill]).removeClass("disable");
          $($(".container-skill")[countSkill]).addClass("enable");
          countSkill++;
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

      $(".container-skill").each(function () {
        $(this).removeClass("enable");
        $(this).addClass("disable");
      });
    }

    if (
      diferenciaView3TopScrollTopPixeles < disparadorFooterVie3 &&
      !footerView3open
    ) {
      $("#footerView3").removeClass("disableFooterView3");
      $("#footerView3").addClass("enableFooterView3");
      footerView3open = true;
    }

    if (
      diferenciaView3TopScrollTopPixeles > disparadorFooterVie3 &&
      footerView3open
    ) {
      $("#footerView3").removeClass("enableFooterView3");
      $("#footerView3").addClass("disableFooterView3");
      footerView3open = false;
    }
  });

  $("#form-concact").on("submit", function (e) {
    e.preventDefault();
    sendMessage(this);
  });
}

function createView(idView) {
  return $("<div>", {
    id: idView,
    class: "viewN",
  });
}

function subTitle(title) {
  return $("<h2>", {
    text: title,
  });
}

function footerView3() {
  let footer = $("<footer>", {
    id: "footerView3",
    class: "disableFooterView3",
  });

  dataViews.view3.items.forEach(function (item) {
    let a = $("<a>", {
      href: item.href,
    });

    if (item.title != "Email" && item.title != "Whatsapp") {
      a.attr("target", "_blank");
      a.attr("rel", "noopener noreferrer");
    }

    let img = $("<img>", {
      class: "red-social",
      src: `assets/images/${item.logo}`,
    });

    a.append(img);
    footer.append(a);
  });

  return footer;
}
