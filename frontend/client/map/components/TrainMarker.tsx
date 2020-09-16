import React, { useState, MouseEventHandler } from 'react';
import { CurrentPositon, SubwayStop } from '../MapTypes';

import CurrentPositionInfoWindow from './CurrentPositionInfoWindow';

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


  const timeDifference = new Date().getTime() / 1000 - info.timeStamp;


  const infoWindow = showInfo ? (
    <CurrentPositionInfoWindow info={info} timeDiff={timeDifference} />
  ) : null;

  return (
    <>
      <div className="trainMarker" style={{ cursor: 'pointer' }} onClick={handleClick}
        onMouseEnter={() => {
          changeShowInfo(true);
        }}
        onMouseLeave={() => {
          changeShowInfo(false);
        }} />
      {infoWindow}
    </>
  );
};

export = Marker;
