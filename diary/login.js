function Home() {
  window.location.href = "http://127.0.0.1:5500/myapp_frontend/diary/main.html";
}

function create(){
  window.location.href = "http://127.0.0.1:5500/myapp_frontend/diary/register.html";
}

function findByid(){
  window.location.href = "http://127.0.0.1:5500/myapp_frontend/diary/find-Id.html";
}

function findBypw(){
  window.location.href = "http://127.0.0.1:5500/myapp_frontend/diary/find-Pw.html";
}

// 로그인 버튼
(() =>{
  const login = document.getElementById("login");

  login.addEventListener("click",(e) =>{
    e.preventDefault();
    alert('안녕하세요');
    Home();

  })
  
})();

// 회원 가입 버튼
(() =>{
  const register = document.getElementById("register");

  register.addEventListener("click",(e) =>{
    e.preventDefault();
    create();
  })

})();

// 아이디 찾기 버튼
(() => {
  const findid = document.getElementById("findid");

  findid.addEventListener("click" , (e) => {
    e.preventDefault();
    findByid()
  })
})();

// 비밀번호 찾기 버튼
(() => {
  const findpw = document.getElementById("findpw");

  findpw.addEventListener("click" , (e) => {
    e.preventDefault();
    findBypw()
  })
})();