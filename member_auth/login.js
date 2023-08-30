
// 정규 표현식
function patternpw(password) {
  let pattern = /^(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/;
  return pattern.test(password)
}
function patternid(id){
  let pattern = /^[a-zA-Z0-9]+$/;
  return pattern.test(id)
}

// 로그인 버튼

const params = new URLSearchParams(window.location.search);
const login = document.getElementById("login");

if (params.get("err")) {
  document.querySelector("#err").innerHTML =
    params.get("err");
  history.replaceState(
    null,
    null,
    "http://127.0.0.1:5500/myapp_frontend/index.html"
  );
}
  
    login.addEventListener("click", async (e) =>{
    e.preventDefault();
    if (!document.forms[0].querySelectorAll("input")[0].value){
      alert("사용자 ID 입력해주세요.")
      return;
    }
    if (!document.forms[0].querySelectorAll("input")[1].value){
      alert("패스워드 입력해주세요");
      return;
    }

    document.forms[0].submit();
  });

// 쿠키 값 가져오기 함수
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
  
  
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
(() => {
  const token = getCookie("token");
  console.log(token)
  if (token) {

    window.location.href = `http://localhost:5500/myapp_frontend/diary/main.html`;
  };
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


  const idInput = document.getElementById("id")
  const errid = document.getElementById("errid")
  const passwordInput = document.getElementById("password")
  const errorpw = document.getElementById("errorpw");


  registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    registerModal.style.display = "block";
  });

  // 패스워드 정규식 체크
  passwordInput.addEventListener("blur",function() {
    const password = passwordInput.value;
    const checkpattern = patternpw(password);

    if (!checkpattern){
      errorpw.textContent =
      "비밀번호는 영문 + 특수문자 8자리 이상이어야 합니다.";
    } else {
      errorpw.textContent = "";
    }
  });
  
  // 아이디 정규식 체크
  idInput.addEventListener("blur",function(){
    let id = idInput.value;
    let checkpattern = patternid(id);

    if(!checkpattern){
      errid.textContent =
      "ID는 영문 + 숫자만 가능합니다."
    } else {
      errid.textContent = "";
    }
  })

  commit.addEventListener("click", async(e) => {
    e.preventDefault();
    if(!name.value){
      alert("이름을 입력하세요")
    }
    else if(!id.value){
      alert("아이디를 입력하세요")
    }
    else if(!password.value){
      alert("패스워드를 입력하세요")
    }
    else if(!birth.value){
      alert("생년월일을 입력하세요")
    }
    else if(!phone.value){
      alert("번호를 입력하세요")
    }
    else if (!patternpw(passwordInput.value)){
      alert("비밀번호 정책 오류입니다.")
    }
    else if (!patternid(idInput.value)){
      alert("ID 정책 오류입니다.")
    }


    else {
    const response = await fetch("http://localhost:8080/auth/signup", {
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
    id.value = "";
    password.value = "";
    name.value = "";
    phone.value = "";
    birth.value = "";
    registerModal.style.display = "none";
    }
  }
  });
})();

// 아이디 찾기 버튼
(() => {
  const findIdBtn = document.getElementById("findid");
  const findIdModal = document.getElementById("findIdModal");
  const findcommit = document.getElementById("findcommit");
  const findidname = document.getElementById("findidname");
  const findidbirth = document.getElementById("findidbirth");
  
  findIdBtn.addEventListener("click", (e) => {
    e.preventDefault();
    findIdModal.style.display = "block";
  });

  findcommit.addEventListener("click", async(e) => {
    e.preventDefault();
    if(!findidname.value){
      alert("이름을 입력해주세요")
    }
    else if(!findidbirth.value){
      alert("생년월일을 입력해주세요")
    }
    else{
      let url = `http://localhost:8080/auth/find-Id?userName=${findidname.value}&userBirth=${findidbirth.value}`
      
      const response = await fetch(url)
      const result = await response.json();
      if(!result){
        alert("이름 또는 생년 월일을 확인하세요.")
      }
      alert(findidname.value + "님의 ID는 " + result.userId + "입니다.");
      findidname.value = "";
      findidbirth.value = "";
      
    }
    findIdModal.style.display = "none";
  })


})();

// 비밀번호 찾기 버튼
(() => {
  const findPwBtn = document.getElementById("findpw");
  const findPwModal = document.getElementById("findPwModal");
  const findpwcommit = document.getElementById("findpwcommit");
  const findpwname = document.getElementById("findpwname")
  const findpwid = document.getElementById("findpwid")
  const findpwphone = document.getElementById("findpwphone")
  const newpasswordModal = document.getElementById("newpasswordModal")
  const newpassword = document.getElementById("newpassword")
  const checkpassword = document.getElementById("checkpassword")
  const newpasswordBt = document.getElementById("newpasswordBt")

  const newpasswordInput = document.getElementById("newpassword")
  const newpwerr = document.getElementById("newpwerr")
  
  const checkpasswordInput = document.getElementById("checkpassword")
  const checknewpwerr = document.getElementById("checknewpwerr")


  newpasswordInput.addEventListener("blur" ,function (){
    const password = newpasswordInput.value;
    const chkpatternpw = patternpw(password);

    if(!chkpatternpw) {
      newpwerr.textContent=
      "비밀번호는 영문 + 특수문자 8자리 이상이어야 합니다";
    } else {
      newpwerr.textContent ="";
    }
  });

  checkpasswordInput.addEventListener("blur",function(){
    const oldpassword = newpasswordInput.value;
    const newpassword = checkpasswordInput.value;

    if(oldpassword !== newpassword) {
      checknewpwerr.textContent =
      "패스워드가 서로 일치하지 않습니다."
    } else {
      checknewpwerr.textContent ="";
    }
  })

  let url = ``;
  findPwBtn.addEventListener("click", (e) => {
    e.preventDefault();
    findPwModal.style.display = "block";
  });

  findpwcommit.addEventListener("click", async(e) =>{
    e.preventDefault();
    if(!findpwname.value){
      alert("이름을 입력해주세요")
    } else if (!findpwid.value){
      alert("아이디를 입력해주세요")
    } else if (!findpwphone.value){
      alert("전화번호를 입력해주세요")
    }
    
    else {
      findPwModal.style.display = "none";
      newpasswordModal.style.display = "block";
      url =`http://localhost:8080/auth/find-Pw?userName=${findpwname.value}&userId=${findpwid.value}&userPhone=${findpwphone.value}`;
      newpasswordBt.addEventListener("click", async(e) => {
        e.preventDefault();
        if(!newpassword.value){
          alert("새로운 비밀번호를 입력해주세요")
        } 
        else if(!checkpassword.value){
          alert("비밀번호 확인을 입력해주세요")
        } 
        else if (!patternpw(newpasswordInput.value)){
          alert("비밀번호 정책 오류입니다.")
        }
        else if(newpassword.value === checkpassword.value) {
          newpasswordModal.style.display="block";
          const response = await fetch (url, {
            method : "PUT",
            headers:{
              "content-type":"application/json"
            },
            body : JSON.stringify({
              userPw : newpassword.value
            })
          }
            )
            alert("비밀번호 변경이 완료되었습니다.")
            newpassword.value = "";
            checkpassword.value = "";
            newpasswordModal.style.display = "none";
      }
      else{
        alert("패스워드가 서로 일치하지않습니다.")
      }
      })
    }
})


})();

// 종료
const closeButtons = document.querySelectorAll(".modal .close");
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    registerModal.style.display = "none";
    findIdModal.style.display = "none";
    findPwModal.style.display = "none";
    newpasswordModal.style.display = "none";
  });
});