import React from 'react';

import { getRelativeTimeFromSeconds } from "../../util/mapUtil"
import { CurrentPositon, SubwayStop } from '../MapTypes';

interface CurrentPositionInfoWindowProps {
  info: CurrentPositon;
  currentStop?: SubwayStop;
  nextStop?: SubwayStop;
  timeDiff: number;
}

const CurrentPositionInfoWindow: React.FC<CurrentPositionInfoWindowProps> = ({ info, timeDiff, currentStop }) => {

  const direction = info.direction === "N" ? "North" : "South"

  return (
    <div className="infoWindow">
      <p>{JSON.stringify(info)}</p>
      <p>Heading towards {currentStop?.stopName}</p>
      <p>Departed {getRelativeTimeFromSeconds(timeDiff)}</p>
      <p>{direction}</p>
    </div>
  );
};
export = CurrentPositionInfoWindow;
