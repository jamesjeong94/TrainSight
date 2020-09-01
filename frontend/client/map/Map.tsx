import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { SubwayStopMap, SubwayStopList, SubwayStop } from './MapTypes';
import { mapColorToLine } from '../util/menuUtil';
import Marker from './components/Marker';

type MapProps = {
  getStopsForSubwayLine: (subwayLine: string) => void;
  subwayLine: string;
  subwayStops: SubwayStopList | [];
  subwayStopsMap: SubwayStopMap | {};
};

const Map: React.FC<MapProps> = ({
  getStopsForSubwayLine,
  subwayLine,
  subwayStops,
  subwayStopsMap,
}) => {
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [mapLoaded, changeMapLoad] = useState(false);

  useEffect(() => {
    if (subwayLine !== '') {
      getStopsForSubwayLine(subwayLine);
    }
  }, [subwayLine]);

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
      onGoogleApiLoaded={({ map, maps }: { map: any; maps: any }) =>
        onMapLoaded(map, maps)
      }
    >
      {subwayStopMarkers}
    </GoogleMapReact>
  );
  return <div style={{ height: '80vh', width: '100%' }}>{GoogleMap}</div>;
};

export = Map;
