function createContent() {
  window.location.href = "http://127.0.0.1:5500/myapp_frontend/diary/create.html";
}

async function fetchDataAndDisplay() {
    const response = await fetch('http://localhost:8080/diarys');
    const data = await response.json();
    console.log(data)
    const dataTableBody = document.querySelector('#data-table tbody');
    dataTableBody.innerHTML = '';

    data.forEach((item,index) => {
      
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.userId}</td>
        <td>${item.title}</td>
        <td>${new Date(item.createTime).toLocaleString()}</td>
      `;
      dataTableBody.appendChild(row);
    });
  }
fetchDataAndDisplay();

(() => {
  const button = document.getElementById('insert');

  button.addEventListener("click", (e) => {
    e.preventDefault();
    createContent();
  })
})();
