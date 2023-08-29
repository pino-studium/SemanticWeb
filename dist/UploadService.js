"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UploadService {
    constructor() {
        this.serverURL = 'http://92.206.209.228:3030/db';
    }
    uploadData(rdfData) {
        fetch(this.serverURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/turtle',
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
}
exports.default = UploadService;
//# sourceMappingURL=UploadService.js.map