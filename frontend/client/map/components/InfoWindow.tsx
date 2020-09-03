import React from 'react';
import { SubwayStop } from '../MapTypes';

interface InfoWindowProps {
  closeInfoWindow: () => void;
  stopInfo: SubwayStop;
}

const InfoWindow: React.FC<InfoWindowProps> = ({ stopInfo, closeInfoWindow }) => {
  return (
    <div className="infoWindow">
      {/* <button className="center infoBtn" onClick={closeInfoWindow}>
        X
      </button> */}
      <p>{stopInfo.stopName}</p>
      <p>{stopInfo.connectedLines.join(' ')}</p>
    </div>
  );
};

export = InfoWindow;
