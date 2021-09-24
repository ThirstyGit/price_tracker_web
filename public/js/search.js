const searchBar = document.querySelector('#search-bar');
const cardContainer = document.querySelector('#card-container');



// Fliter the products shown on the page based on the given data
function filterProducts(datas) {
  // clear previous products.
  while(cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
  // Add new products based on the given data.
  //console.log(Array.isArray(datas))
  const arr =datas;
  /*for(let i in arr){
    console.log(arr[i])

  }*/
  for(let i in arr){
    // Creating elements.
    const product = document.createElement('div');
    const imageAnchor = document.createElement('a');
    const productImage = document.createElement('img');
    const productName = document.createElement('p');
    const productPrice = document.createElement('p');
    
    // Assigning values.
    productImage.src = `${arr[i].image}`;
    imageAnchor.href = `/tracking/prod/${arr[i].id}`;
    productName.innerText = arr[i].name;
    productPrice.innerText = arr[i].price;

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
 /* datas.forEach(data => {
      // Creating elements.
      const product = document.createElement('div');
      const imageAnchor = document.createElement('a');
      const productImage = document.createElement('img');
      const productName = document.createElement('p');
      const productPrice = document.createElement('p');
      
      // Assigning values.
      productImage.src = `${data.image}`;
      imageAnchor.href = `/tracking/prod/${data.id}`;
      productName.innerText = data.name;
      productPrice.innerText = data.price;

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
  });*/
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