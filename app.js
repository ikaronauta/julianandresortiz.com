import { homeMovile } from "./modules/homeMovile.js";

const esSmartphone = window.matchMedia("(max-width: 767px)").matches;

function inicio() {
  if (esSmartphone) homeMovile();
  else console.log("PC"); //homePC();
}

inicio();
