import React from 'react';
import { colorSchemes } from '../constants/colorSchemes';
import { AppIconProps } from '../types/app';
import { LCDIconDisplay, LCDText } from './utils/LCDComponents';

const AppIcon: React.FC<AppIconProps> = ({
  icon,
  title,
  onClick,
  colorScheme,
  displayOn,
  backlightOn,
  frontlightOn,
}) => {
  const colors = colorSchemes[colorScheme];

  return (
    <div
      className="flex flex-col items-center cursor-pointer rounded p-1 duration-300 group hover:bg-opacity-20"
      onClick={onClick}
    >
      <LCDIconDisplay
        icon={icon}
        colors={colors}
        displayOn={displayOn}
        backlightOn={backlightOn}
        frontlightOn={frontlightOn}
      />
      <LCDText
        colors={colors}
        displayOn={displayOn}
        backlightOn={backlightOn}
        frontlightOn={frontlightOn}
        size="md"
        className="text-center"
      >
        {title}
      </LCDText>
    </div>
  );
};

export default AppIcon;
