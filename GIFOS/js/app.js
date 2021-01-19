const apikey = "B9300a57dibi1KrwNPmk2H7J6ocLUl2N";
const limit = 32;
const offset = 0;
const rating = "g";
const lang = "es";

//OBTENER GIFS TRENDING DESDE  GIPHY

function obtenerDatos() {
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=${limit}&rating=${rating}`;
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((gifs) => mostrarGifs(gifs.data));
}
obtenerDatos();

//OBTENER DATOS TRENDING

function datosTrending() {
  const urlTrending = `https://api.giphy.com/v1/trending/searches?api_key=${apikey}`;
  fetch(urlTrending)
    .then((data) => data.json())
    .then((dataTrending) => mostrarDatosTrending(dataTrending));
}
datosTrending();

//SELCCIONO LOS ELEMENTOS DEL DOM

const gifaCambiar = document.querySelectorAll(".img-width-height");
const tituloaCambiar = document.querySelectorAll(".trending-text-container h2");
const usernameaCambiar = document.querySelectorAll(
  ".trending-text-container p"
);

//CONVIERTO LAS NODELIST EN ARRAY

const gifaCambiarArray = Array.from(gifaCambiar);

const tituloaCambiarArray = Array.from(tituloaCambiar);

const usernameaCambiarArray = Array.from(usernameaCambiar);

//FOR LOOP PARA RECORRER EL ARRAY

for (let i = 0; i < gifaCambiarArray.length; i++) {}
for (let i = 0; i < tituloaCambiarArray.length; i++) {}
for (let i = 0; i < usernameaCambiarArray.length; i++) {}

function mostrarGifs(gifs) {
  for (let i = 0; i < gifs.length; i++) {
    //VARIABLES
    const gifUrl = gifs[i].images.downsized_medium.url;
    const gifTitle = gifs[i].title;
    const gifUserName = gifs[i].username;
    const gifId = gifs[i].id;
    //CAMBIO PROPIEDADES DE LOS OBJETOS
    gifaCambiarArray[i].src = gifUrl;
    gifaCambiarArray[i].id = gifId;
    gifaCambiarArray[i].alt = gifTitle;
    tituloaCambiarArray[i].textContent = gifTitle;
    usernameaCambiarArray[i].textContent = gifUserName;
  }
}

//MOSTRAR DATOS TRENDING

const textSearchSection = document.querySelector(".search-section");
const searchSectionH2=document.querySelector(".search-section h2");
const changeTextContent = textSearchSection.children[4];
console.log(changeTextContent);
const resultsTittle = document.querySelector(
  ".search-section .resultados-container h3"
);

function mostrarDatosTrending(dataTrending) {
  const arrayDataTrending = dataTrending.data;
  changeTextContent.textContent = arrayDataTrending.splice(15);
}

//BUSCADOR

//VARIABLES
const search = document.querySelector("#search");

const autoCompletateResults = document.querySelectorAll(
  ".autocomplete-items-container .autocomplete-items p"
);
const autoCompleteContainer = document.querySelector(
  ".autocomplete-items-container"
);
const clearResults = document.querySelector(".close-searcher");

const resultadosContainer = document.querySelector(".resultados-container");
const resultadosBusqueda = document.querySelector(".resultados-busqueda");
const sinResultadosContainer = document.querySelector(
  ".sin-resultados-container"
);

//BUSCADOR LISTENER
search.addEventListener("input", (e) => {
  const busqueda = e.target.value;
  let busquedaFinal=[]
  for(let i=0;i<busqueda.length;i++){
    busquedaFinal.push(busqueda);
    console.log(busquedaFinal)
  }
  
  
  if (busqueda === "") {
    autoCompleteContainer.style.display = "none";
    resultadosContainer.style.display = "none";
    resultadosBusqueda.style.display = "none";
    searchSectionH2.style.display="flex";
    searchSectionH2.nextElementSibling.style.display="flex";
    limpiarBusqueda();
  } else {
    autoCompleteContainer.style.display = "block";
    dataSearchAutoComplete(busqueda);
  }

  resultsTittle.textContent = busqueda;

  //BUSCADOR GIFOS-API

  search.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      dataSearch(busquedaFinal);
      resultadosContainer.style.display = "flex";
      resultadosBusqueda.style.display = "flex";
      sinResultadosContainer.style.display = "none";
      searchSectionH2.style.display="none";
      searchSectionH2.nextElementSibling.style.display="none";
      autoCompleteContainer.style.display="none";
      
    }
  });
});



