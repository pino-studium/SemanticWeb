export default class FusekiService {

  private serverURL = "http://92.206.209.228:3030/db";

  uploadData(rdfData: string) {
    fetch(this.serverURL, {
      method: 'POST',
      headers: {
        'Content-type': 'text/turtle; charset="utf-8"',
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

  async sparqlQuery(query: string) {
    const response = await fetch(this.serverURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/sparql-query'
      },
      body: query
    });

    if (!response.ok) {
      throw new Error('Fehler beim Ausführen der SPARQL-Abfrage');
    }

    const result = await response.json();
    return result;
  }

  formatSPARQLResults(results: any) {
    console.log("SPARQL Query Results:");
  
    const vars = results.head.vars;
    console.log("Variables:", vars);
  
    const bindings = results.results.bindings;
    console.log("Bindings:");
  
    bindings.forEach((binding: any, index: number) => {
      console.log(`Binding ${index + 1}:`);
      vars.forEach((variable: string) => {
        console.log(`${variable}:`, binding[variable]?.value);
      });
    });
  }
  
  }


