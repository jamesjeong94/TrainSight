import { Action } from 'redux';

export interface IChangeSubwayLineAction extends Action<'CHANGE_SUBWAY_LINE'> {
  payload: String;
}

export type MainMenuActionType = IChangeSubwayLineAction;

export interface IMainMenuState {
  subwayLine: String;
}
