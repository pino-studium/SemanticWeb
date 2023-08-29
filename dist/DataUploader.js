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
const LeInScraper_1 = require("./LeInScraper");
const RdfParser_1 = require("./RdfParser");
const FusekiService_1 = require("./FusekiService");
const scraping_strassenverzeichnis_1 = require("./scraping_strassenverzeichnis");
class DataUploader {
    constructor() {
        this.uploadService = new FusekiService_1.default();
        this.rdfParser = new RdfParser_1.default();
    }
    runAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.uploadLeInData();
        });
    }
    uploadLeInData() {
        return __awaiter(this, void 0, void 0, function* () {
            const leInScraper = new LeInScraper_1.default();
            yield leInScraper.initUrlHtml();
            const sightsName = leInScraper.getData('name');
            const sightsStreet = leInScraper.getData('streetAddress');
            const sightsImage = leInScraper.getImageUrls();
            const sightsHref = leInScraper.getHrefs();
            const sightsStreetWithoutNumber = [];
            sightsStreet.forEach(inputString => {
                sightsStreetWithoutNumber.push(leInScraper.deleteHouseNumber(inputString));
            });
            const triples = this.rdfParser.createTriples(sightsHref, `http://schema.org/name`, sightsName)
                .concat(this.rdfParser.createTriples(sightsHref, `http://schema.org/image`, sightsImage))
                .concat(this.rdfParser.createTriples(sightsHref, `http://schema.org/PostalAddress`, sightsStreetWithoutNumber));
            const rdfData = this.rdfParser.createRdfData(triples);
            console.log(rdfData);
            this.uploadService.uploadData(rdfData);
        });
    }
    processExtractSrassenverzeichnis() {
        return __awaiter(this, void 0, void 0, function* () {
            const extractSrassenverzeichnis = new scraping_strassenverzeichnis_1.default();
            const parsedXmlData = yield extractSrassenverzeichnis.parseXmlFile();
            const schluessel = parsedXmlData[0];
            const names = parsedXmlData[1];
            const erlaeuterung = parsedXmlData[2];
            const triples = this.rdfParser.createTriples(schluessel, `http://schema.org/name`, names)
                .concat(this.rdfParser.createTriples(schluessel, `https://schema.org/description`, erlaeuterung));
            const rdfData = this.rdfParser.createRdfData(triples);
            console.log(rdfData);
            this.uploadService.uploadData(rdfData);
        });
    }
}
exports.default = DataUploader;
//# sourceMappingURL=DataUploader.js.map