export const getDirectionsUrl = (currentLat, currentLng, desLat, desLng) => {
  var url = 'https://www.google.com/maps/dir/?api=1';
  var origin = '&origin=' + currentLat + ',' + currentLng;
  var destination = '&destination=' + desLat + ',' + desLng;
  var navURL = new URL(url + origin + destination);

  return navURL;
};
