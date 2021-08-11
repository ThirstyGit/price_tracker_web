const cheerio = require('cheerio');
const axios = require('axios');
const { Products } = require("../database/database.js");

async function scrap(url, params, cb) {
  // Requesting the page and loading it to cheerio.
  const page = await axios.get(url);
  const $ = cheerio.load(page.data);

  // The varibale to store the data.
  const productData = [];

  // Extracting the names.
  $(params.name).each((index, data) => {
    productData.push({
      name: $(data).text().replace(/\s\s+/g, "")
    });
  });
  // Extracting the prices.
  $(params.price).each((index, data) => {
    if(productData[index]) {
      productData[index]["price"] = $(data).text().replace(/\s\s+/g, "");
    }
  });

  // If we successfully scrapped the data,
  // insert them to the database.
  const website = url.split("https://")[1].split("/")[0];
  
  if(productData.length) {
    productData.forEach(data => {
      Products({
        name: data.name,
        website, // should be name of website. E.G. Steam, Amazon,
        link: url,
        price_history: {
            price: data.price
          }
      }).save();
    });
  }
  
  // Running any callback if passed.
  if(cb) cb();
};

module.exports = scrap;
