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

  let currentPage = 0;
  let isLastPage = false;
  const PAGE_SIZE = 10;
  let userPW = "";
  let currentQuery = "";
  const nextbutton = document.getElementById("nextbutton");
  const prevbutton = document.getElementById("prevbutton");
  
  function createContent() {
    window.location.href = "http://localhost:5500/myapp_frontend/diary/create.html";
  }
  function detailview() {
    window.location.href = "http://localhost:5500/myapp_frontend/diary/Detail.html";
  }

  (() => {
    const button = document.getElementById('insert');
  
    button.addEventListener("click", (e) => {
      e.preventDefault();
      createContent();
    })
  })();
  
  (() => {
    window.addEventListener(
      "DOMContentLoaded",
      () => {
        getPagedList(0);
      }
    );
  })();
  
  // 전체 페이지
  async function getPagedList(page) {
    let url = "";
    url = `http://localhost:8080/diarys/paging?page=${page}&size=${PAGE_SIZE}`;
    
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
    const result = await response.json();

    const dataTableBody = document.querySelector('#data-table tbody');
    dataTableBody.innerHTML = '';
    
    for (const [index, item] of result.content.entries()) {
      let detail = `http://localhost:8080/diarys/paging/no?no=${item.no}`
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.userId}</td>
        <td>
        <a href="${detail}" class="detail-link">
         ${item.title}</a></td>
        <td>${new Date(item.createTime).toLocaleString()}</td>
      `;
  
      row.querySelector('.detail-link').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = `detail.html?no=${item.ownerNo}`;
  
      });
  
      dataTableBody.appendChild(row);    
      currentPage = result.number;
      isLastPage = result.last;
      pagingActive();
    };
  
  }
  
  
  
  // 제목 검색
async function gettitleList(page,query) {

let url = `http://localhost:8080/diarys/paging/searchByTitle?page=${page}&size=${PAGE_SIZE}&title=${query}`;
console.log(url)
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
      const result = await response.json();

      console.log(result)
  
      const dataTableBody = document.querySelector('#data-table tbody');
      dataTableBody.innerHTML = '';
    
      for (const [index, item] of result.content.entries()) {
        let detail = `http://localhost:8080/diarys/paging/no?no=${item.no}`
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${item.userId}</td>
          <td>
          <a href="${detail}" class="detail-link">
           ${item.title}</a></td>
          <td>${new Date(item.createTime).toLocaleString()}</td>
        `;
        
        row.querySelector('.detail-link').addEventListener('click', (e) => {
          e.preventDefault();
          window.location.href = `detail.html?no=${item.ownerNo}`;
        });
    
        dataTableBody.appendChild(row);    
        currentPage = result.number;
        isLastPage = result.last;
        
        pagingActive();
        
      };
      
  }
  
  // 내용 검색
  async function getcontentList(page,query) {
    url = `http://localhost:8080/diarys/paging/searchByContent?page=${page}&size=${PAGE_SIZE}&content=${query}`;
    
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
      const result = await response.json();

      console.log(result)
  
      const dataTableBody = document.querySelector('#data-table tbody');
      dataTableBody.innerHTML = '';
    
      for (const [index, item] of result.content.entries()) {
        let detail = `http://localhost:8080/diarys/paging/no?no=${item.no}`
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${item.userId}</td>
          <td>
          <a href="${detail}" class="detail-link">
           ${item.title}</a></td>
          <td>${new Date(item.createTime).toLocaleString()}</td>
        `;
        
        row.querySelector('.detail-link').addEventListener('click', (e) => {
          e.preventDefault();
          window.location.href = `detail.html?no=${item.ownerNo}`;
        });
    
        dataTableBody.appendChild(row);    
        currentPage = result.number;
        isLastPage = result.last;
        
        pagingActive();
        
      };
  }
  
  // 페이징
  function pagingActive() {
  
    if(currentPage === 0){
      prevbutton.disabled = true;
    } else {
      prevbutton.disabled = false;
    }
  
    if(isLastPage){
      nextbutton.disabled = true;
    } else {
      nextbutton.disabled = false;
    }
  }
  
  (() => {
    nextbutton.addEventListener("click" , (e) => {
      e.preventDefault();
      getPagedList(currentPage + 1, currentQuery);
    });
  
    prevbutton.addEventListener("click", (e) => {
      e.preventDefault();
      getPagedList(currentPage -1, currentQuery)
    })
  
  
  })();
  
  (() => {
    const text = document.getElementById('text');
    const searchbutton = document.getElementById('searchbutton');
    const resetbutton = document.getElementById("resetbutton");
    const title = document.getElementById("title");
    const select = document.querySelector("select");
    const selectvalue = ""
  
    
    
    resetbutton.addEventListener("click", (e) => {
      e.preventDefault();
  
      
      text.value = null;
      currentQuery = "";
      getPagedList(currentPage - currentPage, currentQuery);
    })
  
    searchbutton.addEventListener("click" ,(e) => {
      e.preventDefault();
  
      const selectvalue = select.options[select.selectedIndex].value;
  
      if(selectvalue === "title"){
        currentQuery = text.value;
        gettitleList(0, currentQuery)
      }
      else if(selectvalue === "date"){
          currentQuery = text.value;
          getcontentList(0, currentQuery)
      }
  
      else {
        alert("선택하여 주세요")
      }
    })
  
  })();
  