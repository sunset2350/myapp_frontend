function Home() {
  window.location.href = "http://127.0.0.1:5500/myapp_frontend/diary/main.html";
}

(() => {
  const back = document.getElementById("back-button"); 
  
  back.addEventListener("click",(e) => {
    e.preventDefault();
    
    Home();
  });
})();



(() => {
  const upload = document.getElementById("upload");
  upload.addEventListener("click", (e) => {
    e.preventDefault();
    alert("업로드 되었습니다.");
    Home();
  })


})();