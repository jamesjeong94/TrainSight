import React, { MouseEvent } from 'react';
import { mapColorToLine } from '../../util/menuUtil';

interface MainMenuProps {}

const MainMenu: React.FC<MainMenuProps> = ({}) => {
  const handleClick = (event: MouseEvent) => {
    console.log(event.currentTarget.id);
  };

  const lines = Object.keys(mapColorToLine).map((line: string, index: number) => {
    return (
      <div
        key={index}
        onClick={handleClick}
        id={line}
        className={`${mapColorToLine[line]} stopBtn`}
      >
        <p>{line}</p>
      </div>
    );
  });

  return (
    <div>
      <div className="buttonRow">{lines}</div>
      main menu
    </div>
  );
};

export = MainMenu;
