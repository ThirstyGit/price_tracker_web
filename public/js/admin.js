// Selecting necessary elements.
const sideAnchor = document.querySelectorAll(".sidebar-anchor");
const mainElement = document.querySelectorAll(".main-element");
const scrapBtn = document.querySelector("#scrap-btn");
const deleteProductForm = document.querySelector("#delete-product-form");

// Change admin page view with sidebar.
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

// Start a single scrap.
scrapBtn.addEventListener("click", (e) => {
  fetch("/api/scrap", {
    method: 'POST'
  })
  .catch(err => {
    console.error(err);
  })
});

// Search for deleting a product.


// Delete a product.

