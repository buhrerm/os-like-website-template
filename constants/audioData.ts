import { Track, Album } from '../types/audio';

const mmeds_studio_tracks: Track[] = [
  {
    id: 1,
    title: 'Apple Fritter',
    file: '/beats/hardly speak.mp3',
    link: 'https://www.youtube.com/@MMEDSPLS',
    recordAnimation: '/mp4/0.mp4',
  },
];

export const mmeds_studio: Album = {
  id: 0,
  title: 'mmeds.studio',
  artist: 'MMEDS',
  year: '2023',
  tracks: mmeds_studio_tracks,
};

export const albums: Album[] = [mmeds_studio];
