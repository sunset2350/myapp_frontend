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
    window.location.href = "http://localhost:5500/myapp_frontend/myapp_frontend/index.html";
  }
  
})();