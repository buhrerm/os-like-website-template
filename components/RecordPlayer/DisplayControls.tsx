import React from 'react';
import { LCDDropdown } from '../utils/LCDComponents';
import { albums } from '../../constants/audioData';
import { DisplayControlsProps } from '../../types/app';

const DisplayControls: React.FC<DisplayControlsProps> = ({
  colors,
  backlightOn,
  frontlightOn,
  displayOn,
  currentAlbum,
  onChangeAlbum,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <LCDDropdown
        options={albums.map((album) => ({ value: album.id.toString(), label: album.title }))}
        value={currentAlbum?.id.toString() || ''}
        onChange={(value) => onChangeAlbum(albums.find((album) => album.id.toString() === value)!)}
        displayValue={currentAlbum?.title || 'Select Album'}
        colors={colors}
        displayOn={displayOn}
        backlightOn={backlightOn}
        frontlightOn={frontlightOn}
        dropDirection="right"
      />
    </div>
  );
};

export default DisplayControls;
