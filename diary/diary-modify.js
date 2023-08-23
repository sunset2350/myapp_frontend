// 전체 페이지
const currentURL = window.location.href;
const cutpage = currentURL.split('=')[1];

function Home() {
  window.location.href = "http://127.0.0.1:5500/myapp_frontend/diary/main.html";
}
function goBack() {
  window.history.back();
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
    <td style="text-align:right;">
      ${new Date(result.createTime).toLocaleString()}
    </td>
    </br>
  </tr>
  <tr>
    <th style="text-align:center; font-size:2rem; border:1px;" colspan="2">
      <textarea
        style="width:100%; height:100%; border:none; resize:none; overflow:hidden; background-color: transparent;"
        id="titletext"
      >
        ${result.title}
      </textarea>
      </br>
    </th>
  </tr>
  <tr>
    <td colspan="2" class="ellipsis" style="height: 40rem; border: 1px solid #444444;">
      <div style="overflow: auto; width: 70rem; height: 40rem; white-space: pre-wrap;">
        <textarea
          style="width: 100%; height: 100%; border: none; resize: none; overflow: hidden; background-color: transparent;"
          id="contenttext"
        >
          ${result.content}
        </textarea>
      </div>
    </td>
  </tr>
`;
  dataTable.appendChild(row);
  (() =>{
    const modifybutton = document.getElementById('modify');
    const titleTextarea = document.getElementById('titletext');
    const contentTextarea = document.getElementById('contenttext');
  
    
    modifybutton.addEventListener("click", async (e) =>{
      e.preventDefault();
      const modifiedTitle = titleTextarea.value;
      const modifiedContent = contentTextarea.value;
      const response = await fetch (
        `http://localhost:8080/diarys/${cutpage}`,
        {
          method : "PUT",
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify({
            title: modifiedTitle,
            content: modifiedContent
          
        })
    })
      alert('수정 완료')
      Home()
    })
    })();
    
  
})();

(() =>{
  const listbutton = document.getElementById("list");

  listbutton.addEventListener("click", (e) => {
    e.preventDefault();
    Home();
  })
})();