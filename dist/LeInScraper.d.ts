export default class LeInScraper {
    leipziginfoUrl: string;
    overviewPage: string;
    url: string;
    urlHtml: string;
    constructor();
    initUrlHtml(): Promise<void>;
    fetchHTML(url: string): Promise<string | null>;
    getData(search: string): string[];
    getImageUrls(): string[];
    getHrefs(): string[];
    deleteHouseNumber(inputString: string): string;
}
