import * as cheerio from 'cheerio';

const leipziginfoUrl = "https://www.leipziginfo.de"
const overviewPage = "/adressen/kategorie/sehenswuerdigkeit/" 
const url = leipziginfoUrl + overviewPage;
const urlHtml = await fetchHTML(url);
console.log(urlHtml);

async function fetchHTML(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        return html;
    } catch (error) {
        console.error('Fehler beim Abrufen des HTML:', error);
        return null;
    }
}



function getData(search) {

    const $ = cheerio.load(urlHtml);
    const elementsList = [];
    const elements = $(`span[itemprop="${search}"]`);

    elements.each((index, element) => {
        const text = $(element).text().trim();
        elementsList.push(text);
    });

    //console.log(elementsList);
    return elementsList;

}

function getImageUrls() {

    const $ = cheerio.load(urlHtml);
    const imageUrls = [];

    $('a.image img').each((index, element) => {
        const imageUrl = $(element).attr('data-src');
        imageUrls.push(imageUrl);
    });

    return imageUrls;
}

function getHrefs() {

    const $ = cheerio.load(urlHtml);
    const elements = $('a.next[title="Weitere Informationen"]');
    const hrefs = [];

    elements.each((index, element) => {
        const href = $(element).attr('href'); 
        hrefs.push(leipziginfoUrl + href);
    });

    return hrefs;
}

function deleteHouseNumber(inputString) {
    for (let i = inputString.length - 1; i >= 0; i--) {
        if (isNaN(inputString[i])) continue;
        for (let j = 0; j < inputString.length; j++) {
            i--;
            if (!isNaN(inputString[i]) || !isNaN(inputString[i - 1])) continue;
            return inputString.slice(0, i + 1).trim();
        }
        
    }
    return inputString;
}


export const sightsName = getData('name');
const sightsStreet = getData('streetAddress')
export const sightsImage = getImageUrls();
export const sightsHref = getHrefs();
export const sightsStreetWithoutNumber = [];
sightsStreet.forEach(inputString => {
    sightsStreetWithoutNumber.push(deleteHouseNumber(inputString));
});


//console.log(sightsName);  //http://schema.org/name
//console.log(sightsStreet);
//console.log(sightsStreetWithoutNumber); //http://schema.org/PostalAddress
//console.log(sightsImage); //http://schema.org/image

//console.log(sightsHref);




