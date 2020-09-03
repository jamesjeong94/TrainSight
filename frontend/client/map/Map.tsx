import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { SubwayStopMap, SubwayStopList, SubwayStop, StopLatLng } from './MapTypes';
import { mapColorToLine } from '../util/menuUtil';

import Polyline from './components/Polyline';
import Marker from './components/Marker';
import { getLatLngFromStops } from '../util/mapUtil';

type MapProps = {
  getStopsForSubwayLine: (subwayLine: string) => void;
  getCurrentPositionsForSubwayLine: (subwayLine: string) => void;
  subwayLine: string;
  subwayStops: SubwayStopList | [];
  subwayStopsMap: SubwayStopMap | {};
};

const Map: React.FC<MapProps> = ({
  getStopsForSubwayLine,
  subwayLine,
  subwayStops,
  subwayStopsMap,
  getCurrentPositionsForSubwayLine,
}) => {
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [markers, setMarkers] = useState<StopLatLng[]>([]);
  const [mapLoaded, changeMapLoad] = useState(false);

  const createMapOptions = () => {
    return {
      clickableIcons: false,
    };
  };

  useEffect(() => {
    if (subwayLine !== '') {
      getStopsForSubwayLine(subwayLine);
      getCurrentPositionsForSubwayLine(subwayLine);
    }
  }, [subwayLine]);

  useEffect(() => {
    if (subwayStops.length > 0) {
      const stops = getLatLngFromStops(subwayStops);
      setMarkers(stops);
    }
  }, [subwayStops]);

  const onMapLoaded = (map: any, maps: any) => {
    setMap(map);
    setMaps(maps);
    changeMapLoad(true);
  };

  const subwayStopMarkers =
    subwayStops.length > 0
      ? (subwayStops as SubwayStopList).map((stop, index) => {
          return (
            <Marker
              lat={stop.latitude}
              lng={stop.longitude}
              key={index}
              stopInfo={stop}
              color={mapColorToLine[subwayLine]}
            ></Marker>
          );
        })
      : null;

  const GoogleMap = (
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.GMapKey }}
      defaultCenter={{ lat: 40.7128, lng: -74.006 }}
      defaultZoom={12}
      clickableIcons={false}
      options={createMapOptions}
      onGoogleApiLoaded={({ map, maps }: { map: any; maps: any }) => {
        console.log('gmap loaded');
        onMapLoaded(map, maps);
      }}
      hoverDistance={4.5}
    >
      {subwayStopMarkers}
      {mapLoaded && (
        <Polyline
          maps={maps}
          map={map}
          markers={markers}
          options={{
            geodesic: false,
            strokeColor: '#e4e4e4',
            strokeOpacity: 0.7,
            strokeWeight: 3,
          }}
        />
      )}
    </GoogleMapReact>
  );
  return <div style={{ height: '80vh', width: '100%' }}>{GoogleMap}</div>;
};

export = Map;
