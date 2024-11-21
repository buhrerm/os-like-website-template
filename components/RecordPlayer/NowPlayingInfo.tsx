import React from 'react';
import { LCDText, LCDLink, LCDContainer, LCDVideo } from '../utils/LCDComponents';
import { formatTime } from '../utils/formatTime';
import { NowPlayingInfoProps } from '../../types/app';

const NowPlayingInfo: React.FC<NowPlayingInfoProps> = ({
  currentTrack,
  currentAlbum,
  currentTime,
  duration,
  colors,
  displayOn,
  backlightOn,
  frontlightOn,
  isPlaying,
}) => {
  return (
    <div className="flex flex-grow space-x-4 mb-4">
      <LCDContainer
        colors={colors}
        displayOn={displayOn}
        backlightOn={backlightOn}
        frontlightOn={frontlightOn}
        inset={true}
        className="flex-1"
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <LCDLink
              href={currentTrack?.link || '#'}
              colors={colors}
              displayOn={displayOn}
              backlightOn={backlightOn}
              frontlightOn={frontlightOn}
              className="mb-2 overflow-hidden whitespace-nowrap block"
              style={{
                animation: 'marquee 15s linear infinite',
              }}
            >
              <LCDText
                size="lg"
                colors={colors}
                displayOn={displayOn}
                backlightOn={backlightOn}
                frontlightOn={frontlightOn}
              >
                {currentTrack?.title || 'NO TRACK SELECTED'}
              </LCDText>
            </LCDLink>
            <LCDText
              size="md"
              className="mb-2"
              colors={colors}
              displayOn={displayOn}
              backlightOn={backlightOn}
              frontlightOn={frontlightOn}
            >
              {currentAlbum?.artist || 'N/A'}
            </LCDText>
          </div>
          <LCDText
            size="lg"
            colors={colors}
            displayOn={displayOn}
            backlightOn={backlightOn}
            frontlightOn={frontlightOn}
          >
            {formatTime(currentTime)} / {formatTime(duration)}
          </LCDText>
        </div>
      </LCDContainer>
      <div className="w-1/3 relative overflow-hidden rounded">
        <LCDVideo
          src={currentTrack?.recordAnimation || '/mp4/1.mp4'}
          isPlaying={isPlaying}
          colors={colors}
          displayOn={displayOn}
          backlightOn={backlightOn}
          frontlightOn={frontlightOn}
        />
      </div>
    </div>
  );
};

export default NowPlayingInfo;
