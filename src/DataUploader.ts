import LeInScraper from "./LeInScraper";
import RdfParser from "./RdfParser";
import UploadService from "./UploadService";
import ExtractSrassenverzeichnis from "./scraping_strassenverzeichnis";
//import UploadService from "./UploadService";

export default class DataUploader{

    rdfParser = new RdfParser();

    async runAll() {
        await this.uploadLeInData();
        await this.processExtractSrassenverzeichnis();
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
        const uploadService = new UploadService();
        uploadService.uploadData(rdfData);
    }

    async processExtractSrassenverzeichnis() {
        const extractSrassenverzeichnis = new ExtractSrassenverzeichnis();
        const parsedXmlData = await extractSrassenverzeichnis.parseXmlFile();
        if (parsedXmlData) {
            const rdfData2 = this.rdfParser.createRdfData(parsedXmlData);
            console.log(rdfData2);
        } else {
            console.error('Fehler beim Parsen der XML-Datei.');
        }
    }

    
}
