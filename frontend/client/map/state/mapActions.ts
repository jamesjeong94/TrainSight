import axios from 'axios';
import { Dispatch, Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { GET_STOPS_FOR_SUBWAY_LINE } from './mapConstants';

export const getStopsForSubwayLine = (subwayLine: string) => {
  return (dispatch: ThunkDispatch<any, any, Action>): Promise<void> => {
    return axios({
      baseURL: '',
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
