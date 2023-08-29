import RdfParser from "./RdfParser";
import FusekiService from "./FusekiService";
export default class DataUploader {
    uploadService: FusekiService;
    rdfParser: RdfParser;
    runAll(): Promise<void>;
    uploadLeInData(): Promise<void>;
    processExtractSrassenverzeichnis(): Promise<void>;
}
