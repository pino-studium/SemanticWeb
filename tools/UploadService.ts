export default class UploadService {
  
  private serverURL = 'http://92.206.214.78:3030/db';

  uploadData(rdfData: string) {
    fetch(this.serverURL, {
      method: 'POST',
      headers: {
        'Content-type': 'text/turtle; charset=utf-8', 
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

