import LeInScraper from "./LeInScraper";
import RdfParser from "./RdfParser";
//import UploadService from "./UploadService";
import ExtractSrassenverzeichnis from "./scraping_strassenverzeichnis";

async function main(){

    const leInScraper= new LeInScraper();
    await leInScraper.initUrlHtml();
    const sightsName = leInScraper.getData('name');
    const sightsStreet = leInScraper.getData('streetAddress')
    const sightsImage = leInScraper.getImageUrls();
    const sightsHref = leInScraper.getHrefs();
    const sightsStreetWithoutNumber: string[] = [];
    sightsStreet.forEach(inputString => {
        sightsStreetWithoutNumber.push(leInScraper.deleteHouseNumber(inputString));
    });

    
    const rdfParser = new RdfParser();
    const triples = rdfParser.createTriples(sightsHref, `http://schema.org/name`, sightsName)
    .concat(rdfParser.createTriples(sightsHref, `http://schema.org/image`, sightsImage))
    .concat(rdfParser.createTriples(sightsHref, `http://schema.org/PostalAddress`, sightsStreetWithoutNumber));

    const rdfData = rdfParser.createRdfData(triples);

    console.log(rdfData);
    const extractSrassenverzeichnis = new ExtractSrassenverzeichnis();
    const parsedXmlData = await extractSrassenverzeichnis.parseXmlFile();
    if (parsedXmlData) {
        const rdfData2 = rdfParser.createRdfData(parsedXmlData);
        console.log(rdfData2);
    } else {
        console.error('Fehler beim Parsen der XML-Datei.');
    }
    
}



main();
