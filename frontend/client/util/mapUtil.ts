import { SubwayStopList } from '../map/MapTypes';

export const getLatLngFromStops = (stops: SubwayStopList) => {
  return stops.map((stop) => {
    return {
      lat: stop.latitude,
      lng: stop.longitude,
    };
  });
};
