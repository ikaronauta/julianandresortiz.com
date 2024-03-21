import { dataViewsPC } from "../assets/data/datos.js";

// Constantes
const root = $("#root");

export function homePC() {
  
  root.append(navPC());
  root.append(contentView1PC().addClass("viewDisable"));
  root.append(contentView2PC());

  listenersPC();
}

function listenersPC() {
  $(document).ready(function () {
    $("#nav-pc").addClass("navActive");
    $("#view1PC").toggleClass("viewDisable viewEnable");
  });
}

function navPC(){
  let nav = $("<nav>", {
    id: "nav-pc",
    class: "nav-pc"
  });

  let img = $("<img>", {
    src: "assets/images/logoPC_naranja.png",
    alt: "Julian A. ortiz",
    class: "logo-pc"
  })

  let ul = $("<ul>");

  for (const view in dataViewsPC) {
    ul.append($("<li>", {
      text: dataViewsPC[view].title
    }));
  }

  nav.append(img);
  nav.append(ul);

  return nav;
}

function contentView1PC(){
  let view1 = createView("view1PC");

  let contInt = $("<div>", {
    class: "contInt"
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
    text: dataViewsPC.view1.title
  });

  contTexto.append(h2);

  dataViewsPC.view1.items.forEach(function(item) {
    contTexto.append($(item.etiqueta).text(item.texto));
  });

  contInt.append(img);
  contInt.append(contTexto);
  view1.append(contInt);

  return view1;
}

function contentView2PC(){
  let view2 = createView("view2PC");

  let h2 = $("<h2>", {
    text: dataViewsPC.view2.title
  });

  view2.append(h2);

  return view2;
}

function createView(idView){
  return $("<div>", {
    id: idView,
    class: "viewP",
  });
}