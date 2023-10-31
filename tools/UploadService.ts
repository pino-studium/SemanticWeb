export default class UploadService {
  
  private serverURL = 'http://141.57.9.111:3032/db';

  uploadData(rdfData: string) {
    fetch(this.serverURL, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic '+btoa('admin:ieb3Oo.p0ooche5'),
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

