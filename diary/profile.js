function Home() {
  window.location.href = "http://localhost:5500/myapp_frontend/diary/main.html";
}

// 로그 아웃 --> 로그인 페이지
(() => {
  const logout = document.getElementById("logout");

  logout.addEventListener("click",(e)=> {
    e.preventDefault();
    Home();
    
  });
})();

