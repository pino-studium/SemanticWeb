import LeInUploader from "./LeInUploader";
//import UploadService from "./UploadService";
import ExtractSrassenverzeichnis from "./scraping_strassenverzeichnis";

async function main(){

    const leInUploader = new LeInUploader();
    leInUploader.uploadLeInData();
    
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
