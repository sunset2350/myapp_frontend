// 전체 페이지
const currentURL = window.location.href;
const cutpage = currentURL.split('=')[1];

function Home() {
  window.location.href = "http://127.0.0.1:5500/myapp_frontend/diary/main.html";
}

(async () =>{
  
  let url = `http://localhost:8080/diarys/paging/no?no=${cutpage}`;
  const response = await fetch(url);
  const result = await response.json()
  
  
  const row = document.createElement('tbody');
  const dataTable = document.querySelector("table");
  
  row.innerHTML = `
    <tr>
      <td>${result.userId}</td>
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

  // 모달 열기
  modifyButton.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });

  // 모달 닫기
  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // 모달 내용 클릭 시 이벤트 중지 (모달을 클릭해도 닫히지 않도록)
  modal.querySelector(".modal-content").addEventListener("click", (e) => {
    e.stopPropagation();
  });
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
      headers : {
        "content-type" : "application/json"
      }
    }
  )
  alert("삭제되었습니다.")
  Home();
})

})();

