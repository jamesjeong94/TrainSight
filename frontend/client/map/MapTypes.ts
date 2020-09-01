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
  [stopId: string]: SubwayStop;
};

export type SubwayStopList = {
  subwayStops: SubwayStop[];
};

export interface IGetStopsForSubwayLineAction
  extends Action<'GET_STOPS_FOR_SUBWAY_LINE'> {
  payload: { stops: SubwayStopList; stopsMap: SubwayStopMap };
}

export interface IGetCurrentPositionsForSubwayLineAction
  extends Action<'GET_CURRENT_POSITIONS_FOR_SUBWAY_LINE'> {
  payload: {};
}

export interface IMapState {
  stops: SubwayStopList | [];
  stopsMap: SubwayStopMap | {};
}

export type MapActionTypes =
  | IGetStopsForSubwayLineAction
  | IGetCurrentPositionsForSubwayLineAction;
