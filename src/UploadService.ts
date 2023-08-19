export default class UploadService {
  
  private serverURL = 'http://92.206.209.228:3030/db';

  uploadData(rdfData: string) {
    fetch(this.serverURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/turtle', // Sie können hier das gewünschte RDF-Format angeben
      },
      body: rdfData,
    })
    .then(response => {
      if (response.ok) {
        console.log('Daten erfolgreich hochgeladen.');
      } else {
        console.error('Fehler beim Hochladen der Daten.');
      }
    })
    .catch(error => {
      console.error('Ein Fehler ist aufgetreten:', error);
    });
  }
}

