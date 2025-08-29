import { dataViews } from "../../../assets/data/datos.js";
import { createForm, sendMessage } from "../../core/main.js";
import { createSideBarMovil } from "./sideBarMovile.js";

// Variables
let windowHeight = $(window).height();
let countSkill = 0;
let footerViewContactOpen = false;
let skillsOpen = false;
let leng;

//TimeOuts/Itervals
let mostrarSkill, ocultarSkills;

export function viewContent(lenguaje) {
  leng = lenguaje;
  $("#root").append(viewContainerMain(lenguaje));
  $("#root").append(viewContainerSkills(lenguaje));
  $("#root").append(viewContainerProjects(lenguaje));
  $("#root").append(viewContainerPlayZone(lenguaje));
  $("#root").append(viewContainerContact(lenguaje));
  $("#root").append(createSideBarMovil(lenguaje));
  $("#root").append(footerViewContact());

  setTimeout(() => {
    $(".viewN").addClass("mostrar");
  }, 400);

  listenersViewMain();
  validarItemActivo();
}

function viewContainerMain(lenguaje) {
  let view = createView("viewMain");

  let logo = $("<img>", {
    id: "logoFull",
    class: "logoFull",
    alt: "Julian A. Ortiz",
    src: "assets/images/logoFull_blanco.png",
  });

  view.append(logo);
  view.append(subTitle(dataViews[lenguaje].viewMain.title));
  view.append($("<hr>"));

  dataViews[lenguaje].viewMain.items.forEach(function (item) {
    view.append(
      $(item.etiqueta, {
        text: item.texto,
      })
    );
  });

  return view;
}

function viewContainerSkills(lenguaje) {
  let view = createView("viewSkills");

  view.append(subTitle(dataViews[lenguaje].viewSkills.title));
  view.append($("<hr>"));

  dataViews[lenguaje].viewSkills.items.forEach(function (skill) {
    if(!skill.active) return;

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
    view.append(container);
  });

  return view;
}

function viewContainerProjects(lenguaje) {
  let view = createView("viewProjects");
  

  return view;
}

function viewContainerPlayZone(lenguaje) {
  let view = createView("viewPlayZone");
  

  return view;
}

function viewContainerContact(lenguaje) {
  let view = createView("viewContact");

  view.append(subTitle(dataViews[lenguaje].viewContact.title));
  view.append($("<hr>"));
  view.append(createForm(lenguaje, "form-concact"));

  return view;
}

