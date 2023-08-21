// 전체 페이지
(async () =>{
  const currentURL = window.location.href;
  const cutpage = currentURL.split('=')[1];
  let url = `http://localhost:8080/diarys/paging/no?no=${cutpage}`;
  console.log(url)
  const response = await fetch(url);
  console.log(response)
  const result = await response.json()
  console.log(result)
  






  
  const row = document.createElement('tbody');
  const dataTable = document.querySelector("table");
  
  row.innerHTML = `
    <tr>
      <td>${result.userId}</td>
      <td style="text-align:right">${new Date(result.createTime).toLocaleString()}</td>
    </tr>
    <tr>
    <th style="text-align:center; font-size:2rem;" colspan="2">${result.title}</th>
    </tr>
  
    <tr>
    <td colspan="2" class="ellipsis" style = "height:40rem;">${result.content}</td>
    </tr>
  `;
  
  row.querySelectorAll('.ellipsis').forEach(cell => {
    cell.style.maxWidth = '200px';
    cell.style.overflow = 'hidden';
  });
  
  dataTable.appendChild(row);
})();

