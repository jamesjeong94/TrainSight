import { CHANGE_SUBWAY_LINE } from './mainMenuConstants';
import { MainMenuActionType, IMainMenuState } from '../MainMenuTypes';

const initialState: IMainMenuState = {
  subwayLine: '',
};

const mainMenuReducer = (
  state = initialState,
  action: MainMenuActionType
): IMainMenuState => {
  switch (action.type) {
    case CHANGE_SUBWAY_LINE:
      return {
        ...state,
        subwayLine: action.payload,
      };
    default:
      return state;
  }
};

export = mainMenuReducer;
