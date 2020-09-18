import { GET_STOPS_FOR_SUBWAY_LINE } from './state/mapConstants';
import { Action } from 'redux';

export type SubwayStop = {
  stopName: string;
  borough: string;
  connectedLines: string[];
  latitude: number;
  longitude: number;
  northDirection: string;
  southDirection: string;
  direction: string;
  stopID: string;
};

export type SubwayStopMap = {
  [stopID: string]: SubwayStop;
};

export type CurrentPositon = {
  timeStamp: number;
  direction: string;
  currentStopSequence: number;
  stopID: string;
  tripID: string;
};

export type StopLatLng = {
  lat: number;
  lng: number;
};

export type TripInfoMap = {
  [tripID: string]: CurrentPositon;
};

export type SubwayStopList = SubwayStop[];

/*
Actions
*/

export interface IGetStopsForSubwayLineAction
  extends Action<'GET_STOPS_FOR_SUBWAY_LINE'> {
  payload: { stops: SubwayStopList; stopsMap: SubwayStopMap };
}

export interface IGetCurrentPositionsForSubwayLineAction
  extends Action<'GET_CURRENT_POSITIONS_FOR_SUBWAY_LINE'> {
  payload: CurrentPositionList;
}

export interface IGetTripsForSubwayLineAction
  extends Action<'GET_TRIPS_FOR_SUBWAY_LINE'> {
  payload: TripInfoMap;
}

export type MapActionTypes =
  | IGetStopsForSubwayLineAction
  | IGetCurrentPositionsForSubwayLineAction
  | IGetTripsForSubwayLineAction;

export type CurrentPositionList = CurrentPositon[];

export interface IMapState {
  stops: SubwayStopList;
  stopsMap: SubwayStopMap;
  currentPositions: CurrentPositionList;
  trips: TripInfoMap;
}
