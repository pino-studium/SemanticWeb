import fs from 'fs/promises';
import xml2js from 'xml2js';

async function parseXmlFile() {
    try {
        const xmlData = await fs.readFile('src/Strassenverzeichnis.xml', 'utf-8');

        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(xmlData);

        // Überprüfen Sie, ob das `result`-Objekt und die erforderlichen Eigenschaften vorhanden sind
        if (result && result.Strassenverzeichnis && result.Strassenverzeichnis.STRASSE && Array.isArray(result.Strassenverzeichnis.STRASSE)) {
            const strassen = result.Strassenverzeichnis.STRASSE;
            const datenbank = [];

            for (const strasseData of strassen) {
                const stammdaten = strasseData.STAMMDATEN && Array.isArray(strasseData.STAMMDATEN) ? strasseData.STAMMDATEN[0] : null;
                const erlaeuterung = strasseData.ERKLAERUNG && Array.isArray(strasseData.ERKLAERUNG) ? strasseData.ERKLAERUNG[0].ERLAEUTERUNG[0] : null;

                if (stammdaten) {
                    const name = stammdaten.NAME && stammdaten.NAME[0].trim(); // Hier die trim()-Methode anwenden
                    const schluessel = stammdaten.SCHLUESSEL && stammdaten.SCHLUESSEL[0].trim(); // Hier die trim()-Methode anwenden

                    if (name && erlaeuterung && schluessel) {
                        const triple = {
                            name: name,
                            erlaeuterung: erlaeuterung,
                            schluessel: schluessel
                        };

                        datenbank.push(triple);
                    }
                }
            }

            console.log(datenbank);
        } else {
            console.error('Die Struktur der XML-Datei ist nicht wie erwartet.');
        }
    } catch (error) {
        console.error('Fehler:', error);
    }
}

parseXmlFile();