function dataSearchAutoComplete(busqueda) {
  const urlAutoCompletate = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apikey}&q=${busqueda}&limit=4&rating=${rating}`;
  fetch(urlAutoCompletate)
    .then((resultados) => resultados.json())
    .then((respuesta) => autoCompletado(respuesta.data));
     
}

//MOSTRAR RESULTADOS AUTOCOMPLETADO-API
for (let i = 0; i < autoCompletateResults.length; i++) {
}

function autoCompletado(respuesta) {
  for (let i = 0; i < respuesta.length; i++) {
    const opciones = respuesta[i].name;
    autoCompletateResults[i].textContent = opciones;
  }
}
//BUSQUEDA POR AUTOCOMPLETADO
const autoCompleteItems=document.querySelectorAll(".autocomplete-items");
for(let i=0;i<autoCompleteItems.length;i++){
  autoCompleteItems[i].addEventListener("click",()=>{
dataSearch(autoCompleteItems[i].children[1].textContent)
search.value=autoCompleteItems[i].children[1].textContent;
resultsTittle.textContent = autoCompleteItems[i].children[1].textContent;
autoCompleteContainer.style.display="none";
  })
}

function dataSearch(busqueda) {
  const urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${busqueda}&limit=48&rating=${rating}&lang=en`;
  fetch(urlSearch)
    .then((resultados) => resultados.json())
    .then((respuesta) => mostrarGifsBusqueda(respuesta.data));
    
}
//VARIABLES PARA MOSTRAR BUSQUEDA

const imgColorContainerBusqueda = document.querySelectorAll(
  ".img-color-container-busqueda"
);
const imgWidthHeightBusqueda = document.querySelectorAll(
  ".img-width-height-busqueda"
);
for (let i = 0; i < imgColorContainerBusqueda.length; i++) {}
if (imgColorContainerBusqueda.length === 12) {
  console.log("ver mas");
}
function mostrarGifsBusqueda(respuesta) {
  for (let i = 0; i < respuesta.length; i++) {
    imgColorContainerBusqueda[i].children[0].src =respuesta[i].images.downsized_medium.url;
    imgColorContainerBusqueda[i].children[0].alt = respuesta[i].title;
    imgColorContainerBusqueda[i].children[0].id = respuesta[i].id;
    imgColorContainerBusqueda[
      i
    ].children[1].children[1].children[1].textContent = respuesta[i].title;
    imgColorContainerBusqueda[
      i
    ].children[1].children[1].children[0].textContent = respuesta[i].username;
  }
  console.log(respuesta);
  if (respuesta.length === 0) {
    resultadosContainer.style.display = "flex";
    sinResultadosContainer.style.display = "flex";
    resultadosBusqueda.style.display = "none";
  } else {
    resultadosBusqueda.style.display = "flex";
    resultadosContainer.style.display = "flex";
    sinResultadosContainer.style.display = "none";
  }
  searchSectionH2.style.display="none";
searchSectionH2.nextElementSibling.style.display="none";
}

    /*window.addEventListener("scroll",(e)=>{
    console.log(e)})*/
  

    

//VER MAS GIF-VARIABLES


const verMas24 = document.querySelector(".ver-mas-24");
const verMas36 = document.querySelector(".ver-mas-36");
const verMas48 = document.querySelector(".ver-mas-48");
const verMasBtn1 = document.querySelector(".ver-mas-btn-container-1");
const verMasBtn2 = document.querySelector(".ver-mas-btn-container-2");
const verMasBtn3 = document.querySelector(".ver-mas-btn-container-3");

verMasBtn1.addEventListener("click", () => {
  verMas24.style.display = "flex";
  verMasBtn1.style.display = "none";
});
verMasBtn2.addEventListener("click", () => {
  verMas36.style.display = "flex";
  verMasBtn2.style.display = "none";
});
verMasBtn3.addEventListener("click", () => {
  verMas48.style.display = "flex";
  verMasBtn3.style.display = "none";
});

function limpiarBusqueda() {
  verMas24.style.display = "none";
  verMasBtn1.style.display = "block";
  verMas36.style.display = "none";
  verMasBtn2.style.display = "block";
  verMas48.style.display = "none";
  verMasBtn3.style.display = "block";
}
