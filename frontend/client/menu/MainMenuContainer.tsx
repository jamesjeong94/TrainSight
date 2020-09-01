import { connect, ConnectedProps } from 'react-redux';
import React from 'react';
import MainMenu from './MainMenu';
import { Dispatch } from 'redux';
import { changeSubwayLine } from './state/mainMenuActions';

const mapStateToProps = null;

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeSubwayLine: (subwayLine: string) => {
      dispatch(changeSubwayLine(subwayLine));
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type MainMenuContainerProps = PropsFromRedux;

const MainMenuContainer: React.FC<MainMenuContainerProps> = () => {
  return <MainMenu changeSubwayLine={changeSubwayLine}></MainMenu>;
};

export = connector(MainMenu);
