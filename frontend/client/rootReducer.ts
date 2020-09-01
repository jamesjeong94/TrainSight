import { combineReducers } from 'redux';
import mainMenuReducer from './menu/state/mainMenuReducer';

const rootReducer = combineReducers({
  mainMenu: mainMenuReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
