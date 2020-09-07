import React, { useState, MouseEventHandler } from 'react';

import StopInfoWindow from './StopInfoWindow';

interface MarkerProps {
  stopInfo: any;
  color: string;
  lng: number;
  lat: number;
}

const Marker: React.FC<MarkerProps> = ({ stopInfo, color }) => {
  const [showInfo, changeShowInfo] = useState(false);
  const markerClassName = color ? `Marker ${color}` : 'Marker';
  const handleClick = () => {
    changeShowInfo(!showInfo);
  };
  const infoWindow = showInfo ? (
    <StopInfoWindow closeInfoWindow={handleClick} stopInfo={stopInfo} />
  ) : null;
  return (
    <>
      <div
        className={markerClassName}
        style={{ cursor: 'pointer' }}
        title={name}
        onClick={handleClick}
        onMouseEnter={() => {
          changeShowInfo(true);
        }}
        onMouseLeave={() => {
          changeShowInfo(false);
        }}
      />
      {infoWindow}
    </>
  );
};

export = Marker;
