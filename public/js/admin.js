const sideAnchor = document.querySelectorAll(".sidebar-anchor");
const mainElement = document.querySelectorAll(".main-element");

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



