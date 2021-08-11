const cheerio = require('cheerio');
const axios = require('axios');

async function scrap(url, parmas) {
  const page = await axios.get(url);
  return 'Function not complete.';
};

module.exports = scrap;
