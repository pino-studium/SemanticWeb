import * as fs from 'fs/promises';
import * as xml2js from 'xml2js';
//import Triple from "./Triple";

export default class ExtractSrassenverzeichnis {
    async parseXmlFile() {
        const resultSchluessel: string[] = [];
        const resultName: string[] = [];
        const resultErlaeuterung: string[] = [];
        const resultAll: string[][] = [resultSchluessel,resultName,resultErlaeuterung];

        try {
            const xmlData = await fs.readFile('tools/Strassenverzeichnis.xml', 'utf-8');

            const parser = new xml2js.Parser();
            const result = await parser.parseStringPromise(xmlData);

            // Überprüfen Sie, ob das `result`-Objekt und die erforderlichen Eigenschaften vorhanden sind
            if (result && result.Strassenverzeichnis && result.Strassenverzeichnis.STRASSE && Array.isArray(result.Strassenverzeichnis.STRASSE)) {
                const strassen = result.Strassenverzeichnis.STRASSE;
                
                for (const strasseData of strassen) {
                    const stammdaten = strasseData.STAMMDATEN && Array.isArray(strasseData.STAMMDATEN) ? strasseData.STAMMDATEN[0] : null;
                    const erlaeuterung = strasseData.ERKLAERUNG && Array.isArray(strasseData.ERKLAERUNG) ? strasseData.ERKLAERUNG[0].ERLAEUTERUNG[0].trim() : null;

                    if (stammdaten) {
                        const name = stammdaten.NAME && stammdaten.NAME[0].trim(); 
                        const schluessel = stammdaten.SCHLUESSEL && stammdaten.SCHLUESSEL[0].trim(); 

                        if (name && erlaeuterung && schluessel) {
                            resultSchluessel.push("https://github.com/pino-studium/streetory-tools/" + schluessel);
                            resultName.push(name);
                            resultErlaeuterung.push(erlaeuterung);
                        }
                        
                    }
                }
            } else {
                console.error('Die Struktur der XML-Datei ist nicht wie erwartet.');
                
            }
        } catch (error) {
            console.error('Fehler:', error);
            
        }
        return resultAll;
    }
    
}