import React from 'react';

interface InfoWindowProps {
  closeInfoWindow: () => void;
  stopInfo: any;
}

const InfoWindow: React.FC<InfoWindowProps> = ({ stopInfo, closeInfoWindow }) => {
  return (
    <div className="infoWindow">
      <div className="bold">{stopInfo['Stop Name']}</div>
      <button className="center infoBtn" onClick={closeInfoWindow}>
        X
      </button>
    </div>
  );
};

export = InfoWindow;
