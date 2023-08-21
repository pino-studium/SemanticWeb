import LeInScraper from "./LeInScraper";
import RdfParser from "./RdfParser";
//import UploadService from "./UploadService";
<<<<<<< HEAD
=======
import ExtractSrassenverzeichnis from "./scraping_strassenverzeichnis";
>>>>>>> 7b9242e19bd201f4645e98c67aa6eaa66910499c

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

<<<<<<< HEAD
    //const uploadService = new UploadService();
    //uploadService.uploadData(rdfData);
=======
    console.log(rdfData);
    const extractSrassenverzeichnis = new ExtractSrassenverzeichnis();
    const parsedXmlData = await extractSrassenverzeichnis.parseXmlFile();
    if (parsedXmlData) {
        const rdfData2 = rdfParser.createRdfData(parsedXmlData);
        console.log(rdfData2);
    } else {
        console.error('Fehler beim Parsen der XML-Datei.');
    }
    
>>>>>>> 7b9242e19bd201f4645e98c67aa6eaa66910499c
}



main();
