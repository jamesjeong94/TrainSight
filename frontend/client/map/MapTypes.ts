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

export type CurrentPositon = {
  timeStamp: number;
  direction: string;
  currentStopSequence: number;
  stopId: string;
};

export type SubwayStopList = SubwayStop[];

export interface IGetStopsForSubwayLineAction
  extends Action<'GET_STOPS_FOR_SUBWAY_LINE'> {
  payload: { stops: SubwayStopList; stopsMap: SubwayStopMap };
}

export interface IGetCurrentPositionsForSubwayLineAction
  extends Action<'GET_CURRENT_POSITIONS_FOR_SUBWAY_LINE'> {
  payload: CurrentPositionList;
}

export type CurrentPositionList = CurrentPositon[];

export interface IMapState {
  stops: SubwayStopList | [];
  stopsMap: SubwayStopMap | {};
  currentPositions: CurrentPositionList | [];
}

export type MapActionTypes =
  | IGetStopsForSubwayLineAction
  | IGetCurrentPositionsForSubwayLineAction;
