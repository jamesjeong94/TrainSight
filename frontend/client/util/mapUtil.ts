import { SubwayStopList } from '../map/MapTypes';

export const getLatLngFromStops = (stops: SubwayStopList) => {
  return stops.map((stop) => {
    return {
      lat: stop.latitude,
      lng: stop.longitude,
    };
  });
};

//lat, lng to distance in ft
export const currentLatLng = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  time: number
) => {
  if (lat1 == lat2 && lon1 == lon2) {
    return {
      lat: lat1,
      lng: lon1,
    };
  }
  const deltaLat = lat1 - lat2;
  const deltaLon = lon1 - lon2;
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  const traveledDistance = (time * 30) / 3600;
  const ratio = traveledDistance / dist;
  return {
    lat: lat1 + deltaLat * ratio,
    lng: lon1 + deltaLon * ratio,
  };
};
