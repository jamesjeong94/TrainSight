import { IChangeSubwayLineAction } from '../MainMenuTypes';
import { CHANGE_SUBWAY_LINE } from './mainMenuConstants';

export const changeSubwayLine = (subwayLine: string): IChangeSubwayLineAction => {
  return {
    type: CHANGE_SUBWAY_LINE,
    payload: subwayLine,
  };
};
