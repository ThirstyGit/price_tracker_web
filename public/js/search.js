const searchBar = document.querySelector('#search-bar');
const cardContainer = document.querySelector('#card-container');

let test;

// Fliter the products shown on the page based on the given data
function filterProducts(datas) {
  // clear previous products.
  while(cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
  // Add new products based on the given data.
	datas = datas.searchproduct;
  for(let i in datas) {
    // Creating elements.
    const product = document.createElement('div');
    const imageAnchor = document.createElement('a');
    const productImage = document.createElement('img');
    const productName = document.createElement('p');
    const productPrice = document.createElement('p');
    
    // Assigning values.
    productImage.src = `${datas[i].image}`;
    imageAnchor.href = `/tracking/prod/${datas[i].id}`;
    productName.innerText = datas[i].name;
		// Getting the most recent price.
		const price = datas[i].price_history[datas[i].price_history.length - 1].price
    productPrice.innerText = price;

    // Assigning classes
    product.classList.add('product');
    productImage.classList.add('card-image');
    productName.classList.add('card-name');
    productPrice.classList.add('card-price');

    // Appending everything properly.
    imageAnchor.appendChild(productImage);
    product.appendChild(productName);
    product.appendChild(productPrice);
    product.appendChild(imageAnchor);
    cardContainer.appendChild(product);
  }
}


searchBar.addEventListener('keypress', (e) => {
if(e.keyCode === 13) {
  // getting the domain name out.
  fetch(`/search?name=${searchBar.value}`)
  .then(res => {
    return res.json();
  })
  .then(data => {
    console.log(data)
    filterProducts(data);
  })
  .catch((err) => {
    console.log(err)
    //console.log
  })
}
})