<!DOCTYPE html>
<html>
<head>
    <title>Map Overview</title>
    <meta charset="utf-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
</head>
<body>
<div id="map" style="width: 600px; height: 400px"></div>

<script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
<script>

    var southWest = L.latLng(<%= south %>, <%= west %>),
      northEast = L.latLng(<%= north %>, <%= east %>),
      bounds = L.latLngBounds(southWest, northEast);

    var map = L.map('map', {
        center: [<%= south %>,<%= west %>],
        zoom: <%= mapZoom %>,
        attributionControl: false,
        maxBounds: bounds,
    });

    L.tileLayer('./{z}/{x}/{y}.png', {
        minZoom: <%= minZoom %>,
        maxZoom: <%= maxZoom %>,
        tms: true,
        detectRetina: true,
        bounds: bounds
    }).addTo(map);

    function onMapClick(e) {
        console.log(e.latlng.toString() + " @ " + e.target.getZoom() + " zoom");
    }

    map.on('click', onMapClick);

</script>
</body>
</html>
