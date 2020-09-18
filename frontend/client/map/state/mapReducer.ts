import { IMapState, IGetStopsForSubwayLineAction, MapActionTypes } from '../MapTypes';
import {
  GET_STOPS_FOR_SUBWAY_LINE,
  GET_CURRENT_POSITIONS_FOR_SUBWAY_LINE,
  GET_TRIPS_FOR_SUBWAY_LINE,
} from './mapConstants';

const initialState: IMapState = {
  stops: [],
  stopsMap: {},
  currentPositions: [],
  trips: {},
};

const mapReducer = (state = initialState, action: MapActionTypes): IMapState => {
  switch (action.type) {
    case GET_STOPS_FOR_SUBWAY_LINE:
      return {
        ...state,
        stops: action.payload.stops,
        stopsMap: action.payload.stopsMap,
      };
    case GET_CURRENT_POSITIONS_FOR_SUBWAY_LINE:
      return {
        ...state,
        currentPositions: action.payload,
      };
    case GET_TRIPS_FOR_SUBWAY_LINE:
      return {
        ...state,
        trips: action.payload,
      };
    default:
      return state;
  }
};

export = mapReducer;
