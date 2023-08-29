import Triple from "./Triple";
export default class RdfParser {
    createRdfData(triples: Triple[]): string;
    refactorString(inputString: string): string;
    checkIfLink(inputString: string): string;
    addExtraMarks(inputString: string): string;
    createTriples(subjects: string[], predicate: string, objects: string[]): Triple[];
}
