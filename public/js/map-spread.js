
    var map = L.map('map').setView([-2.548926, 118.0148634], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    function loadGeoJson() {
        axios.get('/data/mataair_fulltable.geojson')
            .then(function (response) {
                L.geoJSON(response.data, {
                    onEachFeature: function (feature, layer) {
                        if (feature.properties) {
                            var popupContent = `<b>ID:</b> ${feature.properties.ID}<br>` +
                                               `<b>Name:</b> ${feature.properties.Name}<br>` +
                                               `<b>Province:</b> ${feature.properties.provinsi}<br>` +
                                               `<b>District:</b> ${feature.properties.kab_kota}`;
                            layer.bindPopup(popupContent);
                        }
                    },
                    style: function (feature) {
                        return {
                            fillColor: '#4287f5',
                            fillOpacity: 0.5,
                            weight: 2,
                            opacity: 1,
                            color: 'blue'
                        };
                    }
                }).addTo(map);
            })
            .catch(function (error) {
                console.error('Error loading the GeoJSON data: ', error);
            });
    }

    loadGeoJson();

