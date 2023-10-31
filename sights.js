async function getFusekiData(body, valueType = "object") {
    const fetchData = await fetch("http://141.57.9.111:3032/db/query", {
        method: 'POST',
        headers: {
            'Authorizatio': 'Basic '+btoa('admin:ieb3Oo.p0ooche5'),
            'Content-Type': 'application/sparql-query'
        },
        body: body
    });
    const getData = await fetchData.json();
    const dataBindings = getData["results"]["bindings"];
    const dataList = [];
    
    for (let i = 0; i < dataBindings.length; i++) {
        if (valueType === "object") {
            dataList.push(dataBindings[i]["object"]["value"]);
        } else if (valueType === "subject") {
            dataList.push(dataBindings[i]["subject"]["value"]);
        }
    }
    
    console.log(dataList);
    return dataList;
}

async function getSightsList() {
    const bodySights = `SELECT ?object
        WHERE {
        ?subject ?predicate ?object .
        FILTER(STRSTARTS(STR(?subject), "https://www.leipziginfo.de/adressen/ort/") && ?predicate = <http://schema.org/name> )}`;
    const sightsList = await getFusekiData(bodySights);
    const bodySightsImg = `SELECT ?object
        WHERE {
        ?subject ?predicate ?object
        FILTER(?predicate = <http://schema.org/image>)}`;
    const sightsImgList = await getFusekiData(bodySightsImg);
    const bodySightsUrl = `SELECT ?subject
    WHERE {
    ?subject ?predicate ?object .
    FILTER(STRSTARTS(STR(?subject), "https://www.leipziginfo.de/adressen/ort/") && ?predicate = <http://schema.org/name> )}`;
    const sightsUrlList = await getFusekiData(bodySightsUrl, "subject");
    let map = L.map('map', { zoomControl: false }).setView([51.3399167, 12.3746593], 15);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "OpenStreetMap" }).addTo(map);
    for (let i = 0; i < sightsList.length; i++) {
        let sightName = sightsList[i];
        console.log(sightName);
        const response = await fetch(`https://nominatim.openstreetmap.org/search?amenity=${sightName}&city=Leipzig&format=jsonv2&countrycodes=de&limit=1`);
        const result = await response.json();
        if (result.length === 0) continue;
        let lat = result[0].lat;
        let lon = result[0].lon;
        let marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup(`<a href="${sightsUrlList[i]}">${sightName}</a> <br> <img src="${sightsImgList[i]}" alt="Bild" style="min-width: 200px;">`);
        
    }

}


getSightsList();
