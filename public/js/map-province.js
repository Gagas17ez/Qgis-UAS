var map = L.map('map').setView([-2.548926, 118.0148634], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

var stationWaterQualityLayer, reservoirsLayer, damsLayer, waterSourceLayer, waterDrinkSystemLayer;
var featureColors = {
    "stationWaterQuality": "#FF6633",
    "reservoirs": "#FFB399",
    "dams": "#FF33FF",
    "waterSource": "#FFFF99",
    "waterDrinkSystem": "#00B3E6"
};

function loadLayers() {
    // Clear existing layers
    if (stationWaterQualityLayer) map.removeLayer(stationWaterQualityLayer);
    if (reservoirsLayer) map.removeLayer(reservoirsLayer);
    if (damsLayer) map.removeLayer(damsLayer);
    if (waterSourceLayer) map.removeLayer(waterSourceLayer);
    if (waterDrinkSystemLayer) map.removeLayer(waterDrinkSystemLayer);

    // Load layers based on checkboxes
    if (document.getElementById('showStationWaterQuality').checked) loadWaterStationQualityLayer();
    if (document.getElementById('showReservoirs').checked) loadReservoirsLayer();
    if (document.getElementById('showDams').checked) loadDamsLayer();
    if (document.getElementById('showWaterSource').checked) loadWaterSourceLayer();
    if (document.getElementById('showWaterDrinkSystem').checked) loadWaterDrinkSystemLayer();
}

function loadLayer(url, layerType, onEachFeatureFunction) {
    axios.get(url)
        .then(function (response) {
            var color = featureColors[layerType];
            return L.geoJSON(response.data, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, {
                        radius: 8,
                        fillColor: color,
                        color: "#000",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    });
                },
                onEachFeature: onEachFeatureFunction
            }).addTo(map);
        })
        .catch(function (error) {
            console.error(error);
        });
}

function loadWaterDrinkSystemLayer() {
    loadLayer('/data/sistemAirMinum.geojson', "waterDrinkSystem", function (feature, layer) {
        layer.bindPopup(`Nama: ${feature.properties.nm_balai}<br>Provinsi: ${feature.properties.provinsi}<br>Kota: ${feature.properties.kab_kota}<br>Status: ${feature.properties.sts_pngn}`);
    });
}

function loadWaterSourceLayer() {
    loadLayer('/data/mataair.geojson', "waterSource", function (feature, layer) {
        layer.bindPopup(`Nama: ${feature.properties.nm_balai}<br>Provinsi: ${feature.properties.provinsi}<br>Kota: ${feature.properties.kab_kota}<br>Kode: ${feature.properties.kode_balai}<br>Status: ${feature.properties.kondisi_bangunan}`);
    });
}

function loadWaterStationQualityLayer() {
    loadLayer('/data/stasiunKualitasAir.geojson', "stationWaterQuality", function (feature, layer) {
        layer.bindPopup(`Nama: ${feature.properties.nm_balai}<br>Kota: ${feature.properties.kab_kota}<br>Provinsi: ${feature.properties.provinsi}<br>Kondisi: ${feature.properties.kondisi}<br>Desa: ${feature.properties.nam_dat_des}`);
    });
}

function loadReservoirsLayer() {
    loadLayer('/data/bendungan.geojson', "reservoirs", function (feature, layer) {
        layer.bindPopup(`Nama: ${feature.properties.nm_balai}<br>Kabupaten: ${feature.properties.kab}<br>Provinsi: ${feature.properties.provinsi}<br>Balai: ${feature.properties.kode_balai}<br>Keterangan: ${feature.properties.keterangan_type}`);
    });
}

function loadDamsLayer() {
    loadLayer('/data/dam.geojson', "dams", function (feature, layer) {
        layer.bindPopup(`Nama: ${feature.properties.nm_balai}<br>Kabupaten/Kota: ${feature.properties.kab_kota}<br>Provinsi: ${feature.properties.provinsi}<br>Kode Balai: ${feature.properties.kode_balai}<br>Kondisi Bangunan: ${feature.properties.kondisi_bangunan}`);
    });
}

// Initialize map with all layers
loadLayers();

// Add event listener to checkboxes
var checkboxes = document.querySelectorAll('input[name="displayOption"]');
checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', loadLayers);
});
