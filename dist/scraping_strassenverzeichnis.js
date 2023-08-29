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
const fs = require("fs/promises");
const xml2js = require("xml2js");
class ExtractSrassenverzeichnis {
    parseXmlFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const resultSchluessel = [];
            const resultName = [];
            const resultErlaeuterung = [];
            const resultAll = [resultSchluessel, resultName, resultErlaeuterung];
            try {
                const xmlData = yield fs.readFile('src/Strassenverzeichnis.xml', 'utf-8');
                const parser = new xml2js.Parser();
                const result = yield parser.parseStringPromise(xmlData);
                if (result && result.Strassenverzeichnis && result.Strassenverzeichnis.STRASSE && Array.isArray(result.Strassenverzeichnis.STRASSE)) {
                    const strassen = result.Strassenverzeichnis.STRASSE;
                    for (const strasseData of strassen) {
                        const stammdaten = strasseData.STAMMDATEN && Array.isArray(strasseData.STAMMDATEN) ? strasseData.STAMMDATEN[0] : null;
                        const erlaeuterung = strasseData.ERKLAERUNG && Array.isArray(strasseData.ERKLAERUNG) ? strasseData.ERKLAERUNG[0].ERLAEUTERUNG[0] : null;
                        if (stammdaten) {
                            const name = stammdaten.NAME && stammdaten.NAME[0].trim();
                            const schluessel = stammdaten.SCHLUESSEL && stammdaten.SCHLUESSEL[0].trim();
                            if (name && erlaeuterung && schluessel) {
                                resultSchluessel.push(schluessel);
                                resultName.push(name);
                                resultErlaeuterung.push(erlaeuterung);
                            }
                        }
                    }
                }
                else {
                    console.error('Die Struktur der XML-Datei ist nicht wie erwartet.');
                }
            }
            catch (error) {
                console.error('Fehler:', error);
            }
            return resultAll;
        });
    }
}
exports.default = ExtractSrassenverzeichnis;
//# sourceMappingURL=scraping_strassenverzeichnis.js.map