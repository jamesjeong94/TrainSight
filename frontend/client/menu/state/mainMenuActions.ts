import { IChangeSubwayLineAction } from '../MainMenuTypes';
import { CHANGE_SUBWAY_LINE } from '../../constants/mainMenu';

export const changeSubwayLine = (subwayLine: String): IChangeSubwayLineAction => {
  return {
    type: CHANGE_SUBWAY_LINE,
    payload: subwayLine,
  };
};
