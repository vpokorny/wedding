const text_style = {
    position:"absolute",
    left:"0px",
    top:"1px",
    textAlign:"center",
    width:"22px",
    color:"white",
    fontWeight:"bold"
};

// Marker for ceremony
const ceremony_marker = JAK.mel("div");
ceremony_marker.appendChild(
    JAK.mel("img", {src:`${SMap.CONFIG.img}/marker/drop-red.png`})
);
const ceremony_marker_text = JAK.mel("div", {}, text_style)
ceremony_marker_text.innerHTML = "1";
ceremony_marker.appendChild(ceremony_marker_text);

// Marker for parking
const parking_marker = JAK.mel("div");
parking_marker.appendChild(
    JAK.mel("img", {src:`${SMap.CONFIG.img}/marker/drop-blue.png`})
);
const parking_marker_text = JAK.mel("div", {}, text_style)
parking_marker_text.innerHTML = "A";
parking_marker.appendChild(parking_marker_text);

// Marker for VIP parking
const parking_vip_marker = JAK.mel("div");
parking_vip_marker.appendChild(
    JAK.mel("img", {src:`${SMap.CONFIG.img}/marker/drop-blue.png`})
);
const parking_vip_marker_text = JAK.mel("div", {}, text_style)
parking_vip_marker_text.innerHTML = "B";
parking_vip_marker.appendChild(parking_vip_marker_text);

// Marker for VIP parking
const pension_marker = JAK.mel("div");
pension_marker.appendChild(
    JAK.mel("img", {src:`${SMap.CONFIG.img}/marker/drop-yellow.png`})
);
const pension_marker_text = JAK.mel("div", {}, text_style)
pension_marker_text.innerHTML = "";
pension_marker.appendChild(pension_marker_text);

let map = new SMap(JAK.gel("map"));
map.addControl(new SMap.Control.Sync()); /* Aby mapa reagovala na změnu velikosti průhledu */
map.addDefaultLayer(SMap.DEF_BASE).enable(); /* Turistický podklad */
const mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM); /* Ovládání myší */
map.addControl(mouse);

const data = [
    {
        name: "Místo konání obřadu",
        comment: "Vyhlídkové místo Dubičky s výhledem na Labe.",
        coordinates: {
            latitude: 50.589884,
            longitude: 14.022733
        },
        marker: ceremony_marker
    },
    {
        name: "Parking pro svatebčany",
        comment: "Nehlídaný parking 5 minut od penzionu (kap. ~ 30 aut)",
        coordinates: {
            latitude: 50.591079,
            longitude: 14.020898
        },
        marker: parking_marker
    },
    {
        name: "Parking pro svatebčany",
        comment: "Parking za penzionem U Svaté Barbory (kap. ~ 8 aut)",
        coordinates: {
            latitude: 50.589746,
            longitude: 14.022049
        },
        marker: parking_vip_marker
    },
    {
        name: "Penzion U Svaté Barbory",
        comment: "Penzion, kde je zajištěno ubytování a catering.",
        coordinates: {
            latitude: 50.5897731,
            longitude: 14.0223122
        },
        marker: pension_marker
    }
];

let markers = [];
let coordinates = [];

/* Creation of markers */
for (let i = 0; i < data.length; i++) {
    let marker_data = data[i];
    const c = SMap.Coords.fromWGS84(
        marker_data.coordinates.longitude,
        marker_data.coordinates.latitude
    );

    const options = {
        url: marker_data.marker,
        title: `${marker_data.name}\n(${marker_data.comment})`,
        anchor: {
            left:10,
            bottom: 1
        }
    }

    coordinates.push(c);
    markers.push(
        new SMap.Marker(c, null, options)
    );
}

// Add default controls
map.addDefaultLayer(SMap.DEF_BASE).enable();
map.addDefaultControls();

let markerLayer = new SMap.Layer.Marker();     /* Vrstva se značkami */
map.addLayer(markerLayer);                          /* Přidat ji do mapy */
markerLayer.enable();                         /* A povolit */

for (let i = 0; i < markers.length; i++) {
    markerLayer.addMarker(markers[i]);
}

const cz = map.computeCenterZoom(coordinates); /* Spočítat pozici mapy tak, aby značky byly vidět */
map.setCenterZoom(cz[0], cz[1]);