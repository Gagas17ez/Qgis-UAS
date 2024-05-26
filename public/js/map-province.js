var map = L.map('map').setView([-2.548926, 118.0148634], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

var stationWaterQualityLayer, reservoirsLayer, damsLayer, waterSourceLayer, waterDrinkSystemLayer, polygonProvinceLayer;

var colors = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#e6f5d0', '#b8e186', '#7fbc41', '#01665e', '#4d9221', '#35978f', '#f5f5f5',];

function getColor(index) {
    return colors[index % colors.length];
}

var featureColors = {
    "stationWaterQuality": "#FF6633",
    "reservoirs": "#FFB399",
    "dams": "#FF33FF",
    "waterSource": "#FFFF99",
    "waterDrinkSystem": "#00B3E6"
};

function loadLayers() {
    if (stationWaterQualityLayer && !document.getElementById('showStationWaterQuality').checked) {
        map.removeLayer(stationWaterQualityLayer);
        stationWaterQualityLayer = null;
    }
    if (reservoirsLayer && !document.getElementById('showReservoirs').checked) {
        map.removeLayer(reservoirsLayer);
        reservoirsLayer = null;
    }
    if (damsLayer && !document.getElementById('showDams').checked) {
        map.removeLayer(damsLayer);
        damsLayer = null;
    }
    if (waterSourceLayer && !document.getElementById('showWaterSource').checked) {
        map.removeLayer(waterSourceLayer);
        waterSourceLayer = null;
    }
    if (waterDrinkSystemLayer && !document.getElementById('showWaterDrinkSystem').checked) {
        map.removeLayer(waterDrinkSystemLayer);
        waterDrinkSystemLayer = null;
    }
    if (polygonProvinceLayer && !document.getElementById('showPolygonProvince').checked) {
        map.removeLayer(polygonProvinceLayer);
        polygonProvinceLayer = null;
    }

    if (document.getElementById('showStationWaterQuality').checked && !stationWaterQualityLayer) loadWaterStationQualityLayer();
    if (document.getElementById('showReservoirs').checked && !reservoirsLayer) loadReservoirsLayer();
    if (document.getElementById('showDams').checked && !damsLayer) loadDamsLayer();
    if (document.getElementById('showWaterSource').checked && !waterSourceLayer) loadWaterSourceLayer();
    if (document.getElementById('showWaterDrinkSystem').checked && !waterDrinkSystemLayer) loadWaterDrinkSystemLayer();
    if (document.getElementById('showPolygonProvince').checked && !polygonProvinceLayer) loadPolygonProvinceLayer();
}

function loadPolygonProvinceLayer() {
    axios.get('/data/polygon-province.geojson')
        .then(function (response) {
            polygonProvinceLayer = L.geoJSON(response.data, {
                style: function (feature) {
                    var fillColor = getColor(feature.properties.ID);
                    return {
                        fillColor: fillColor,
                        fillOpacity: 0.5,
                        color: '#000',
                        weight: 1,
                        opacity: 1
                    };
                },
                onEachFeature: function (feature, layer) {
                    if (feature.properties && feature.properties.Provinsi) {
                        var popupContent = "Provinsi<br><b>Provinsi:</b> " + feature.properties.Provinsi;
                        layer.bindPopup(popupContent);
                    }
                }
            }).addTo(map);
        })
        .catch(function (error) {
            console.error(error);
        });
}

function loadWaterStationQualityLayer() {
    axios.get('/data/stasiunKualitasAir.geojson')
        .then(function (response) {
            stationWaterQualityLayer = L.geoJSON(response.data, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, {
                        radius: 8,
                        fillColor: featureColors["stationWaterQuality"],
                        color: "#000",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    });
                },
                onEachFeature: function (feature, layer) {
                    layer.bindPopup(`Stasiun Kualitas Air<br>Nama: ${feature.properties.nm_balai}<br>Kota: ${feature.properties.kab_kota}<br>Provinsi: ${feature.properties.provinsi}<br>Kondisi: ${feature.properties.kondisi}<br>Desa: ${feature.properties.nam_dat_des}`);
                }
            }).addTo(map);
        })
        .catch(function (error) {
            console.error(error);
        });
}

function loadReservoirsLayer() {
    axios.get('/data/bendungan.geojson')
        .then(function (response) {
            reservoirsLayer = L.geoJSON(response.data, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, {
                        radius: 8,
                        fillColor: featureColors["reservoirs"],
                        color: "#000",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    });
                },
                onEachFeature: function (feature, layer) {
                    layer.bindPopup(`Bendungan Air<br>Nama: ${feature.properties.nm_balai}<br>Kabupaten: ${feature.properties.kab}<br>Provinsi: ${feature.properties.provinsi}<br>Balai: ${feature.properties.kode_balai}<br>Keterangan: ${feature.properties.keterangan_type}`);
                }
            }).addTo(map);
        })
        .catch(function (error) {
            console.error(error);
        });
}

function loadDamsLayer() {
    axios.get('/data/dam.geojson')
        .then(function (response) {
            damsLayer = L.geoJSON(response.data, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, {
                        radius: 8,
                        fillColor: featureColors["dams"],
                        color: "#000",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    });
                },
                onEachFeature: function (feature, layer) {
                    layer.bindPopup(`Stasiun Dam Air<br>Nama: ${feature.properties.nm_balai}<br>Kabupaten/Kota: ${feature.properties.kab_kota}<br>Provinsi: ${feature.properties.provinsi}<br>Kode Balai: ${feature.properties.kode_balai}<br>Kondisi Bangunan: ${feature.properties.kondisi_bangunan}`);
                }
            }).addTo(map);
        })
        .catch(function (error) {
            console.error(error);
        });
}

function loadWaterSourceLayer() {
    axios.get('/data/mataair.geojson')
        .then(function (response) {
            waterSourceLayer = L.geoJSON(response.data, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, {
                        radius: 8,
                        fillColor: featureColors["waterSource"],
                        color: "#000",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    });
                },
                onEachFeature: function (feature, layer) {
                    layer.bindPopup(`Stasiun Mata Air<br>Nama: ${feature.properties.nm_balai}<br>Provinsi: ${feature.properties.provinsi}<br>Kota: ${feature.properties.kab_kota}<br>Kode: ${feature.properties.kode_balai}<br>Status: ${feature.properties.kondisi_bangunan}`);
                }
            }).addTo(map);
        })
        .catch(function (error) {
            console.error(error);
        });
}

function loadWaterDrinkSystemLayer() {
    axios.get('/data/sistemAirMinum.geojson')
        .then(function (response) {
            waterDrinkSystemLayer = L.geoJSON(response.data, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, {
                        radius: 8,
                        fillColor: featureColors["waterDrinkSystem"],
                        color: "#000",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    });
                },
                onEachFeature: function (feature, layer) {
                    layer.bindPopup(`Stasiun Sistem Air Minum<br>Nama: ${feature.properties.nm_balai}<br>Provinsi: ${feature.properties.provinsi}<br>Kota: ${feature.properties.kab_kota}<br>Status: ${feature.properties.sts_pngn}`);
                }
            }).addTo(map);
        })
        .catch(function (error) {
            console.error(error);
        });
}

// Initialize map with all layers
loadLayers();

// Add event listener to checkboxes
var checkboxes = document.querySelectorAll('input[name="displayOption"]');
checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', loadLayers);
});