import {sightsName,sightsStreetWithoutNumber,sightsImage,sightsHref} from "./scraping_leipziginfo.js"

class Triple {
    constructor(subject, predicate, object) {
        this.subject = subject;
        this.predicate = predicate;
        this.object = object;
    }
}

const triples = createTriples(sightsHref, `http://schema.org/name`, sightsName)
    .concat(createTriples(sightsHref, `http://schema.org/image`, sightsImage))
    .concat(createTriples(sightsHref, `http://schema.org/PostalAddress`, sightsStreetWithoutNumber));

export const rdfData = createRdfData(triples); 



function createRdfData(triples){ 
    var rdfData ='' 
    for (let i = 0; i < triples.length; i++){
        rdfData = rdfData + `${triples[i].subject} ${triples[i].predicate} ${triples[i].object} .\n`;
    }
   console.log(rdfData); 
   return rdfData;

}

function createTriples(subjects, predicate, objects) {
    const triples = [];
    
    for (let i = 0; i < subjects.length; i++) {
        const triple = new Triple(subjects[i], predicate, objects[i]);
        triples.push(triple);
    }
    
    return triples;
}



