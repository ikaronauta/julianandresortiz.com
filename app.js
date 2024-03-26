import { homeMovile } from "./modules/homeMovile.js";
import { homePC } from "./modules/homePC.js";

const esSmartphone = window.matchMedia("(max-width: 900px)").matches;

function inicio() {
  emailjs.init(dataEmail.dataInit);

  if (esSmartphone) homeMovile();
  else homePC();
}

inicio();
