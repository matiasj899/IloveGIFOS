document.addEventListener("DOMContentLoaded",mostrarMisGifos());
let misGifosArray=[

]
const apiKey = "KRtmX9CWsEGoTRAZgh6jx2eg9N7Zezg7";
const pasoUno = document.querySelector(".paso-uno");
const pasoDos = document.querySelector(".paso-dos");
const pasoTres = document.querySelector(".paso-tres");
const avisoDiv=document.querySelector(".copiado-portapapeles")
let cameraRecording = pasoTres.children[0];
let gifRecording = pasoTres.children[1];
const grabarBtn = document.querySelector("#grabar-btn");
const finalizarBtn = document.querySelector("#finalizar-btn");
const uploadBtn = document.querySelector("#upload-btn");
const pasoAPasoDiv=document.querySelector(".paso-a-paso-div")
const animationCamera=document.querySelector(".camara-luz");
const loaderSvg=document.createElement("svg");
const loaderP=document.createElement("p");


const comenzarBtn = document.querySelector(".border-and-btn").children[1]
  .children[0];
  
  
comenzarBtn.addEventListener("click", cameraAccess);

function cameraAccess() {
  pasoUno.style.display = "none";
  pasoAPasoDiv.children[0].style.background="#572EE5"
  pasoAPasoDiv.children[0].style.color="#FFFFFF"
  pasoDos.style.display = "block";
  comenzarBtn.style.display = "none";
  getStreamAndRecord();
}

function getStreamAndRecord() {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        height: { max: 480 },
      },
    })
    .then(function (stream) {
      pasoDos.style.display = "none";
      
      pasoTres.style.display = "block";
      grabarBtn.style.display = "block";
      cameraRecording.srcObject = stream;
      cameraRecording.play();
      let recorder = RecordRTC(stream, {
        type: "gif",
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
      });
      grabarVideo(recorder);
    });
}

function grabarVideo(recorder) {
  grabarBtn.addEventListener("click", () => {
    recorder.startRecording();
    console.log("grabando...");
    grabarBtn.style.display = "none";
    finalizarBtn.style.display = "block";
    animationCamera.style.animation="parpadeo 2s ease infinite"
  });
  finalizarGrabacion(recorder);
}

function finalizarGrabacion(recorder) {
  finalizarBtn.addEventListener("click", () => {
    recorder.stopRecording(function () {
      let blob = recorder.getBlob();
      gifRecording.src = URL.createObjectURL(blob);
      pasoAPasoDiv.children[0].style.background="unset"
  pasoAPasoDiv.children[0].style.color="#572EE5"
      pasoAPasoDiv.children[1].style.background="#572EE5"
  pasoAPasoDiv.children[1].style.color="#FFFFFF"
  animationCamera.style.animation="unset"
      cameraRecording.style.display = "none";
      gifRecording.style.display = "block";
      finalizarBtn.style.display = "none";
      uploadBtn.style.display = "block";
      createGifFile(recorder);
    });
  });
}

function createGifFile(recorder) {
  let form = new FormData();
  form.append("file", recorder.getBlob(), "myGif.gif");
  console.log(form.get("file"));

  //SUBIR GIF

  subirGif(form);
}

