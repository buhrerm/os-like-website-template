import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Album, Track } from '../../types/audio';

interface AudioState {
  currentTrack: Track | null;
  currentAlbum: Album | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
}

const initialState: AudioState = {
  currentTrack: null,
  currentAlbum: null,
  isPlaying: false,
  currentTime: 0,
  volume: 1,
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
    },
    setCurrentAlbum: (state, action: PayloadAction<Album>) => {
      state.currentAlbum = action.payload;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    nextTrack: (state) => {
      if (state.currentAlbum && state.currentTrack) {
        const currentIndex = state.currentAlbum.tracks.findIndex(
          (track) => track.id === state.currentTrack?.id
        );
        if (currentIndex < state.currentAlbum.tracks.length - 1) {
          state.currentTrack = state.currentAlbum.tracks[currentIndex + 1];
        } else {
          state.currentTrack = state.currentAlbum.tracks[0];
        }
      }
    },
    previousTrack: (state) => {
      if (state.currentAlbum && state.currentTrack) {
        const currentIndex = state.currentAlbum.tracks.findIndex(
          (track) => track.id === state.currentTrack?.id
        );
        if (currentIndex > 0) {
          state.currentTrack = state.currentAlbum.tracks[currentIndex - 1];
        } else {
          state.currentTrack = state.currentAlbum.tracks[state.currentAlbum.tracks.length - 1];
        }
      }
    },
    updateCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
  },
});

export const {
  setCurrentTrack,
  setCurrentAlbum,
  togglePlay,
  nextTrack,
  previousTrack,
  updateCurrentTime,
  setVolume,
} = audioSlice.actions;

export default audioSlice.reducer;
