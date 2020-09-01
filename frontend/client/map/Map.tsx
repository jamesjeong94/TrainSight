import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

type MapProps = {
  getStopsForSubwayLine: (subwayLine: string) => void;
  subwayLine: string;
};

const Map: React.FC<MapProps> = ({ getStopsForSubwayLine, subwayLine }) => {
  useEffect(() => {
    if (subwayLine !== '') {
      getStopsForSubwayLine(subwayLine);
    }
  }, [subwayLine]);

  const map = (
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.GMapKey }}
      defaultCenter={{ lat: 40.7128, lng: -74.006 }}
      defaultZoom={12}
    ></GoogleMapReact>
  );
  return <div style={{ height: '80vh', width: '100%' }}>{map}</div>;
};

export = Map;
