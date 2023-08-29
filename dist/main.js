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
const FusekiService_1 = require("./FusekiService");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const sparqlQuery = `
        SELECT ?subject ?predicate ?object
        WHERE {
        ?subject ?predicate ?object .
        } LIMIT 100
        `;
        const fusekiService = new FusekiService_1.default();
        const result = yield fusekiService.sparqlQuery(sparqlQuery);
        console.log(fusekiService.formatSPARQLResults(result));
    });
}
main();
//# sourceMappingURL=main.js.map