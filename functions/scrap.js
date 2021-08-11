const cheerio = require('cheerio');
const axios = require('axios');

async function scrap(url, params, cb) {
  // Requesting the page and loading it to cheerio.
  const page = await axios.get(url);
  const $ = cheerio.load(page.data);

  // Extracting the names.
  $(params.name).each((index, data) => {
    console.log($(data).text().replace(/\s\s+/g, ""));
  });
  // Extracting the prices.
  $(params.price).each((index, data) => {
    console.log($(data).text().replace(/\s\s+/g, ''));
  });
  
  // Running any callback if passed.
  if(cb) cb();
};

module.exports = scrap;
