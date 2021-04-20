---
title: ambassador map JS
---
var mymap = L.map('mapid');
var markerIcon = L.icon({
    iconUrl: '{{site.baseurl}}/assets/images/marker.png',
    iconRetinaUrl: '{{site.baseurl}}/assets/images/marker-2x.png',
    iconSize:     [41, 41], // size of the icon
    iconAnchor:   [10, 38], // point of the icon which will correspond to marker's location
    popupAnchor:  [10, -20] // point from which the popup should open relative to the iconAnchor
    });
var map = L.map('map');


L.tileLayer('https://api.tiles.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoid2djdiIsImEiOiJjazNocnhzNGEwMHFhM2VuMW8zbmx4aDZkIn0.I1noSw_DI9HJ8YXrz6tdng'
}).addTo(mymap);
mymap.scrollWheelZoom.disable()

render.features.forEach(function(feature){
    console.log(feature);

      L.geoJson(feature, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: markerIcon});
        },
        onEachFeature: onEachFeature
      }).addTo(mymap);
    });

    function onEachFeature(feature, layer) {
      // does this feature have a property named popupContent?
      if (feature.properties) {
          layer.bindPopup(function(){
            var userstring = "{{site.baseurl}}/"+feature.properties.username;
            var popupstring = feature.properties.shortname;
            return "<a class='a-nodecoration' href="+userstring+"><div class='w-100'><img src='"+feature.properties.avatar+"' class='map-avatar'/></div>"+popupstring+"</a>";
          });
      }
  }
