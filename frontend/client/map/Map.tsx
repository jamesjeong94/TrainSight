import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import {
  SubwayStopMap,
  SubwayStopList,
  SubwayStop,
  StopLatLng,
  CurrentPositionList,
  CurrentPositon,
} from './MapTypes';
import { mapColorToLine } from '../util/menuUtil';

import Polyline from './components/Polyline';
import Marker from './components/Marker';
import TrainMarker from './components/TrainMarker';

import { getLatLngFromStops, currentLatLng } from '../util/mapUtil';

type MapProps = {
  getStopsForSubwayLine: (subwayLine: string) => void;
  getCurrentPositionsForSubwayLine: (subwayLine: string) => void;
  subwayLine: string;
  subwayStops: SubwayStopList;
  subwayStopsMap: SubwayStopMap;
  trainPositions: CurrentPositionList;
};

const Map: React.FC<MapProps> = ({
  getStopsForSubwayLine,
  subwayLine,
  subwayStops,
  subwayStopsMap,
  trainPositions,
  getCurrentPositionsForSubwayLine,
}) => {
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [markers, setMarkers] = useState<StopLatLng[]>([]);
  const [mapLoaded, changeMapLoad] = useState(false);
  const [zoom, setZoom] = useState(12)

  const createMapOptions = () => {
    return {
      clickableIcons: false,
    };
  };

  useEffect(() => {
    if (subwayLine !== '') {
      getStopsForSubwayLine(subwayLine);
      getCurrentPositionsForSubwayLine(subwayLine);
    }
  }, [subwayLine]);

  useEffect(() => {
    if (subwayStops.length > 0) {
      const stops = getLatLngFromStops(subwayStops);
      setMarkers(stops);
    }
  }, [subwayStops]);

  const onMapLoaded = (map: any, maps: any) => {
    setMap(map);
    setMaps(maps);
    changeMapLoad(true);
  };

  const subwayStopMarkers =
    subwayStops.length > 0
      ? (subwayStops as SubwayStopList).map((stop, index) => {
        return (
          <Marker
            lat={stop.latitude}
            lng={stop.longitude}
            key={index}
            stopInfo={stop}
            color={mapColorToLine[subwayLine]}
            zoom={zoom}
          ></Marker>
        );
      })
      : null;

  const trainMarkers =
    trainPositions.length > 0
      ? (trainPositions as CurrentPositionList).map(
        (position: CurrentPositon, index: number) => {
          const { direction, stopID } = position;
          const currentStop = subwayStopsMap[stopID];
          if (currentStop !== undefined) {
            const currentStopName = currentStop.stopName;
            const currentIndexOfStop = subwayStops.findIndex(
              (stop) => stop.stopName === currentStopName
            );
            const nextIndex =
              direction === 'N' ? currentIndexOfStop + 1 : currentIndexOfStop - 1;
            const nextStop = subwayStops[nextIndex] ? subwayStops[nextIndex] : null;
            let lat = currentStop.latitude;
            let lng = currentStop.longitude;
            const timeDifference = new Date().getTime() / 1000 - position.timeStamp;
            if (nextStop !== null) {
              const newCoords = currentLatLng(
                lat,
                lng,
                nextStop.latitude,
                nextStop.longitude,
                timeDifference
              );

              lat = newCoords.lat;
              lng = newCoords.lng;
            } else {
              console.log('wrong direction, start from bottom');
            }

            return (
              <TrainMarker
                info={position}
                lat={lat}
                lng={lng}
                nextStop={nextStop}
                currentStop={currentStop}
              ></TrainMarker>
            );
          }
        }
      )
      : null;

  const handleZoomChange = (e: any) => {
    if (e.zoom != zoom) {
      setZoom(e.zoom)
      console.log(e)

    }
  }


  const GoogleMap = (
    <GoogleMapReact
      onChange={handleZoomChange}
      bootstrapURLKeys={{ key: process.env.GMapKey }}
      defaultCenter={{ lat: 40.7128, lng: -74.006 }}
      defaultZoom={12}
      zoom={zoom}
      clickableIcons={false}
      options={createMapOptions}
      onGoogleApiLoaded={({ map, maps }: { map: any; maps: any }) => {
        console.log('gmap loaded');
        onMapLoaded(map, maps);
      }}
      hoverDistance={4.5}
    >
      {subwayStopMarkers}
      {mapLoaded && (
        <Polyline
          maps={maps}
          map={map}
          markers={markers}
          options={{
            geodesic: false,
            strokeColor: '#e4e4e4',
            strokeOpacity: 0.7,
            strokeWeight: 3,
          }}
        />
      )}
      {trainMarkers}
    </GoogleMapReact>
  );
  return <div style={{ height: '80vh', width: '100%' }}>{GoogleMap}</div>;
};

export = Map;
