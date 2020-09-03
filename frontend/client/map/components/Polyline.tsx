import React, { useEffect, useState } from 'react';

interface PolylineProps {
  markers: any;
  map: any;
  maps: any;
  options: any;
}

const Polyline: React.FC<PolylineProps> = ({ markers, map, maps }) => {
  const [polyline, setPolyline] = useState<any>(null);

  const renderPolyline = () => {
    if (polyline !== null) {
      polyline.setMap(null);
    }
    const nonGeodesicPolyline = new maps.Polyline({
      path: markers,
      geodesic: false,
      strokeColor: 'black',
      strokeOpacity: 1,
      strokeWeight: 5,
    });
    setPolyline(nonGeodesicPolyline);
    nonGeodesicPolyline.setMap(map);
  };
  useEffect(() => {
    renderPolyline();
  }, [markers]);

  return null;
};

export = Polyline;
