import {rdfData} from "./rdfParser.js";

// Die URL des Fuseki-Servers (ersetzen Sie 'http://localhost:3030/datasetName' durch Ihre eigene URL)
const serverURL = 'http://92.206.209.228:3030/db';

// Daten im RDF/Turtle-Format
// const rdfData = `
//   @prefix ex: <http://example.org/> .
//   ex:subject1 ex:predicate ex:object1 .
//   ex:subject2 ex:predicate ex:object2 .
//   # Weitere Tripel hier...
// `;

// HTTP-Anfrage zum Hochladen der Daten
fetch(serverURL, {
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

