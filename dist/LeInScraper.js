"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = require("cheerio");
class LeInScraper {
    constructor() {
        this.leipziginfoUrl = "https://www.leipziginfo.de";
        this.overviewPage = "/adressen/kategorie/sehenswuerdigkeit/";
        this.url = this.leipziginfoUrl + this.overviewPage;
    }
    ;
    initUrlHtml() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.urlHtml = (_a = yield this.fetchHTML(this.url)) !== null && _a !== void 0 ? _a : "";
        });
    }
    fetchHTML(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const html = yield response.text();
                return html;
            }
            catch (error) {
                console.error('Fehler beim Abrufen des HTML:', error);
                return null;
            }
        });
    }
    getData(search) {
        const $ = cheerio.load(this.urlHtml);
        const elementsList = [];
        const elements = $(`span[itemprop="${search}"]`);
        elements.each((index, element) => {
            const text = $(element).text().trim();
            elementsList.push(text);
        });
        return elementsList;
    }
    getImageUrls() {
        const $ = cheerio.load(this.urlHtml);
        const imageUrls = [];
        $('a.image img').each((index, element) => {
            const imageUrl = $(element).attr('data-src');
            imageUrls.push(imageUrl !== null && imageUrl !== void 0 ? imageUrl : "");
        });
        return imageUrls;
    }
    getHrefs() {
        const $ = cheerio.load(this.urlHtml);
        const elements = $('a.next[title="Weitere Informationen"]');
        const hrefs = [];
        elements.each((index, element) => {
            const href = $(element).attr('href');
            hrefs.push(this.leipziginfoUrl + href);
        });
        return hrefs;
    }
    deleteHouseNumber(inputString) {
        for (let i = inputString.length - 1; i >= 0 && inputString.length - i < 7; i--) {
            if (isNaN(Number(inputString[i])))
                continue;
            for (let j = 0; j < inputString.length; j++) {
                i--;
                if (!isNaN(Number(inputString[i])) || !isNaN(Number(inputString[i - 1])))
                    continue;
                return inputString.slice(0, i + 1).trim();
            }
        }
        return inputString;
    }
}
exports.default = LeInScraper;
//# sourceMappingURL=LeInScraper.js.map