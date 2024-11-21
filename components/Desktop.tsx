import React, { useState, useEffect } from 'react';
import AppIcon from './AppIcon';
import AppWindow from './AppWindow';
import TopBar from './TopBar';
import MusicPlayer from './RecordPlayer/MusicPlayer';
import Connect from './Chat/Chat';
import AboutMe from './About/About';
import { colorSchemes, ColorScheme } from '../constants/colorSchemes';
import { AUTHOR_EMAIL, APP_NAME } from '../constants/constants';
import { AppDefinition } from '../types/app';
import { LCDText, LCDContainer } from './utils/LCDComponents';
import { Mail, Disc, Globe, User } from 'lucide-react';

const apps: AppDefinition[] = [
  {
    id: 'Email_Me',
    title: 'Email Me',
    icon: Mail,
    action: () => {
      window.location.href = `mailto:${AUTHOR_EMAIL}?subject=Hello%20from%20your%20website!`;
    },
  },
  {
    id: 'Music_Player',
    title: 'Music Player',
    icon: Disc,
    component: MusicPlayer,
    defaultWidth: 686,
    defaultHeight: 379,
    minWidth: 320,
    minHeight: 320,
    maxWidth: 800,
    maxHeight: 800,
  },
  {
    id: 'Chat',
    title: 'Chat',
    icon: Globe,
    component: Connect,
    defaultWidth: 686,
    defaultHeight: 516,
    minWidth: 320,
    minHeight: 400,
    maxWidth: 800,
    maxHeight: 800,
  },
  {
    id: 'About_Me',
    title: 'About Me',
    icon: User,
    component: AboutMe,
    defaultWidth: 354,
    defaultHeight: 380,
    minWidth: 300,
    minHeight: 380,
    maxWidth: 450,
    maxHeight: 450,
  },
];

