import { dataViewsPC } from "../../assets/data/datos.js";

// Constantes
const root = $("#root");

export function viewContentPC() {
  root.addClass('scrollDisabled ');
  root.append(navPC());
  root.append(contentView1PC().addClass("viewDisable"));
  root.append(contentView2PC());

  setTimeout(() => {
    root.removeClass('scrollDisabled');
  }, 3000);

  listenersPC();
}

function listenersPC() {
  $(document).ready(function () {
    $("#nav-pc").addClass("navActive");
    $("#view1PC").toggleClass("viewDisable viewEnable");
  });

  $(window).on("scroll", function(){
    let disparadorSkills = windowHeight * 0.35;
    let scrollTop = $(window).scrollTop();

    let view2Top = $("#view2PC").offset().top;
    let diferenciaView2TopScrollTopPixeles = view2Top - scrollTop;

    if (diferenciaView2TopScrollTopPixeles < disparadorSkills && !skillsPCOpen) {
      skillsPCOpen = true;      

      mostrarSkillsPC = setInterval(() => {
        if(countSkillsPc <= $('.card-grid-pc').length){
          $($('.card-grid-pc')[countSkillsPc]).addClass('active-pc');
          countSkillsPc++
        } else {
          countSkillsPc = 0;
          clearInterval(mostrarSkillsPC);
        }
      }, 500);
    }

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

  dataViewsPC.view2.items.forEach(function(item){
    let position = count % 2 == 0 ? "left-pc" : "right-pc";

    count++;

    containerGrid.append(addCardGrid(item, position));
  });

  containerSection2.append(containerGrid);

  view2.append(containerSection2);

  return view2;
}

function contentView3PC() {
  let view2 = createView("view2PC");

  let h2 = $("<h2>", {
    text: dataViewsPC.view2.title,
  });

  let containerImg = $("<div>", {
    class: "containerImg",
  });

  let img = $("<img>", {
    class: "onConstruction",
    alt: "",
    src: "assets/images/onConstruction.png",
  });

  containerImg.append(img);

  // view2.append(h2);
  view2.append(containerImg);

  return view2;
}

function createView(idView) {
  return $("<div>", {
    id: idView,
    class: "viewP",
  });
}

function addCardGrid(dataCard, position){
  let card = $("<div>", {
    class: `card-grid-pc ${position}`
  });

  let left = $("<div>", {
    class: "left-card-grid-pc"
  });

  let img = $("<img>", {
    src: `assets/images/${dataCard.logo}`,
    class: "iconSkill-pc",
    alt: dataCard.title
  })

  let title = $("<h3>", {
    text: dataCard.title
  });

  let cotainerNivel = $("<div>", {
    class: "cotainerNivel-pc"
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
