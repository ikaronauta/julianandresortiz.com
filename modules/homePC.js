import { dataViewsPC } from "../assets/data/datos.js";

// Constantes
const root = $("#root");

export function homePC() {
  
  root.append(navPC());

  listenersPC();
}

function listenersPC() {
  $(document).ready(function () {
    $("#nav-pc").addClass("navActive");
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