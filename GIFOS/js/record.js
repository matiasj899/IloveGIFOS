const apikey = "B9300a57dibi1KrwNPmk2H7J6ocLUl2N";
const comenzarBtn=document.querySelector(".border-and-btn").children[1].children[0];
const pasoUno=document.querySelector(".paso-uno");
const pasoDos=document.querySelector(".paso-dos");
const pasoTres=document.querySelector(".paso-tres");
let cameraRecording=pasoTres.children[0];
let gifRecording=pasoTres.children[1];
const grabarBtn=document.querySelector("#grabar-btn")
const finalizarBtn=document.querySelector("#finalizar-btn")
const uploadBtn=document.querySelector("#upload-btn")

comenzarBtn.addEventListener("click",cameraAccess);

function cameraAccess(){
pasoUno.style.display="none";
pasoDos.style.display="block";
comenzarBtn.style.display="none"
    getStreamAndRecord();
}

function getStreamAndRecord () { 
    navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
       height: { max: 480 }
    }
 })
 .then(function(stream) {
     pasoDos.style.display="none"
     pasoTres.style.display="block"
     grabarBtn.style.display="block"
     cameraRecording.srcObject = stream;
     cameraRecording.play()
     let recorder = RecordRTC(stream, {
        type: 'gif',
  frameRate: 1,
  quality: 10,
  width: 360,
  hidden: 240,
    });
     grabarVideo(recorder);
 })}

 function grabarVideo(recorder){
     grabarBtn.addEventListener("click",()=>{
        recorder.startRecording();
        console.log("grabando...")
         grabarBtn.style.display="none";
         finalizarBtn.style.display="block";
     })
     finalizarGrabacion(recorder);
 }
 
 function finalizarGrabacion(recorder){
     finalizarBtn.addEventListener("click",()=>{
        recorder.stopRecording(function(){
            let blob = recorder.getBlob();
            gifRecording.src=URL.createObjectURL(blob);
            cameraRecording.style.display="none";
            gifRecording.style.display="block";
            finalizarBtn.style.display="none";
            uploadBtn.style.display="block";
            createGifFile(recorder);
            
        })
     })
     
 }

 function createGifFile(recorder){
    let form = new FormData();
    const gifFile=form.append('file', recorder.getBlob(), 'myGif.gif');
    console.log(gifFile);
    uploadGif(gifFile);
    
 }

 function uploadGif(gifFile){
    
     uploadBtn.addEventListener("click",()=>{
        const urlUpload=`https://upload.giphy.com/v1/gifs/${apikey}`;
        const required={
            
            file:`${gifFile}`
        }

        fetch (urlUpload,{
            method:"PUT",
            body: JSON.stringify(required),
            headers:{
                'Content-Type': 'application/json'}
        })
        .then((data)=>(data.json()))
        .catch(error => console.log('Error:', error))
        .then(response => console.log('Success:', response));
     })
    
 }