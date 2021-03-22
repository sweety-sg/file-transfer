//port3000
const dropZone= document.querySelector(".drop-Zone");
const fileInput = document.querySelector("#fileInput");
const browseBtn = document.querySelector("#browseBtn");
const baseURL = "https://innshare.herokuapp.com";
const uploadURL = baseURL + "/api/files";
const text = document.querySelector(".title")
var defaulttext = text.innerHTML;
const bgProgress= document.querySelector(".bg-progress");
const progCont = document.querySelector(".progress-cont")
const fileURLtext = document.querySelector("#fileURL");
const copybtn = document.querySelector("#copybtn");
const alert= document.querySelector(".copyalert");
const maxfilesize = 100*1024*1024;

dropZone.addEventListener("dragover",(e)=>{
  e.preventDefault();
if(!dropZone.classList.contains("dragged")){
    dropZone.classList.add("dragged"); 
    console.log("drag started");
    
}
text.innerHTML= "Release the file here";
if(!text.classList.contains("dragged")){
  text.classList.add("dragged"); 

}

});
dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragged");
    text.innerHTML = defaulttext;
     console.log("drag ended");
  });

  dropZone.addEventListener("drop",(ev) => {
    
    text.innerHTML = defaulttext;
    ev.preventDefault(); 
  console.log("dropdone");
  dropZone.classList.remove("dragged");
  browseBtn.classList.add("dragged");
  const files= ev.dataTransfer.files;
  console.table(files);
  if(files.length !=0){
      fileInput.files = files;
      uploadFile();
  }
  });

  fileInput.addEventListener("change", () =>{
    uploadFile();
  });

  browseBtn.addEventListener("click", () => {
    fileInput.click();
  });

  copybtn.addEventListener("click",()=>{
    
    fileURLtext.select();
    document.execCommand("copy");
    showalert("Copied to clipboard");
  })

  const resetfileInput = ()=>{
    fileInput.value = "";
  }

  const uploadFile = ()=>{
   
    if(fileInput.files.length>1){
      resetfileInput();
      showalert("Upload only 1 file at a time");
      return;
    }
    files = fileInput.files[0];
    if (files.size>maxfilesize){
      showalert("Can't upload more than 100 mb");
    }
    progCont.style.display = "block";
    // const file= fileInput.files;
    // const formData= new formData(); 
    //  //api
    // formData.append("myfile",file[0]);
    
    const formData = new FormData();
    formData.append("myfile", files[0]);
    //api to transfer data from browser to server
    const xhr = new XMLHttpRequest();
    //for loading state
    xhr.onreadystatechange = function() {
        console.log(xhr.readyState)
       showlink(JSON.parse(xhr.response));
      //  The transfer is complete; all data is now in the response
        
        if (xhr.readyState == XMLHttpRequest.DONE) {
            
          }
    };
    xhr.upload.onprogress = updateprogress;
    xhr.upload.onerror = () =>{
      resetfileInput();
      showalert(`Error in upload: ${xhr.statusText}`);
    }
    xhr.open("POST" , uploadURL);
    //on which url we are sending
    xhr.send(formData);
};
const updateprogress= (e)=>{
console.log(e);
const percent = Math.round((e.loaded/e.total)*100);
console.log(percent);
bgProgress.style.width = '${percent}%'
// let percent = Math.round((100 * e.loaded) / e.total);
// bgProgress.style.width = `${percent}%`
// bgProgress.style.width= `${(xhr.readyState)*25}%`

}
//doubt 
const showlink = ({files: url}) => {
  console.log(url);
  progCont.style.display = "none";
  shareCont.style.display = "block";
  fileURLtext.value = url;

};
let alerttimer;
const showalert = (msg) => {
  alert.innerHTML = msg;
  alert.style.transform = "translate(-50%,20px)";
  clearTimeout(alerttimer);
   alerttimer = setTimeout(() =>{
    alert.style.transform = "translate(-50%,-68px)";
  },1300)
};


