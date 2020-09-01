import axios from 'axios';
import { Dispatch } from 'redux';

export const getStopsForSubwayLine = (subwayLine: string) => {
  return (dispatch: Dispatch) => {
    axios({
      method: 'get',
      url: process.env.HOST + '/stops',
    }).then(({ data }) => {
      dispatch({
        type: 'something',
        payload: data,
      });
    });
  };
};
