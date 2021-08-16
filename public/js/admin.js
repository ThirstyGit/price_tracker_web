const sideAnchor = document.querySelectorAll(".sidebar-anchor");
const mainElement = document.querySelectorAll(".main-element");
const scrapBtn = document.querySelector("#scrap-btn");
const stopBtn = document.querySelector("#stop-scrap-btn");

sideAnchor.forEach((anchor, index) => {
  anchor.addEventListener("click", (e) => {
    mainElement.forEach((element, elIndex) => {
      if(index == elIndex) {
        element.classList.remove('hidden');
      }
      else {
        element.classList.add('hidden');
      }
    })
  })
});

scrapBtn.addEventListener("click", (e) => {
  fetch("/api/scrap", {
    method: 'POST'
  })
  .catch(err => {
    console.error(err);
  })
});

stopBtn.addEventListener("click", (e) => {
  fetch("/api/stopscraping", {
    method: 'POST'
  })
  .catch(err => {
    console.error(err);
  })
});

