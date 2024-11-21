export interface Track {
  id: number;
  title: string;
  file: string;
  link: string;
  recordAnimation: string;
}

export interface Album {
  id: number;
  title: string;
  artist: string;
  year: string;
  tracks: Track[];
}

export interface AudioState {
  currentTrack: Track | null;
  currentAlbum: Album | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
}
