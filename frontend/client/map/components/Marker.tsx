import React, { useState, MouseEventHandler } from 'react';

import StopInfoWindow from './StopInfoWindow';
import { SubwayStop } from '../MapTypes';

interface MarkerProps {
  stopInfo: SubwayStop;
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
      ><p>{stopInfo.stopName}</p></div>
      {infoWindow}
    </>
  );
};

export = Marker;
