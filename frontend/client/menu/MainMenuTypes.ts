import { Action } from 'redux';

export interface IChangeSubwayLineAction extends Action<'CHANGE_SUBWAY_LINE'> {
  payload: string;
}

export type MainMenuActionType = IChangeSubwayLineAction;

export interface IMainMenuState {
  subwayLine: string;
}
