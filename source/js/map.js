function initMap() {
  var customMapType = new google.maps.StyledMapType([
      {
        stylers: [
          {hue: '#74a264'},
          {visibility: 'simplified'},
          {gamma: 0.5},
          {weight: 0.5},
          {scrollwheel: false},
        ]
      },
      {
        featureType: 'water',
        stylers: [{color: '#74a264'}]
      }
    ], {
      name: 'Custom Style'
  });
  var customMapTypeId = 'custom_style';

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 50.4501, lng: 30.4000},
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
    },
    disableDefaultUI: true,
    scrollwheel: false
  });

  map.mapTypes.set(customMapTypeId, customMapType);
  map.setMapTypeId(customMapTypeId);
}