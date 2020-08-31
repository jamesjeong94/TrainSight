import React from 'react';
import GoogleMapReact from 'google-map-react';

const Map = () => {
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
