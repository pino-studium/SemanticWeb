"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Triple_1 = require("./Triple");
class RdfParser {
    createRdfData(triples) {
        var rdfData = '';
        for (let i = 0; i < triples.length; i++) {
            rdfData = rdfData + `${this.refactorString(triples[i].subject)} ${this.refactorString(triples[i].predicate)} ${this.refactorString(triples[i].object)} .\n`;
        }
        return rdfData;
    }
    refactorString(inputString) {
        var modifiedString = this.addExtraMarks(inputString);
        modifiedString = this.checkIfLink(modifiedString);
        return modifiedString;
    }
    checkIfLink(inputString) {
        if (inputString && inputString.startsWith("http")) {
            return "<" + inputString + ">";
        }
        else {
            return "\"" + inputString + "\"";
        }
    }
    addExtraMarks(inputString) {
        const modifiedString = inputString.replace(/"/g, '\\"');
        return modifiedString;
    }
    createTriples(subjects, predicate, objects) {
        const triples = [];
        for (let i = 0; i < subjects.length; i++) {
            const triple = new Triple_1.default(subjects[i], predicate, objects[i]);
            triples.push(triple);
        }
        return triples;
    }
}
exports.default = RdfParser;
//# sourceMappingURL=RdfParser.js.map