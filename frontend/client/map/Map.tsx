import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

type MapProps = {
  getStopsForSubwayLine: (subwayLine: string) => void;
  subwayLine: string;
};

const Map: React.FC<MapProps> = ({ getStopsForSubwayLine, subwayLine }) => {
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

  const GoogleMap = (
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.GMapKey }}
      defaultCenter={{ lat: 40.7128, lng: -74.006 }}
      defaultZoom={12}
      onGoogleApiLoaded={({ map, maps }: { map: any; maps: any }) =>
        onMapLoaded(map, maps)
      }
    ></GoogleMapReact>
  );
  return <div style={{ height: '80vh', width: '100%' }}>{GoogleMap}</div>;
};

export = Map;
