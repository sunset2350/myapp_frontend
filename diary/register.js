function login() {
  window.location.href = "http://127.0.0.1:5500/myapp_frontend/index.html";
}

// 회원 가입 등록
(() =>{
  const commit = document.getElementById("commit");

  commit.addEventListener("click",(e) => {
    e.preventDefault();
      alert('등록 되었습니다.');
      login();
    
    
  });
})();