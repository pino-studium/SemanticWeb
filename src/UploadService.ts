export default class UploadService {
    uploadData(rdfData: string) {
        fetch("http://92.206.209.228:3030/db",{
            method: "POST",
            headers: {
                "Content-type": "text/turtle; charset=utf-8",
            },
            body: rdfData,
        })
        .then(response => {
            if (response.ok) {
                console.log("Daten erfolgreich hochgeladen.");
            } else {
                console.error("Fehler beim Hochladen der Daten.");
            }
        })
        .catch(error => {
            console.error("Ein Fehler ist aufgetreten:", error);
        });
    }
}