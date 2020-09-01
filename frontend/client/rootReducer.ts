import { combineReducers } from 'redux';
import mainMenuReducer from './menu/state/mainMenuReducer';
import mapReducer from './map/state/mapReducer';

const rootReducer = combineReducers({
  mainMenu: mainMenuReducer,
  map: mapReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
