"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class FusekiService {
    constructor() {
        this.serverURL = "http://92.206.209.228:3030/db";
    }
    uploadData(rdfData) {
        fetch(this.serverURL, {
            method: 'POST',
            headers: {
                'Content-type': 'text/turtle; charset="utf-8"',
            },
            body: rdfData,
        })
            .then(response => {
            if (response.ok) {
                console.log('Daten erfolgreich hochgeladen.');
            }
            else {
                console.error('Fehler beim Hochladen der Daten.');
            }
        })
            .catch(error => {
            console.error('Ein Fehler ist aufgetreten:', error);
        });
    }
    sparqlQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.serverURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/sparql-query'
                },
                body: query
            });
            if (!response.ok) {
                throw new Error('Fehler beim Ausführen der SPARQL-Abfrage');
            }
            const result = yield response.json();
            return result;
        });
    }
    formatSPARQLResults(results) {
        console.log("SPARQL Query Results:");
        const vars = results.head.vars;
        console.log("Variables:", vars);
        const bindings = results.results.bindings;
        console.log("Bindings:");
        bindings.forEach((binding, index) => {
            console.log(`Binding ${index + 1}:`);
            vars.forEach((variable) => {
                var _a;
                console.log(`${variable}:`, (_a = binding[variable]) === null || _a === void 0 ? void 0 : _a.value);
            });
        });
    }
}
exports.default = FusekiService;
//# sourceMappingURL=FusekiService.js.map