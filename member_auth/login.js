function Home() {
  window.location.href = "http://127.0.0.1:5500/myapp_frontend/diary/main.html";
}

function create(){
  window.location.href = "http://127.0.0.1:5500/myapp_frontend/member_auth/register.html";
}

function findByid(){
  window.location.href = "http://127.0.0.1:5500/myapp_frontend/member_auth/find-Id.html";
}

function findBypw(){
  window.location.href = "http://127.0.0.1:5500/myapp_frontend/member_auth/find-Pw.html";
}


// 로그인 버튼
(() =>{
  const login = document.getElementById("login");

  login.addEventListener("click",(e) =>{
    e.preventDefault();
    
    Home();

  })
  
})();

// 회원 가입 버튼
(() =>{
  const registerBtn = document.getElementById("register");
  const registerModal = document.getElementById("registerModal");
  const name = document.getElementById("name");
  const id = document.getElementById("id");
  const password = document.getElementById("password");
  const birth = document.getElementById("birth");
  const phone = document.getElementById("phone");
  const commit = document.getElementById("commit");

  registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    registerModal.style.display = "block";
  });

  commit.addEventListener("click", async(e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/profiles", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        userId: id.value,
        userPw: password.value,
        userName: name.value,
        userPhone: phone.value,
        userBirth: birth.value
      })
    });
    
    if([500].includes(response.status)){
      alert("아이디가 존재합니다.")
    } else if([400].includes(response.status)){
      alert("값 미입력");
    }
      else {
      alert("회원가입 완료");
      
    }
  });
})();

// 아이디 찾기 버튼
(() => {
  const findIdBtn = document.getElementById("findid");
  const findIdModal = document.getElementById("findIdModal");

  findIdBtn.addEventListener("click", (e) => {
    e.preventDefault();
    findIdModal.style.display = "block";
  });
})();

// 비밀번호 찾기 버튼
(() => {
  const findPwBtn = document.getElementById("findpw");
  const findPwModal = document.getElementById("findPwModal");

  findPwBtn.addEventListener("click", (e) => {
    e.preventDefault();
    findPwModal.style.display = "block";
  });
})();

// 종료
const closeButtons = document.querySelectorAll(".modal .close");
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    registerModal.style.display = "none";
    findIdModal.style.display = "none";
    findPwModal.style.display = "none";
  });
});