function subirGif(gif) {
  uploadBtn.addEventListener("click",()=>{
    fetch(
      `https://upload.giphy.com/v1/gifs?api_key=KRtmX9CWsEGoTRAZgh6jx2eg9N7Zezg7`,
      {
        method: "POST",
        body: gif,
      }
    )
      .then((data) => data.json())
      .catch((error) => console.log("Error:", error))
      .then((response) => respuestaGif(response));
  
      //ESTILOS AL SUBIR GIF
      uploadBtn.style.display="none"
      const uploadGifStyle=document.createElement("div");
      uploadGifStyle.classList.add("layout-container");
      pasoTres.appendChild(uploadGifStyle);
      uploadGifStyle.style.display="flex"
      gifRecording.style.position="absolute";
      uploadGifStyle.style.position="relative";
      //BOTONES DESCARGAR Y LINK
const  iconsContainer=document.createElement("div");
iconsContainer.style.display="none"
const downloadBtn=document.createElement("svg");
const linkBtn=document.createElement("svg");
iconsContainer.appendChild(downloadBtn);
iconsContainer.appendChild(linkBtn);
uploadGifStyle.appendChild(iconsContainer);
uploadGifStyle.children[0].classList.add("icons-container");
uploadGifStyle.children[0].children[0].classList.add("trending-download");
uploadGifStyle.children[0].children[1].classList.add("icon-link");
//SUBIENDO GIF Y LOADER

const loaderAndPContainer=document.createElement("div")
loaderAndPContainer.classList.add("loader-and-p-container")
     
      
      loaderSvg.classList.add("loader-svg")
      loaderP.textContent="Estamos subiendo tu GIFO"
      loaderAndPContainer.appendChild(loaderSvg);
      loaderAndPContainer.appendChild(loaderP)
      uploadGifStyle.appendChild(loaderAndPContainer);
      pasoAPasoDiv.children[1].style.background="unset"
  pasoAPasoDiv.children[1].style.color="#572EE5"
      pasoAPasoDiv.children[2].style.background="#572EE5"
  pasoAPasoDiv.children[2].style.color="#FFFFFF"
  

          function respuestaGif(response){
           const dataId=response.data.id;
          if(response.meta.msg!="OK"){
            loaderSvg.style.background="unset"
            loaderP.textContent="Algo ha salido mal, Vuelve a intentarlo"

          }
          else{
            loaderSvg.style.animation="unset"
            loaderSvg.style.background="url(/styles/check.svg) no-repeat"
            loaderP.textContent="GIFO subido con éxito"
            iconsContainer.style.display="flex"
            loaderAndPContainer.style.height="80%"
            traerGifId(dataId,downloadBtn,linkBtn)
            
            

          }
        }
      
  })
  function traerGifId(dataId,downloadBtn,linkBtn){
console.log(dataId)
const urlId=`https://api.giphy.com/v1/gifs/${dataId}?api_key=KRtmX9CWsEGoTRAZgh6jx2eg9N7Zezg7`;
fetch(urlId)
.then((resultados) => resultados.json())
    .then((respuesta) => descargarGifLink(respuesta,downloadBtn,linkBtn))
  }
;

function descargarGifLink(respuesta,downloadBtn,linkBtn){
  console.log(respuesta)
  const url=respuesta.data.images.original.url
  const gifName=respuesta.data.title
  

  downloadBtn.addEventListener("click",()=>{
    
    const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";
  xhr.onload = function () {
    let urlCreator = window.URL || window.webkitURL;
    let imageUrl = urlCreator.createObjectURL(this.response);
    let tag = document.createElement("a");
    tag.href = imageUrl;
    tag.download = gifName;
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
  };
  xhr.send();

      })

  linkBtn.addEventListener("click",()=>{
    const textArea=document.createElement("input")
    textArea.setAttribute("value",url)
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand("copy")
    document.body.removeChild(textArea)
    loaderSvg.style.background="unset"
      loaderP.textContent="GIFO copiado al portapapeles"
    
setTimeout(() => {
  loaderSvg.style.background="url(/styles/check.svg) no-repeat"
  loaderP.textContent="GIFO subido con éxito"
}, 2000);
    //AVISO TEXTO COPIADO

    

        console.log(url)
      })
    //GUARDAR MIS GIFOS EN LOCALSTORAGE
    misGifosLocalStorage(respuesta)
}



 



}


 

function misGifosLocalStorage(respuesta){
  misGifosObject={
    title:respuesta.data.title,
    url:respuesta.data.images.original.url,
    id:respuesta.data.id
  }
  misGifosArray.push(misGifosObject)
  localStorage.setItem("mis gifos", JSON.stringify(misGifosArray));
}

async function mostrarMisGifos(){

  const misGifosStorage=localStorage.getItem("mis gifos");
  misGifosArray= await JSON.parse(misGifosStorage)
  const misGifosNoContent=document.querySelector(".mis-gifos-no-contenido")
  const misGifosContenido=document.querySelector(".favs-gifs")
  if (misGifosArray != "") {
    misGifosNoContent.style.display = "none";
    misGifosContenido.style.display="flex"
  }
  misGifosArray.forEach((i) => {
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
    const svgElementRemove = document.createElement("svg");
    const svgElementDown = document.createElement("svg");
    const svgElementMax = document.createElement("svg");
    svgElementRemove.classList.add("remove-btn")
    svgElementDown.classList.add("trending-download");
    svgElementMax.classList.add("trending-max");
    const divTrendingText = document.createElement("div");
    divTrendingText.classList.add("trending-text-container");
    const divTrendingTextP = document.createElement("p");
    divTrendingTextP.textContent = i.user;
    const divTrendingTextH2 = document.createElement("h2");
    divTrendingTextH2.textContent = i.title;
    misGifosContenido.appendChild(divFavsItems);
    divFavsItems.appendChild(imgFavsItems);
    divFavsItems.appendChild(divImgContainer);
    divImgContainer.appendChild(divImgIcons);
    divImgIcons.appendChild(svgElementRemove);
    divImgIcons.appendChild(svgElementDown);
    divImgIcons.appendChild(svgElementMax);
    divImgContainer.appendChild(divTrendingText);
    divTrendingText.appendChild(divTrendingTextP);
    divTrendingText.appendChild(divTrendingTextH2);
  });

  misGifosContenido.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const elementClickedId =
        e.target.parentNode.parentNode.parentNode.children[0].id;

        for (let i = 0; i < misGifosArray.length; i++) {
          if (misGifosArray[i].id == elementClickedId) {
            misGifosArray.splice(i, 1);
          }
          localStorage.setItem("mis gifos", JSON.stringify(misGifosArray));
        }
        e.target.parentNode.parentNode.parentNode.remove();
        console.log(elementClickedId)}
  });
    
}