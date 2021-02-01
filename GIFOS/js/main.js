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
  //MOSTRAR FAVORITOS DEL LOCALSTORAGE
  mostrarFavoritos();
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
    closeGif.addEventListener("click", async () => {
      modalContainer.style.display = "none";

      if (!closeGif.nextElementSibling) {
        return;
      } else {
        closeGif.nextElementSibling.remove();
        agregarClase.classList.remove("expand");
      }
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
const favsNoContent = document.querySelector(".favs-no-content");
const verMasBtnContainer = document.querySelector(".ver-mas-btn-container");
const favsSection = document.querySelector(".favourites");
const gifsContainerBusqueda = document.querySelectorAll(
  ".img-color-container-busqueda"
);

let favsArray = [];
gifsContainer.forEach((i) => {
  i.addEventListener("click", (e) => {
    if (e.target.classList.contains("trending-fav")) {
      i.children[1].children[0].children[0].classList.toggle("active");
      if (i.children[1].children[0].children[0].classList.contains("active")) {
        //favsContainer.appendChild(i);
        const favsObject = {
          title: `${i.children[0].alt}`,
          url: `${i.children[0].src}`,
          id: `${i.children[0].id}`,
          user: `${i.children[1].children[1].children[0].textContent}`,
          state: `${i.children[1].children[0].children[0].classList}`,
        };
        favsArray.push(favsObject);
        localStorage.setItem("favoritos", JSON.stringify(favsArray));
      } else {
      }
    }
  });
});
gifsContainerBusqueda.forEach((i) => {
  i.addEventListener("click", (e) => {
    if (e.target.classList.contains("trending-fav")) {
      i.children[1].children[0].children[0].classList.toggle("active");
      if (i.children[1].children[0].children[0].classList.contains("active")) {
        //favsContainer.appendChild(i);
        const favsObject = {
          title: `${i.children[0].alt}`,
          url: `${i.children[0].src}`,
          id: `${i.children[0].id}`,
          user: `${i.children[1].children[1].children[0].textContent}`,
          state: `${i.children[1].children[0].children[0].classList}`,
        };
        favsArray.push(favsObject);
        localStorage.setItem("favoritos", JSON.stringify(favsArray));
      } else {
      }
    }
  });
});

//OBTENER GIFS DESDE LOCALSTORAGE Y MOSTRARLOS EN PANTALLA

async function mostrarFavoritos() {
  const localStorageFavs = localStorage.getItem("favoritos");
  favsArray = await JSON.parse(localStorageFavs);
  if (favsArray != "") {
    favsNoContent.style.display = "none";
  }
  favsArray.forEach((i) => {
    const divFavsItems = document.createElement("div");
    divFavsItems.classList.add("img-color-container");
    const imgFavsItems = document.createElement("img");
    imgFavsItems.classList.add("img-width-height");
    imgFavsItems.src = i.url;
    imgFavsItems.alt = i.title;
    imgFavsItems.id = i.id;
    const divImgContainer = document.createElement("div");
    divImgContainer.classList.add("img-container");
    const divImgIcons = document.createElement("div");
    divImgIcons.classList.add("img-icons");
    const svgElementFav = document.createElement("svg");
    const svgElementDown = document.createElement("svg");
    const svgElementMax = document.createElement("svg");
    svgElementFav.classList = i.state;
    svgElementDown.classList.add("trending-download");
    svgElementMax.classList.add("trending-max");
    const divTrendingText = document.createElement("div");
    divTrendingText.classList.add("trending-text-container");
    const divTrendingTextP = document.createElement("p");
    divTrendingTextP.textContent = i.user;
    const divTrendingTextH2 = document.createElement("h2");
    divTrendingTextH2.textContent = i.title;
    favsContainer.appendChild(divFavsItems);
    divFavsItems.appendChild(imgFavsItems);
    divFavsItems.appendChild(divImgContainer);
    divImgContainer.appendChild(divImgIcons);
    divImgIcons.appendChild(svgElementFav);
    divImgIcons.appendChild(svgElementDown);
    divImgIcons.appendChild(svgElementMax);
    divImgContainer.appendChild(divTrendingText);
    divTrendingText.appendChild(divTrendingTextP);
    divTrendingText.appendChild(divTrendingTextH2);
  });
}

favsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("trending-fav")) {
    e.target.classList.remove("active");
    const elementClickedId =
      e.target.parentNode.parentNode.parentNode.children[0].id;

    for (let i = 0; i < favsArray.length; i++) {
      if (favsArray[i].id == elementClickedId) {
        favsArray.splice(i, 1);
      }
      localStorage.setItem("favoritos", JSON.stringify(favsArray));
    }
    e.target.parentNode.parentNode.parentNode.remove();
    if (console.log(favsContainer.childNodes.length==0)) {
      favsNoContent.style.display="flex"
    }
  }
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