const Desktop: React.FC = () => {
  const [openApps, setOpenApps] = useState<string[]>(['About_Me']);
  const [activeApp, setActiveApp] = useState<string | null>('About_Me');
  const [zIndexCounter, setZIndexCounter] = useState(1000);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('arctic');
  const [volume, setVolume] = useState(1);
  const [backlightOn, setBacklightOn] = useState(false);
  const [frontlightOn, setFrontlightOn] = useState(true);
  const [displayOn, setDisplayOn] = useState(true);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const bootTimer = setTimeout(() => setIsBooting(false), 3000);
    return () => clearTimeout(bootTimer);
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      setCurrentDate(now.toLocaleDateString());
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const openApp = (appId: string) => {
    const app = apps.find((a) => a.id === appId);
    if (app) {
      if (app.action) {
        app.action();
      } else {
        if (isMobile) {
          // On mobile, only allow one app at a time
          setOpenApps([appId]);
          setActiveApp(appId);
          setMobileMenuOpen(false);
        } else if (!openApps.includes(appId)) {
          setOpenApps([...openApps, appId]);
          setActiveApp(appId);
          setZIndexCounter((prev) => prev + 1);
        } else {
          setActiveApp(appId);
          setZIndexCounter((prev) => prev + 1);
        }
      }
    }
  };

  const closeApp = (appId: string) => {
    setOpenApps(openApps.filter((id) => id !== appId));
    if (activeApp === appId) {
      setActiveApp(null);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? 1 : 0);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleColorSchemeChange = (newScheme: ColorScheme) => setColorScheme(newScheme);
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleBacklight = () => setBacklightOn(!backlightOn);
  const toggleFrontlight = () => setFrontlightOn(!frontlightOn);
  const toggleDisplay = () => setDisplayOn(!displayOn);

  const colors = colorSchemes[colorScheme];

  if (isBooting) {
    return (
      <LCDContainer
        colors={colors}
        displayOn={displayOn}
        backlightOn={backlightOn}
        frontlightOn={frontlightOn}
        className="h-screen w-screen flex items-center justify-center"
        noPadding
        noRounded
        scrollable={false}
      >
        <div className="text-center">
          <LCDText
            colors={colors}
            displayOn={displayOn}
            backlightOn={backlightOn}
            frontlightOn={frontlightOn}
            className="text-2xl mb-4"
          >
            {APP_NAME}
          </LCDText>
          <div
            className="w-64 h-4 border mx-auto"
            style={{ backgroundColor: colors.background, borderColor: colors.secondary }}
          >
            <div
              className="h-full animate-boot-progress"
              style={{ backgroundColor: colors.primary }}
            ></div>
          </div>
          <LCDText
            colors={colors}
            displayOn={displayOn}
            backlightOn={backlightOn}
            frontlightOn={frontlightOn}
            className="mt-4 text-sm animate-pulse"
          >
            Initializing system...
          </LCDText>
        </div>
      </LCDContainer>
    );
  }

  return (
    <LCDContainer
      colors={colors}
      displayOn={displayOn}
      backlightOn={backlightOn}
      frontlightOn={frontlightOn}
      scanlines={false}
      className="h-screen overflow-hidden flex flex-col"
      noPadding
      noRounded
    >
      <TopBar
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        isMuted={isMuted}
        isFullscreen={isFullscreen}
        onMuteToggle={toggleMute}
        onFullscreenToggle={toggleFullscreen}
        onVolumeChange={handleVolumeChange}
        volume={volume}
        colorScheme={colorScheme}
        onColorSchemeChange={handleColorSchemeChange}
        backlightOn={backlightOn}
        frontlightOn={frontlightOn}
        displayOn={displayOn}
        onBacklightToggle={toggleBacklight}
        onFrontlightToggle={toggleFrontlight}
        onDisplayToggle={toggleDisplay}
        currentTime={currentTime}
        currentDate={currentDate}
      />

      <div
        className="flex-grow flex relative mt-1"
        id="desktop-content"
        style={{
          height: isMobile ? 'calc(100vh - 3.5rem)' : 'calc(100vh - 2.5rem)',
          background: `linear-gradient(to bottom, ${colors.background}, #000510)`,
        }}
      >
        {/* Background elements */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(1.5px 1.5px at ${Array.from(
                { length: 300 },
                () => `${Math.random() * 100}% ${Math.random() * 100}%`
              ).join(', ')},
              #ffffff 50%,
              transparent 50%)
            `,
            opacity: 0.5,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                circle at 20% 30%,
                ${colors.primary}40 0%,
                transparent 50%
              ),
              radial-gradient(
                circle at 80% 40%,
                ${colors.secondary}30 0%,
                transparent 50%
              )
            `,
          }}
        />

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="absolute inset-0 z-50 bg-black bg-opacity-50">
            <div className="w-64 h-full" style={{ backgroundColor: colors.background }}>
              <div className="p-4 space-y-4">
                {apps.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-opacity-20"
                    onClick={() => openApp(app.id)}
                    style={{ backgroundColor: colors.primary + '10' }}
                  >
                    <app.icon size={20} />
                    <span>{app.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Desktop Icons (hidden on mobile) */}
        {!isMobile && (
          <div className="absolute w-24 p-4 space-y-4 z-10">
            {apps.map((app) => (
              <AppIcon
                key={app.id}
                icon={app.icon}
                title={app.title}
                onClick={() => openApp(app.id)}
                colorScheme={colorScheme}
                backlightOn={backlightOn}
                frontlightOn={frontlightOn}
                displayOn={displayOn}
              />
            ))}
          </div>
        )}

        {/* App Windows */}
        <div className="flex-grow relative">
          {openApps.map((appId) => {
            const app = apps.find((a) => a.id === appId);
            if (!app) return null;
            return (
              <AppWindow
                key={app.id}
                app={app}
                onClose={() => closeApp(app.id)}
                colorScheme={colorScheme}
                volume={volume}
                backlightOn={backlightOn}
                frontlightOn={frontlightOn}
                displayOn={displayOn}
                isActive={activeApp === app.id}
                zIndex={activeApp === app.id ? zIndexCounter : undefined}
                onFocus={() => {
                  setActiveApp(app.id);
                  setZIndexCounter((prev) => prev + 1);
                }}
                isMobile={isMobile}
              />
            );
          })}
        </div>
      </div>
    </LCDContainer>
  );
};

export default Desktop;
