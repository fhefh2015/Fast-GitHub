
init()

function init() {
  const infoURL = "https://proxy.91chi.fun/https://yidian.one/chrome/info.json";
  fetch(infoURL)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(e => console.log("Oops, error", e))
}



