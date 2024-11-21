import { ColorScheme, colorSchemes } from '../constants/colorSchemes';
import { Album, Track } from './audio';
import { LucideIcon } from 'lucide-react';

export interface AppDefinition {
  id: string;
  title: string;
  icon: LucideIcon;
  component?: React.ComponentType<VolumeAppProps>;
  action?: () => void;
  defaultWidth?: number;
  defaultHeight?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export interface TopBarProps {
  isMuted: boolean;
  isFullscreen: boolean;
  onMuteToggle: () => void;
  onFullscreenToggle: () => void;
  onVolumeChange: (volume: number) => void;
  volume: number;
  colorScheme: ColorScheme;
  onColorSchemeChange: (scheme: ColorScheme) => void;
  backlightOn: boolean;
  frontlightOn: boolean;
  displayOn: boolean;
  onBacklightToggle: () => void;
  onFrontlightToggle: () => void;
  onDisplayToggle: () => void;
  currentTime: string;
  currentDate: string;
}

export interface AppWindowProps {
  app: AppDefinition;
  onClose: () => void;
  colorScheme: ColorScheme;
  volume: number;
  backlightOn: boolean;
  frontlightOn: boolean;
  displayOn: boolean;
  isActive: boolean;
  zIndex?: number;
  onFocus: () => void;
}

export interface AppProps {
  colors: (typeof colorSchemes)[ColorScheme];
  backlightOn: boolean;
  frontlightOn: boolean;
  displayOn: boolean;
}

export interface VolumeAppProps extends AppProps {
  volume: number;
}

export interface PlayerControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  colors: (typeof colorSchemes)[ColorScheme];
  displayOn: boolean;
  backlightOn: boolean;
  frontlightOn: boolean;
}

export interface NowPlayingInfoProps {
  currentTrack: Track | null;
  currentAlbum: Album | null;
  currentTime: number;
  duration: number;
  colors: (typeof colorSchemes)[ColorScheme];
  displayOn: boolean;
  backlightOn: boolean;
  frontlightOn: boolean;
  isPlaying: boolean;
}

export interface DisplayControlsProps {
  colors: (typeof colorSchemes)[ColorScheme];
  backlightOn: boolean;
  frontlightOn: boolean;
  displayOn: boolean;
  currentAlbum: Album | null;
  onChangeAlbum: (album: Album) => void;
}

export interface AppIconProps {
  icon: LucideIcon;
  title: string;
  onClick: () => void;
  colorScheme: ColorScheme;
  displayOn: boolean;
  backlightOn: boolean;
  frontlightOn: boolean;
}

export interface LCDComponentProps {
  colors: (typeof colorSchemes)[ColorScheme];
  displayOn: boolean;
  backlightOn: boolean;
  frontlightOn: boolean;
}
