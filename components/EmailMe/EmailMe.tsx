import React from 'react';
import { LCDText, LCDButton } from '../utils/LCDComponents';
import { VolumeAppProps } from '../../types/app';
import { AUTHOR_EMAIL } from '../../constants/constants';

const EmailMe: React.FC<VolumeAppProps> = ({ colors, backlightOn, frontlightOn, displayOn }) => {
  const handleEmailClick = () => {
    window.location.href = `mailto:${AUTHOR_EMAIL}?subject=Hello%20from%20your%20website!`;
  };

  return (
    <div
      className="relative p-4 h-full flex flex-col items-center justify-center"
      style={{ backgroundColor: colors.background }}
    >
      <LCDText
        colors={colors}
        backlightOn={backlightOn}
        frontlightOn={frontlightOn}
        displayOn={displayOn}
        className="text-2xl font-bold mb-4"
      >
        Email Me
      </LCDText>
      <LCDButton
        onClick={handleEmailClick}
        colors={colors}
        backlightOn={backlightOn}
        frontlightOn={frontlightOn}
        displayOn={displayOn}
        className="text-lg"
        icon="✉️"
      >
        Send Email
      </LCDButton>
    </div>
  );
};

export default EmailMe;
