import { dataViews } from "../../assets/data/datos.js";

export function createSideBarMovil(lenguaje) {
  let containerSideBar = $("<div>", {
    id: "containerSideBar",
    class: "container-sideBar sideBar-cerrado cerradoMenu",
  });

  let containerOpenCloseNavBar = $("<div>", {
    class: "container-openClose-navBar",
  });

  let hamburgerMenu = $("<div>", {
    id: "hamburgerMenu",
    class: "hamburger-menu",
  });

  for (let i = 0; i < 3; i++) {
    hamburgerMenu.append($("<div>", {
      class: "bar disablePrueba"
    }));
  }

  containerOpenCloseNavBar.append(hamburgerMenu);

  containerSideBar.append(containerOpenCloseNavBar);
  containerSideBar.append(gettItems(lenguaje));

  return containerSideBar;
}

function createCabecera(lenguaje){
  let cabecera = $("<div>", {
    class: "cabecera",
  });

  return cabecera;
}

function gettItems(lenguaje){
  let sideBar = $("<nav>", {
    class: "sideBarMobil",
  });

  let ul = $("<ul>", {
    class: "listaMovil",
  });

  let count = 0;
  for (const item in dataViews[lenguaje]) {
    ul.append($("<li>", {
      class: count == 0 ? "itemMovil itemEnable" : "itemMovil itemDisable",
    }).text(dataViews[lenguaje][item].title));
    count++;
  }
  count = 0;

  sideBar.append(createCabecera(lenguaje));
  sideBar.append(ul);
  sideBar.append(createFooterSideBarMovil(lenguaje));

  return sideBar;
}

function createFooterSideBarMovil(lenguaje){
  let footerSideBar = $("<div>", {
    class: "footerSideBarMovil",
  });

  return footerSideBar;
}
