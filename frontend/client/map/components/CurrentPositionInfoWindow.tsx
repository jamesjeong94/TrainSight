import React from 'react';

import { getRelativeTimeFromSeconds } from "../../util/mapUtil"
import { CurrentPositon } from '../MapTypes';

interface CurrentPositionInfoWindowProps {
  info: CurrentPositon;
  timeDiff: number;
}

const CurrentPositionInfoWindow: React.FC<CurrentPositionInfoWindowProps> = ({ info, timeDiff }) => {

  const direction = info.direction === "N" ? "North" : "South"

  return (
    <div className="infoWindow">
      <p>TrainMarkerstuff</p>
      <p>{JSON.stringify(info)}</p>
      <p>{direction}</p>
      <p>{getRelativeTimeFromSeconds(timeDiff)}</p>
    </div>
  );
};
export = CurrentPositionInfoWindow;
