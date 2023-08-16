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
  const title = document.getElementById("title");
  const password = document.getElementById("password");
  const content = document.getElementById("content");

  upload.addEventListener("click", async (e) => {
     e.preventDefault();

   
  const response = await fetch(
    "http://localhost:8080/diarys",
  {
    method : "POST",
    headers : {
      "content-type" : "application/json"
    },
    body : JSON.stringify({
      title : title.value,
      userPw : password.value,
      content : content.value
    })
  })  
  console.log(response);
  const result = await response.json();
  console.log(result)
  alert("업로드 되었습니다.");
  Home();


});
})();
