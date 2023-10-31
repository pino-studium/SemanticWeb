const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let streetName = urlParams.get('strasse');
if (streetName == null) {
    streetName = "Naschmarkt";
}
async function getData() {
    document.getElementById("input").setAttribute("value", streetName);
    document.getElementById("name").innerHTML = streetName;
    const fetchstreetId = await fetch("http://92.206.214.78:3030/db/query", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/sparql-query'
        },
        body: `SELECT ?subject
                    WHERE {
                        ?subject ?predicate ?object .
                        FILTER(?object = "${streetName}" && ?predicate = <http://schema.org/name> )
                    }`
    });
    const getstreetId = await fetchstreetId.json();
    const streetId = getstreetId["results"]["bindings"][0]["subject"]["value"];
    const fetchdescription = await fetch("http://92.206.214.78:3030/db/query", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/sparql-query'
        },
        body: `SELECT ?object
                    WHERE {
                        ?subject ?predicate ?object .
                        FILTER(?subject = <${streetId}> && ?predicate = <https://schema.org/description>)
                    }`
    });
    const getdescription = await fetchdescription.json();
    const description = getdescription["results"]["bindings"][0]["object"]["value"];
    document.getElementById("description").innerHTML = description;
    const fetchsightseeing = await fetch("http://92.206.214.78:3030/db/query", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/sparql-query'
        },
        body: `SELECT ?subject
                    WHERE {
                        ?subject ?predicate ?object .
                        FILTER(STRSTARTS(STR(?object), "${streetName}") && ?predicate = <http://schema.org/PostalAddress> )
                    }`
    });
    const getsightseeing = await fetchsightseeing.json();
    const sightseeing = getsightseeing["results"]["bindings"][0]["subject"]["value"];
    document.getElementById("sightseeing").setAttribute("href", sightseeing);
    const fetchsightseeinginfo = await fetch("http://92.206.214.78:3030/db/query", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/sparql-query'
        },
        body: `SELECT ?object
                    WHERE {
                        ?subject ?predicate ?object .
                        FILTER(?subject = <${sightseeing}>)
                    }`
    });
    const getsightseeinginfo = await fetchsightseeinginfo.json();
    const sightseeingname = getsightseeinginfo["results"]["bindings"][0]["object"]["value"];
    const sightseeingimage = getsightseeinginfo["results"]["bindings"][1]["object"]["value"];
    document.getElementById("sightseeing").innerHTML = sightseeingname;
    document.getElementById("image").setAttribute("src", sightseeingimage);
}
async function getStreetList() {
    const fetchstreets = await fetch("http://92.206.214.78:3030/db/query", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/sparql-query'
        },
        body: `SELECT ?object
                        WHERE {
                            ?subject ?predicate ?object .
                            FILTER(STRSTARTS(STR(?subject), "https://github.com/pino-studium/streetory-tools") && ?predicate = <http://schema.org/name> )
                        }`
    });
    const streetlist = await fetchstreets.json();
    var datalist = document.getElementById("datalist");
    for (let i = 0; i < streetlist["results"]["bindings"].length; i++) {
        var option = document.createElement('option');
        option.value = streetlist["results"]["bindings"][i]["object"]["value"];
        datalist.appendChild(option);
    }
}
async function getMap() {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?street=${streetName}&city=Leipzig&format=jsonv2&countrycodes=de&limit=1`);
    const result = await response.json();
    let lat = result[0].lat;
    let lon = result[0].lon;
    let map = L.map('map', { zoomControl: false }).setView([lat, lon], 18);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "OpenStreetMap" }).addTo(map);
    L.marker([lat, lon]).addTo(map);
}

getData();
getMap();
getStreetList();