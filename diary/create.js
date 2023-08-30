function Home() {
  window.location.href = "http://localhost:5500/myapp_frontend/diary/main.html";
}

(() => {
  const back = document.getElementById("back-button"); 
  
  back.addEventListener("click",(e) => {
    e.preventDefault();
    Home();
  });
})();

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(
          /([\.$?*|{}\(\)\[\]\\\/\+^])/g,
          "\\$1"
        ) +
        "=([^;]*)"
    )
  );
  return matches
    ? decodeURIComponent(matches[1])
    : undefined;
}


(() => {
  const token = getCookie("token");
  if (!token) {
    window.location.href = "http://localhost:5500/myapp_frontend/index.html";
  }
  
})();

(() => {
  const upload = document.getElementById("upload");
  const title = document.getElementById("title");
  // const password = document.getElementById("password");
  const content = document.getElementById("content");

  upload.addEventListener("click", async (e) => {
     e.preventDefault();


   
  const response = await fetch(
    "http://localhost:8080/diarys",
  {
    method : "POST",
    headers: {
      "content-type":
        "application/json",
      Authorization: `Bearer ${getCookie(
        "token"
      )}`,
    },
    body : JSON.stringify({
      title : title.value,
      content : content.value
    })
  })
  console.log(response)
  
  if([400].includes(response.status)){
    alert("값 미입력");
  }
  else {
    alert("등록 완료");
    // Home();
  }
  


});
})();
