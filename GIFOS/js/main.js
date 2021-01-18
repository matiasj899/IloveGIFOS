//MODO NOCTURNO-DIURNO
const cambiarModo = document.querySelector(".menu");
const agregarClase = document.querySelector("body");
const darkMode = localStorage.getItem("dark-mode");
document.addEventListener("DOMContentLoaded", cargarModo);

function cargarModo() {
  if (darkMode === "true") {
    agregarClase.classList.add("dark");
    cambiarModo.children[0].textContent = "MODO DIURNO";
  } else {
    agregarClase.classList.remove("dark");
  }
}

cambiarModo.children[0].addEventListener("click", modoNocturno);

function modoNocturno() {
  agregarClase.classList.toggle("dark");
  if (agregarClase.classList.contains("dark")) {
    cambiarModo.children[0].textContent = "MODO DIURNO";
    localStorage.setItem("dark-mode", "true");
  } else {
    cambiarModo.children[0].textContent = "MODO NOCTURNO";
    localStorage.setItem("dark-mode", "false");
  }
}

//ANGRANDAR GIF-SLIDER
const modal = document.querySelector(".modal-content");
const modalContainer = document.querySelector(".modal-container");
const gifsContainers = document.querySelectorAll(".img-color-container");
const expandirImg = document.querySelector(".img-width-height");
const gifsContainer = Array.from(gifsContainers);
const closeGif = document.querySelector(".close-gif-container");
const carrouselGifos = document.querySelector(".carrousel-gifos");

gifsContainer.forEach((iterar) => {
  iterar.addEventListener("click", (e) => {
    const iterarClon = iterar.cloneNode(true);
    if (e.target.classList.contains("trending-max")) {
      modal.appendChild(iterarClon);
      modalContainer.style.display = "block";
      iterarClon.children[0].classList.add("expand");
      iterarClon.children[1].classList.add("expand");
      iterarClon.children[1].children[0].classList.add("expand");
      iterarClon.children[1].children[0].children[1].classList.add("expand");
      iterarClon.children[1].children[0].children[2].classList.add("expand");
      iterarClon.children[1].children[1].classList.add("expand");
      iterarClon.children[1].children[1].children[0].classList.add("expand");
      iterarClon.children[1].children[1].children[1].classList.add("expand");
      modal.children[0].classList.add("expand");
      agregarClase.classList.add("expand");
    }
    //CERRAR GIF
    closeGif.addEventListener("click", () => {
      modalContainer.style.display = "none";
      closeGif.nextElementSibling.remove();
      agregarClase.classList.remove("expand");
    });
  });
});
//AGRANDAR GIF-BUSCADOR
const imgColorContainerBusquedaExpand = document.querySelectorAll(
  ".img-color-container-busqueda"
);
imgColorContainerBusquedaExpand.forEach((iterar) => {
  iterar.addEventListener("click", (e) => {
    const iterarClon = iterar.cloneNode(true);
    if (e.target.classList.contains("trending-max")) {
      modal.appendChild(iterarClon);
      modalContainer.style.display = "block";
      iterarClon.classList.add("expand");
      iterarClon.children[0].classList.add("expand");
      iterarClon.children[1].classList.add("expand");
      iterarClon.children[1].children[0].classList.add("expand");
      iterarClon.children[1].children[0].children[1].classList.add("expand");
      iterarClon.children[1].children[0].children[2].classList.add("expand");
      iterarClon.children[1].children[1].classList.add("expand");
      iterarClon.children[1].children[1].children[0].classList.add("expand");
      iterarClon.children[1].children[1].children[1].classList.add("expand");
      modal.children[0].classList.add("expand");
      agregarClase.classList.add("expand");
    }
    //CERRAR GIF
    closeGif.addEventListener("click", () => {
      modalContainer.style.display = "none";
      closeGif.nextElementSibling.remove();
      agregarClase.classList.remove("expand");
    });
  });
});

//VER MAS GIF
const sliderRight = document.querySelector(".slider-right");
const sliderLeft = document.querySelector(".slider-left");
const trendingImages = document.querySelector(".trending-images");
const containerCarrousel = document.querySelector(
  ".contenedor-carrousel-gifos"
);

sliderRight.addEventListener("click", () => {
  containerCarrousel.scrollLeft += containerCarrousel.offsetWidth;
});
sliderLeft.addEventListener("click", () => {
  containerCarrousel.scrollLeft -= containerCarrousel.offsetWidth;
});
//GIFS A FAVORITOS
const favsContainer = document.querySelector(".favs-gifs");

gifsContainer.forEach((i) => {
  i.addEventListener("click", (e) => {
    if (e.target.classList.contains("trending-fav")) {
      i.children[1].children[0].children[0].classList.toggle("active");
      if (i.children[1].children[0].children[0].classList.contains("active")) {
        favsContainer.appendChild(i);
      } else {
        favsContainer.nextElementSibling.remove(i);
      }
    }
  });
});

//if(sliderLeft.addEventListener("click",()=>{containerCarrousel.scrollLeft-=containerCarrousel.offsetWidth}));
/*
  if(agregarClase.classList.contains("dark")){
    localStorage.setItem("dark-mode","true")
  }else{
    localStorage.setItem("dark-mode","false")
  }
*/

/*
function modoNocturno() {
  const agregarClase = document.querySelector("body");
  if (agregarClase.classList.contains("dark")) {
    agregarClase.classList.remove("dark");
    cambiarModo.children[0].textContent = "MODO NOCTURNO";
    console.log("ELIMINO");
  } else {
    agregarClase.classList.add("dark");
    cambiarModo.children[0].textContent = "MODO DIURNO";
    console.log("agrego");
  }
}
*/

/*
    iterar.addEventListener("click",()=>{
        modal.appendChild(gif);
        modalContainer.style.display="block"
        console.log("hiciste click")
    })
    */
