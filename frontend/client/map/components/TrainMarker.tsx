import React, { useState, MouseEventHandler } from 'react';
import { CurrentPositon, SubwayStop } from '../MapTypes';

type MarkerProps = {
  info: CurrentPositon;
  currentStop?: SubwayStop;
  lng: number;
  lat: number;
  nextStop?: SubwayStop | null;
};

const Marker: React.FC<MarkerProps> = ({ info, lng, lat, nextStop, currentStop }) => {
  const [showInfo, changeShowInfo] = useState(false);

  const handleClick = () => {
    changeShowInfo(!showInfo);
  };

  return (
    <>
      <div className="trainMarker" style={{ cursor: 'pointer' }} onClick={handleClick} />
    </>
  );
};

export = Marker;