function listenersViewMain() {
  $(window).on("scroll", function () {
    let disparadorSkills = windowHeight * 0.35;
    let disparadorFooter = windowHeight * 0.35;
    let scrollTop = $(window).scrollTop();

    let viewSkillsTop = $("#viewSkills").offset().top;
    let viewContactTop = $("#viewContact").offset().top;
    let diferenciaViewSkillsTopScrollTopPixeles = viewSkillsTop - scrollTop;
    let diferenciaViewContactTopScrollTopPixeles = viewContactTop - scrollTop;

    if (diferenciaViewSkillsTopScrollTopPixeles < disparadorSkills && !skillsOpen) {
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

    if (diferenciaViewSkillsTopScrollTopPixeles > disparadorSkills && skillsOpen) {
      skillsOpen = false;
      countSkill = 0;
      clearInterval(mostrarSkill);

      $(".container-skill").each(function () {
        $(this).removeClass("enable");
        $(this).addClass("disable");
      });
    }

    if (
      diferenciaViewContactTopScrollTopPixeles < disparadorFooter &&
      !footerViewContactOpen
    ) {
      $("#footerViewContact").removeClass("disableFooterViewContact");
      $("#footerViewContact").addClass("enableFooterViewContact");
      footerViewContactOpen = true;
    }

    if (
      diferenciaViewContactTopScrollTopPixeles > disparadorFooter &&
      footerViewContactOpen
    ) {
      $("#footerViewContact").removeClass("enableFooterViewContact");
      $("#footerViewContact").addClass("disableFooterViewContact");
      footerViewContactOpen = false;
    }

    $(".viewN").each(function(){
      let target = $(this).offset().top;
      let id = $(this).attr("id");
      let pr = $("nav").find(`a[href="#${id}"]`)

      if (target <= scrollTop + window.innerHeight - 0.2 * window.innerHeight && target + $(this).outerHeight() > scrollTop + 0.2 * window.innerHeight) {

        ajustarEstilosNavBar(pr);
        validarItemActivo();
      }
    });

  });

  $("#form-concact").on("submit", function (e) {
    e.preventDefault();
    sendMessage(this);
  });

  $("#hamburgerMenu").on("click", function () {
    abrirCerrarMenu();
  });

  $(".enlaceLi").on("click", function () {
    var target = $(this).attr("href");

    if(target != '#viewProjects' && target != '#viewPlayZone')
      cerrarExtra();

    // if(target == '#viewProjects'){
    //   viewExtra(target);
    //   abrirCerrarMenu();
    //   return;
    // }

    // if(target == '#viewPlayZone'){
    //   window.open('https://pelota2d.julianandresortiz.com/', '_blank');
    //   abrirCerrarMenu();
    //   return;
    // }

    ajustarEstilosNavBar(this);

    validarItemActivo();

    $("html, body").animate({
      scrollTop: $(target).offset().top
    }, 800);

    abrirCerrarMenu();
  });

  $(".opcionLenguajeMovil").on("click", function(){
    $("#root").empty();
    viewContent($(this).attr("id"));
  });
}

function ajustarEstilosNavBar(view){
    if($(view).parent().attr("class").includes("itemEnable")) return;

    $(".hermanoSuperior").removeClass("hermanoSuperior");
    $(".hermanoInferior").removeClass("hermanoInferior");

    $(".itemEnable").toggleClass("itemEnable itemDisable");
    $(view).parent().toggleClass("itemEnable itemDisable");
}

function abrirCerrarMenu(){
  $("#containerSideBar").toggleClass("sideBar-cerrado sideBar-abierto");
    $("#containerSideBar").toggleClass("abiertoMenu cerradoMenu");
}

function validarItemActivo(){
  $(".itemMovil").each(function(index, item){
    if($(item).hasClass("itemEnable")){
      if($(item).prev().length > 0){
        $(item).prev().addClass("hermanoSuperior");

        if($(item).next().length > 0){
          $(item).next().addClass("hermanoInferior");
        }else {
          $(item).parent().next().addClass("hermanoInferior");
        }
      } else {
        $(item).parent().prev().addClass("hermanoSuperior");

        if($(item).next().length > 0){
          $(item).next().addClass("hermanoInferior");
        }
      }
    }
  });
}

function viewExtra(idView){
  let viewProjects = createView(idView.substr(1), "viewExtra");
  let close = $("<p>", {
    id: "closeExtra",
    class: "closeExtra",
    text: "X"
  });

  close.on("click", function(){
    close.addClass("closeBotonPress");
    cerrarExtra();
  });

  viewProjects.append(subTitle(dataViews[leng][idView.substr(1)].title));
  viewProjects.append($("<hr>"));
  viewProjects.append(close);

  $("#root").append(viewProjects);

  setTimeout(() => {
    viewProjects.addClass("extraAbierto");
    if(idView == "#viewProjects") tarjetasProjects();
  }, 100);
}

function createView(idView, className) {
  let cn = className ? className : "viewN";

  return $("<div>", {
    id: idView,
    class: cn,
  });
}

function subTitle(title) {
  return $("<h2>", {
    text: title,
  });
}

function footerViewContact() {
  let footer = $("<footer>", {
    id: "footerViewContact",
    class: "disableFooterViewContact",
  });

  dataViews.es.viewContact.items.forEach(function (item) {
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

function cerrarExtra(){
  if($(".viewExtra").length == 0) return;

  $($(".viewExtra")[0]).toggleClass("extraCerrado extraAbierto");

    setTimeout(() => {
      $($(".viewExtra")[0]).remove();
    }, 1500);
}

function tarjetasProjects(){

  let contenedorProyectos = $("<div>", {
    class: "container-projects",
  });

  dataViews[leng]["viewProjects"].items.forEach(function(proyecto){
    let div = $("<div>", {
      id: `item${proyecto.id}`,
      class: "container-project",
    });

    div.append($("<h3>", {
      class: "title-project",
      text: proyecto.title,
    }));

    contenedorProyectos.append(div);
  });

  $("#viewProjects").append(contenedorProyectos);

  $(".title-project").on("click", function(){
    $(this).parent().toggleClass("active-card-project");

    if(!$(this).parent().attr("class").includes("active-card-project")){
      setTimeout(() => {
        $(this).parent().children().each(function(a, b){
          if(a > 0) $(this).remove();
        });
      }, 1500);
      
      return;
    }

    let id = $(this).parent().attr("id").substr(4);
    let dataProject = dataViews[leng].viewProjects.items.find(function(proyecto){
      return proyecto.id == id;
    });

    let logo = $("<img>", {
      src: `assets/images/proyectos/${dataProject.srcLogo}`,
      class: "projetc-logo",
      alt: dataProject.srcLogo
    });

    let p = $("<p>", {
      class: "description-project",
      text: dataProject.descripcion
    });

    $(this).parent().append(logo);
    $(this).parent().append(p);

    // setTimeout(() => {
    //   $(this).parent().append(logo);
    //   $(this).parent().append(p);
    // }, 550);
  });
}