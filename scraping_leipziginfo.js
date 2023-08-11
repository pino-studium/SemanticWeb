const cheerio = require('cheerio');

const url = 'https://www.leipziginfo.de/adressen/kategorie/sehenswuerdigkeit/';
const sightseeingNames = [];

fetch(url)
    .then(response => response.text())
    .then(html => {
        const $ = cheerio.load(html);

        const streetAddressElements = $('span[itemprop="streetAddress"]');

        streetAddressElements.each((index, element) => {
            const text = $(element).text().trim();
            sightseeingNames.push(text)
            console.log(sightseeingNames);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });