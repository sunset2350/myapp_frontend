  // 프로필
  (async () =>{
    
    // 버튼    
    const modal = document.getElementById("myModal");
    const openModal = document.getElementById("clickMyModal");
    const closeModal = document.getElementById("closeModal");
    const saveModal = document.getElementById("saveModal");

    // input 박스
    const modifyid = document.getElementById("modifyid");
    const modifyname = document.getElementById("modifyname");
    const modifybirth = document.getElementById("modifybirth");
    const modifyphone = document.getElementById("modifyphone");
    const modifypw = document.getElementById("modifypw");

    // 연동
    let url = `http://localhost:8080/profiles/userprofile`

    const response = await fetch(url,
      {
        headers: {
          Authorization: `Bearer ${getCookie(
            "token"
          )}`,
        },
      });
  
      if ([401, 403].includes(response.status)) {
        window.location.href = "http://127.0.0.1:5500/index.html";
  
      }

      const result = await response.json();
      console.log(result)
      modifyid.value = result.userId;
      modifyname.value = result.userName;
      modifybirth.value = result.userBirth;
      modifyphone.value = result.userPhone;
      modifypw.value = result.userPw
      

    openModal.addEventListener("click", (e) =>{
      e.preventDefault();
      modal.style.display = "block"
      
    })

    closeModal.addEventListener("click" , (e) =>{
      e.preventDefault();
      modal.style.display = "none"
    })

    saveModal.addEventListener("click" , async (e) =>{
      e.preventDefault();
      const response = await fetch (url,
      {
        method : "PUT",
        headers : {
          "content-type" : "application/json",
          Authorization : `Bearer ${getCookie(
            "token"
          )}`,
        },
        body : JSON.stringify({
          userName : modifyname.value,
          userPhone : modifyphone.value,
          userPW : modifypw.value
        })
      })
      console.log(modifyname)
      console.log(response)
      alert('수정 완료')
    })
  })();


  // 로그아웃
  
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

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}



(() => {
  const token = getCookie("token");
  
  if (!token) {
    window.location.href = "http://localhost:5500/myapp_frontend/index.html";
  }
  
})();

(() => {
    const clicklogout = document.getElementById('clicklogout');
    clicklogout.addEventListener("click" , (e) =>{
      e.preventDefault();
      deleteCookie("token")
      window.location.href = "http://localhost:5500/myapp_frontend/index.html";
    })
  })();