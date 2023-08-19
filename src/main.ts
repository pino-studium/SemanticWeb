import LeInScraper from "./LeInScraper";
import RdfParser from "./RdfParser";
import UploadService from "./UploadService";

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

    const uploadService = new UploadService();
    uploadService.uploadData(rdfData);
}

main();
