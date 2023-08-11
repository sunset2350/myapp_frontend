function Home() {
  window.location.href = "http://127.0.0.1:5500/myapp_frontend/diary/index.html";
}

(() =>{
  const button = document.querySelector("button")

  button.addEventListener("click",(e) =>{
    e.preventDefault();
    alert('회원가입이 완료 되었습니다.');
    Home();
  });

})();