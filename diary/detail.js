
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


// 전체 페이지
const currentURL = window.location.href;
console.log(currentURL);
const cutpage = currentURL.split('=')[1];
let url = `http://localhost:8080/diarys/paging/ownerNo?ownerNo=${cutpage}`;

function Home() {
  window.location.href = "http://localhost:5500/myapp_frontend/diary/main.html";
}

(async () =>{
  
  const response = await fetch(url,
    {
      headers: {
        Authorization: `Bearer ${getCookie(
          "token"
        )}`,
      },
    });

    if ([401, 403].includes(response.status)) {
      alert("인증처리가 되지 않았습니다.");
      window.location.href = "/index.html";

    }
  
  const row = document.createElement('tbody');
  const dataTable = document.querySelector("table");
  
  const result = await response.json();
  console.log(result)
  console.log(result.content)
  row.innerHTML = `
    <tr>
      <td>${result.ownerNo}</td>
      <td style="text-align:right;">${new Date(result.createTime).toLocaleString()}</br></br></td>
    </tr>
    <tr>
    <th style="text-align:center; font-size:2rem; " colspan="2">${result.title}</br></br></th>
    </tr>
    <tr>
    <td colspan="2" class="ellipsis" style = "height:40rem; border: 1px solid #444444;">
    <div style="overflow:auto; width:70rem; height:40rem; white-space: pre-wrap;">${result.content}</div>
    </td>
    </tr>
  `;
  
  row.querySelectorAll('.ellipsis').forEach(cell => {
    cell.style.maxWidth = '100px';
    cell.style.overflow = 'auto';
  });
  
  dataTable.appendChild(row);
})();


// 목록
(() =>{
  const listbutton = document.getElementById('list')
  listbutton.addEventListener("click",(e) =>{
    e.preventDefault();
    Home();
  })
})();


// 수정
// (() =>{
// const modifybutton = document.getElementById('modify')
// modifybutton.addEventListener("click", async (e) =>{
//   e.preventDefault();
//   window.location.href = `diary-modify.html?no=${cutpage}`
// })
// })();

(() => {
  const modal = document.getElementById("modal");
  const modifyButton = document.getElementById("modify");
  const closeModalButton = document.getElementById("closeModalButton");
  const confirmButton = document.getElementById("confirmButton");
  const idTxt = document.getElementById("idTxt");
  const contentTxt = document.getElementById("contentTxt")

  modifyButton.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });

  
  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  
  modal.querySelector(".modal-content").addEventListener("click", (e) => {
    e.stopPropagation();
  });

  confirmButton.addEventListener("click" , async (e) => {
    e.preventDefault();

    const modifiedTitle = idTxt.value;
    const modifiedContent = contentTxt.value;
    

    const response = await fetch (
      `http://localhost:8080/diarys/${cutpage}`,
      {
        method : "PUT",
        headers : {
          "content-type" : 
          "application/json",
          Authorization:`Bearer ${getCookie(
            "token"
          )}`,
        },
        body : JSON.stringify({
          title : modifiedTitle,
          content : modifiedContent
        })
      })
    alert('수정 완료')
    Home()
  })


})();




// 삭제
(() =>{
const deletebutton = document.getElementById('delete')
deletebutton.addEventListener("click", async (e) =>{
  
  
  e.preventDefault();
  await fetch(
    `http://localhost:8080/diarys/${cutpage}`,
    {
      method : "DELETE",
      headers: {
        "content-type":
          "application/json",
        Authorization: `Bearer ${getCookie(
          "token"
        )}`,
      },
    })
  alert("삭제되었습니다.")
  Home();
})

})();

