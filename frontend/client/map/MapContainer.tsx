import { connect, ConnectedProps } from 'react-redux';
import React from 'react';
import Map from './Map';
import { Dispatch, Action } from 'redux';
import { RootState } from '../rootReducer';
import { ThunkDispatch } from 'redux-thunk';

import {
  getStopsForSubwayLine,
  getCurrentPositionsForSubwayLine,
} from './state/mapActions';

const mapStateToProps = (state: RootState) => {
  return {
    subwayLine: state.mainMenu.subwayLine,
    subwayStops: state.map.stops,
    subwayStopsMap: state.map.stopsMap,
    trainPositions: state.map.currentPositions,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Action>) => {
  return {
    getStopsForSubwayLine: (subwayLine: string) => {
      dispatch(getStopsForSubwayLine(subwayLine));
    },
    getCurrentPositionsForSubwayLine: (subwayLine: string) => {
      dispatch(getCurrentPositionsForSubwayLine(subwayLine));
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MapContainerProps = PropsFromRedux;

const MapContainer: React.FC<MapContainerProps> = ({
  getStopsForSubwayLine,
  subwayLine,
  subwayStops,
  subwayStopsMap,
  trainPositions,
  getCurrentPositionsForSubwayLine,
}) => {
  return (
    <Map
      getStopsForSubwayLine={getStopsForSubwayLine}
      subwayLine={subwayLine}
      subwayStops={subwayStops}
      subwayStopsMap={subwayStopsMap}
      getCurrentPositionsForSubwayLine={getCurrentPositionsForSubwayLine}
      trainPositions={trainPositions}
    ></Map>
  );
};

export = connector(Map);
