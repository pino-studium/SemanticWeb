import LeInScraper from "./LeInScraper";
import RdfParser from "./RdfParser";
import UploadService from "./UploadService";
import ExtractSrassenverzeichnis from "./scraping_strassenverzeichnis";


export default class DataUploader {
 
    uploadService = new UploadService();
    rdfParser = new RdfParser();

    async runAll() {
        await this.uploadLeInData();
        //await this.processExtractSrassenverzeichnis();
    }

    async uploadLeInData() {
        const leInScraper = new LeInScraper();
        await leInScraper.initUrlHtml();
        const sightsName = leInScraper.getData('name');
        const sightsStreet = leInScraper.getData('streetAddress')
        const sightsImage = leInScraper.getImageUrls();
        const sightsHref = leInScraper.getHrefs();
        const sightsStreetWithoutNumber: string[] = [];
        sightsStreet.forEach(inputString => {
            sightsStreetWithoutNumber.push(leInScraper.deleteHouseNumber(inputString));
        });



        const triples = this.rdfParser.createTriples(sightsHref, `http://schema.org/name`, sightsName)
            .concat(this.rdfParser.createTriples(sightsHref, `http://schema.org/image`, sightsImage))
            .concat(this.rdfParser.createTriples(sightsHref, `http://schema.org/PostalAddress`, sightsStreetWithoutNumber));

        const rdfData = this.rdfParser.createRdfData(triples);
        console.log(rdfData);
       
        this.uploadService.uploadData(rdfData);
    }

    async processExtractSrassenverzeichnis() {

        const extractSrassenverzeichnis = new ExtractSrassenverzeichnis();
        const parsedXmlData = await extractSrassenverzeichnis.parseXmlFile();
        const schluessel = parsedXmlData[0];
        const names = parsedXmlData[1];
        const erlaeuterung = parsedXmlData[2];


        const triples = this.rdfParser.createTriples(schluessel, `http://schema.org/name`, names)
            .concat(this.rdfParser.createTriples(schluessel, `https://schema.org/description`, erlaeuterung))

        const rdfData = this.rdfParser.createRdfData(triples);
        console.log(rdfData);

        this.uploadService.uploadData(rdfData);
    }
}
