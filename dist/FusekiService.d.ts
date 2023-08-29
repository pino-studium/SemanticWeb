export default class FusekiService {
    private serverURL;
    uploadData(rdfData: string): void;
    sparqlQuery(query: string): Promise<any>;
    formatSPARQLResults(results: any): void;
}
