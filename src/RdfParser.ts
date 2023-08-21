import Triple from "./Triple";

export default class RdfParser {
    createRdfData(triples: Triple[]) {
        var rdfData = ''
        for (let i = 0; i < triples.length; i++) {
            rdfData = rdfData + `${this.refactorString(triples[i].subject)} ${this.refactorString(triples[i].predicate)} ${this.refactorString(triples[i].object)} .\n`;
        }
        //console.log(rdfData);
        return rdfData;

    }

    refactorString(inputString: string){
        var modifiedString = this.addExtraMarks(inputString);
        modifiedString = this.checkIfLink(modifiedString);
        return modifiedString;
    }

    checkIfLink(inputString: string){
        if(inputString && inputString.startsWith("http")){
            return "<" + inputString + ">";
        } else {
            return "\"" + inputString + "\"";
        }
    }

    addExtraMarks(inputString: string): string {
        const modifiedString = inputString.replace(/"/g, '\\"');
        return modifiedString;
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




