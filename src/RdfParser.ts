import Triple from "./Triple";

export default class RdfParser {
    createRdfData(triples: Triple[]) {
        var rdfData = ''
        for (let i = 0; i < triples.length; i++) {
            rdfData = rdfData + `${triples[i].subject} ${triples[i].predicate} ${triples[i].object} .\n`;
        }
        console.log(rdfData);
        return rdfData;

    }

    createTriples(subjects: string[], predicate: string, objects: string[]) {
        const triples = [];

        for (let i = 0; i < subjects.length; i++) {
            const triple = new Triple(subjects[i], predicate, objects[i]);
            triples.push(triple);
        }

        return triples;
    }
}




