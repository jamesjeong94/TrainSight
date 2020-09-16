import React, { useState, MouseEventHandler } from 'react';

import StopInfoWindow from './StopInfoWindow';
import { SubwayStop } from '../MapTypes';

interface MarkerProps {
  stopInfo: SubwayStop;
  color: string;
  lng: number;
  lat: number;
  zoom: number;
}

const Marker: React.FC<MarkerProps> = ({ stopInfo, color, zoom }) => {
  const [showInfo, changeShowInfo] = useState(false);
  const markerClassName = color ? `Marker ${color}` : 'Marker';
  const handleClick = () => {
    changeShowInfo(!showInfo);
  };
  const infoWindow = showInfo ? (
    <StopInfoWindow closeInfoWindow={handleClick} stopInfo={stopInfo} />
  ) : null;

  const stopNameClass = zoom >= 15 ? "stopName" : "hide"

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
      ></div>
      <span className={stopNameClass}>{stopInfo.stopName}</span>
      {infoWindow}
    </>
  );
};

export = Marker;
