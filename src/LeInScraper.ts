import * as cheerio from 'cheerio';

export default class LeInScraper {

    leipziginfoUrl: string = "https://www.leipziginfo.de"
    overviewPage: string = "/adressen/kategorie/sehenswuerdigkeit/"
    url = this.leipziginfoUrl + this.overviewPage;
    urlHtml: string;

    constructor() {
    };

    async initUrlHtml() {
        this.urlHtml = await this.fetchHTML(this.url) ?? "";
    }
    async fetchHTML(url: string) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const html = await response.text();
            return html;
        } catch (error) {
            console.error('Fehler beim Abrufen des HTML:', error);
            return null;
        }
    }
    getData(search: string) {
        const $ = cheerio.load(this.urlHtml);
        const elementsList: string[] = [];
        const elements = $(`span[itemprop="${search}"]`);

        elements.each((index, element) => {
            const text = $(element).text().trim();
            elementsList.push(text);
        });

        //console.log(elementsList);
        return elementsList;

    }
    getImageUrls() {
        const $ = cheerio.load(this.urlHtml);
        const imageUrls: string[] = [];

        $('a.image img').each((index, element) => {
            const imageUrl = $(element).attr('data-src');
            imageUrls.push(imageUrl ?? "");
        });

        return imageUrls;
    }
    getHrefs() {
        const $ = cheerio.load(this.urlHtml);
        const elements = $('a.next[title="Weitere Informationen"]');
        const hrefs: string[] = [];

        elements.each((index, element) => {
            const href = $(element).attr('href');
            hrefs.push(this.leipziginfoUrl + href);
        });

        return hrefs;
    }
    deleteHouseNumber(inputString: string) {

        for (let i = inputString.length - 1; i >= 0 && inputString.length - i < 7; i--) {
            if (isNaN(Number(inputString[i]))) continue;
            for (let j = 0; j < inputString.length; j++) {
                i--;
                if (!isNaN(Number(inputString[i])) || !isNaN(Number(inputString[i-1]))) continue;
                return inputString.slice(0, i + 1).trim();
            }

        }
        return inputString;
    }
}