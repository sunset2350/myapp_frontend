function login() {
  window.location.href = "http://127.0.0.1:5500/myapp_frontend/index.html";
}

// 회원 가입 등록
// (() =>{
//   const name = document.getElementById("name");
//   const id = document.getElementById("id");
//   const password = document.getElementById("password");
//   const birth = document.getElementById("birth");
//   const phone = document.getElementById("phone");
//   const commit = document.querySelector("button");

//   commit.addEventListener("click", async(e) => {
//     e.preventDefault();


//     const response = await fetch("http://localhost:8080/profiles",
//     {
//       method:"POST",
//       headers : {
//         "content-type" : "application/json"
//       },
//       body : JSON.stringify({
//         userId : id,
//         userPw : password,
//         userName : name,
//         userPhone : phone,
//         userBirth : birth
//       })
//     })
//     console.log(response);
//     const result = response.json();
//     console.log(result);
    
    

//     //login();
    
    
//   });
// })();

(() =>{
  const name = document.getElementById("name");
  const id = document.getElementById("id");
  const password = document.getElementById("password");
  const birth = document.getElementById("birth");
  const phone = document.getElementById("phone");
  const commit = document.getElementById("commit");

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
      window.location.href="/myapp_frontend/diary/register.html";
    } else if([400].includes(response.status)){
      alert("값 미입력");
      window.location.href="/myapp_frontend/diary/register.html";
    }
      else {
      alert("회원가입 완료")
      login();
    }
  });
})();





