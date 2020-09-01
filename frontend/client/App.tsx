import React from 'react';
import Map from './map/Map';
import MainMenuContainer from './menu/MainMenuContainer';
import MapContainer from './map/MapContainer';

const App = () => {
  return (
    <div>
      <MainMenuContainer></MainMenuContainer>
      <MapContainer></MapContainer>
    </div>
  );
};

export default App;
