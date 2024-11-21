import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { LCDButton, LCDText } from '../utils/LCDComponents';
import { PlayerControlsProps } from '../../types/app';

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onPrevious,
  onNext,
  colors,
  displayOn,
  backlightOn,
  frontlightOn,
}) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center space-x-4">
        <LCDButton
          onClick={onPrevious}
          colors={colors}
          displayOn={displayOn}
          backlightOn={backlightOn}
          frontlightOn={frontlightOn}
        >
          <SkipBack size={24} />
        </LCDButton>
        <LCDButton
          onClick={onTogglePlay}
          className="p-4"
          colors={colors}
          displayOn={displayOn}
          backlightOn={backlightOn}
          frontlightOn={frontlightOn}
        >
          {isPlaying ? <Pause size={32} /> : <Play size={32} />}
        </LCDButton>
        <LCDButton
          onClick={onNext}
          colors={colors}
          displayOn={displayOn}
          backlightOn={backlightOn}
          frontlightOn={frontlightOn}
        >
          <SkipForward size={24} />
        </LCDButton>
      </div>
      <LCDText
        colors={colors}
        displayOn={displayOn}
        backlightOn={backlightOn}
        frontlightOn={frontlightOn}
        className="text-sm"
      >
        {isPlaying ? 'NOW PLAYING' : 'PAUSED'}
      </LCDText>
    </div>
  );
};

export default PlayerControls;
