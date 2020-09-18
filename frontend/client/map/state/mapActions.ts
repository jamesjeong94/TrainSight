import axios from 'axios';
import { Dispatch, Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { batch } from 'react-redux';
import {
  GET_STOPS_FOR_SUBWAY_LINE,
  GET_CURRENT_POSITIONS_FOR_SUBWAY_LINE,
  GET_TRIPS_FOR_SUBWAY_LINE,
} from './mapConstants';
import { createMapForTrips } from '../../util/mapUtil';

export const getStopsForSubwayLine = (subwayLine: string) => {
  return (dispatch: ThunkDispatch<any, any, Action>): Promise<void> => {
    return axios({
      method: 'get',
      params: {
        subwayline: subwayLine,
      },
      url: process.env.API + '/stops',
    }).then(({ data }) => {
      dispatch({
        type: GET_STOPS_FOR_SUBWAY_LINE,
        payload: data,
      });
    });
  };
};

export const getCurrentPositionsForSubwayLine = (subwayLine: string) => {
  return (dispatch: ThunkDispatch<any, any, Action>): Promise<void> => {
    return axios({
      method: 'get',
      url: process.env.API + '/stopsLive',
      params: {
        subwayline: subwayLine,
      },
    }).then(({ data }) => {
      batch(() => {
        dispatch({
          type: GET_CURRENT_POSITIONS_FOR_SUBWAY_LINE,
          payload: data,
        });
        dispatch({
          type: GET_TRIPS_FOR_SUBWAY_LINE,
          payload: createMapForTrips(data),
        });
      });
    });
  };
};
