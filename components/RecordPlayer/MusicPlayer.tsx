import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import {
  setCurrentTrack,
  togglePlay,
  nextTrack,
  previousTrack,
  setCurrentAlbum,
  updateCurrentTime,
} from '../../store/slices/audioSlice';
import { albums } from '../../constants/audioData';
import { VolumeAppProps } from '../../types/app';
import { LCDText } from '../utils/LCDComponents';
import PlayerControls from './PlayerControls';
import DisplayControls from './DisplayControls';
import NowPlayingInfo from './NowPlayingInfo';
import { COPYRIGHT_TEXT } from '../../constants/constants';

const MusicPlayer: React.FC<VolumeAppProps> = ({
  colors,
  volume,
  displayOn,
  backlightOn,
  frontlightOn,
}) => {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying, currentAlbum, currentTime } = useSelector(
    (state: RootState) => state.audio
  );
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!currentAlbum) {
      dispatch(setCurrentAlbum(albums[0]));
    }
  }, [dispatch, currentAlbum]);

  useEffect(() => {
    if (currentAlbum && (!currentTrack || !currentAlbum.tracks.includes(currentTrack))) {
      dispatch(setCurrentTrack(currentAlbum.tracks[0]));
    }
  }, [dispatch, currentTrack, currentAlbum]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.addEventListener('timeupdate', () => {
        dispatch(updateCurrentTime(audioRef.current?.currentTime || 0));
      });
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });
      audioRef.current.addEventListener('ended', () => {
        dispatch(nextTrack());
      });
    }

    const audio = audioRef.current;

    if (currentTrack) {
      audio.src = currentTrack.file;
      audio.load();
      if (isPlaying) {
        audio.play().catch((error) => console.error('Playback failed:', error));
      }
    }

    return () => {
      audio.pause();
    };
  }, [currentTrack, dispatch]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((error) => console.error('Playback failed:', error));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTogglePlay = () => {
    dispatch(togglePlay());
  };

  const handleNext = () => {
    dispatch(updateCurrentTime(0));
    dispatch(nextTrack());
  };

  const handlePrevious = () => {
    dispatch(updateCurrentTime(0));
    dispatch(previousTrack());
  };

  const handleChangeAlbum = (album: (typeof albums)[0]) => {
    dispatch(setCurrentAlbum(album));
  };

  return (
    <div
      className="relative p-4 h-full flex flex-col"
      style={{ backgroundColor: colors.background }}
    >
      <DisplayControls
        colors={colors}
        backlightOn={backlightOn}
        frontlightOn={frontlightOn}
        displayOn={displayOn}
        currentAlbum={currentAlbum}
        onChangeAlbum={handleChangeAlbum}
      />
      <NowPlayingInfo
        currentTrack={currentTrack}
        currentAlbum={currentAlbum}
        currentTime={currentTime}
        duration={duration}
        colors={colors}
        displayOn={displayOn}
        backlightOn={backlightOn}
        frontlightOn={frontlightOn}
        isPlaying={isPlaying}
      />
      <PlayerControls
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onPrevious={handlePrevious}
        onNext={handleNext}
        colors={colors}
        displayOn={displayOn}
        backlightOn={backlightOn}
        frontlightOn={frontlightOn}
      />

      <LCDText
        size="xs"
        className="mt-4"
        altColor={colors.secondary}
        colors={colors}
        displayOn={displayOn}
        backlightOn={backlightOn}
        frontlightOn={frontlightOn}
      >
        {COPYRIGHT_TEXT}
      </LCDText>
    </div>
  );
};

export default MusicPlayer;
