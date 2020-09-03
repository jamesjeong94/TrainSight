import React, { useState, MouseEventHandler } from 'react';
import { CurrentPositon, SubwayStop } from '../MapTypes';

type MarkerProps = {
  info: CurrentPositon;
  currentStop?: SubwayStop;
  lng: number;
  lat: number;
};

const Marker: React.FC<MarkerProps> = ({ info }) => {
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
