import Triple from "./Triple";

export default class RdfParser {
    createRdfData(triples: Triple[]) {
        var rdfData = ''
        for (let i = 0; i < triples.length; i++) {
            rdfData = rdfData + `${this.checkIfLink(triples[i].subject)} ${this.checkIfLink(triples[i].predicate)} ${this.checkIfLink(triples[i].object)} .\n`;
        }
        console.log(rdfData);
        return rdfData;

    }

    checkIfLink(input: string){
        if(input.startsWith("http")){
            return "<" + input + ">";
        } else {
            return "\"" + input + "\"";
        }
        
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




