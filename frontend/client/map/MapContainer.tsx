import { connect, ConnectedProps } from 'react-redux';
import React from 'react';
import Map from './Map';
import { Dispatch } from 'redux';
import { RootState } from '../rootReducer';

const mapStateToProps = (state: RootState) => {
  subwayLine: state.mainMenu.subwayLine;
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MapContainerProps = PropsFromRedux;

const MapContainer: React.FC<MapContainerProps> = () => {
  return <Map></Map>;
};

export = connector(Map);
