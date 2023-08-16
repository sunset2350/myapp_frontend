async function fetchDataAndDisplay() {
    const response = await fetch('http://localhost:8080/diarys');
    const data = await response.json();
    console.log(data)
    const dataTableBody = document.querySelector('#data-table tbody');
    dataTableBody.innerHTML = '';

    data.forEach((item) => {
      
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.no}</td>
        <td>${item.userId}</td>
        <td>${item.title}</td>
        <td>${new Date(item.createTime).toLocaleString()}</td>
      `;
      dataTableBody.appendChild(row);
    });
  }

fetchDataAndDisplay();

