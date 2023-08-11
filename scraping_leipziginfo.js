const cheerio = require('cheerio');

const url = 'https://www.leipziginfo.de/adressen/kategorie/sehenswuerdigkeit/';

fetch(url)
    .then(response => response.text())
    .then(html => {
        const $ = cheerio.load(html);

        const streetAddressElements = $('span[itemprop="streetAddress"]');

        streetAddressElements.each((index, element) => {
            const text = $(element).text().trim();
            console.log(text);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });