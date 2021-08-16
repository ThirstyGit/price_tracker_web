// Selecting necessary elements.
const sideAnchor = document.querySelectorAll(".sidebar-anchor");
const mainElement = document.querySelectorAll(".main-element");
const scrapBtn = document.querySelector("#scrap-btn");
const deleteProductForm = document.querySelector("#delete-product-form");
const deleteProductInput = document.querySelector("#delete-product-input");
const formOutputContainer = document.querySelector("#form-output-container");
const stopBtn = document.querySelector("#stop-scrap-btn");

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


function removeElements(element) {
  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function addDeleteSearchResults(datas) {
  datas.forEach((data) => {
    // Creating Elements.
    const formOutput = document.createElement("div");
    const formOutputValue = document.createElement("p");
    const deleteButton = document.createElement("button");
    // Inserting necessary data.
    formOutputValue.innerText = data.url;
    deleteButton.innerText = "Delete";
    // Adding necessary classes.
    formOutput.classList.add("form-output");
    formOutputValue.classList.add("form-output-value");
    deleteButton.classList.add("btn-danger");

    // Appending them to the form.
    formOutput.appendChild(formOutputValue);
    formOutput.appendChild(deleteButton);
    formOutputContainer.appendChild(formOutput);

    // Adding Necessary events.
    deleteButton.addEventListener("click", () => deleteScrape(data._id, formOutput));
  });
  formOutputContainer.classList.remove("hidden");
}

function deleteScrape(id, output) {
  // Deleting the data from the database.
  fetch('/admin/deleteproduct', {
    method: "DELETE",
    body: JSON.stringify({
      id
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  });
  // Removing the data from the page.
  formOutputContainer.removeChild(output);
  // If no output left, hide the output container.
  if(!formOutputContainer.firstChild) {
    formOutputContainer.classList.add("hidden");
  }
}

// Search for deleting a product.
deleteProductForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(`/api/scrap?name=${deleteProductInput.value}`)
  .then(res => res.json())
  .then(datas => {
    removeElements(formOutputContainer);
    addDeleteSearchResults(datas);
  });
});

// Delete a product.

stopBtn.addEventListener("click", (e) => {
  fetch("/api/stopscraping", {
    method: 'POST'
  })
  .catch(err => {
    console.error(err);
  })
});

