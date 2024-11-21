import React from 'react';
import { colorSchemes, ColorScheme } from '../constants/colorSchemes';
import { APP_NAME, APP_VERSION } from '../constants/constants';
import { Volume, VolumeX, Maximize, Minimize, Sun, Moon, Power, Menu, X } from 'lucide-react';
import { TopBarProps } from '../types/app';
import { LCDText, LCDButton, LCDDropdown, LCDInputRange } from './utils/LCDComponents';

interface ExtendedTopBarProps extends TopBarProps {
  isMobile: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const TopBar: React.FC<ExtendedTopBarProps> = ({
  isMobile,
  mobileMenuOpen,
  setMobileMenuOpen,
  isMuted,
  isFullscreen,
  onMuteToggle,
  onFullscreenToggle,
  onVolumeChange,
  volume,
  colorScheme,
  onColorSchemeChange,
  backlightOn,
  frontlightOn,
  displayOn,
  onBacklightToggle,
  onFrontlightToggle,
  onDisplayToggle,
  currentTime,
  currentDate,
}) => {
  const colors = colorSchemes[colorScheme];
  const colorSchemeOptions = Object.keys(colorSchemes).map((scheme) => ({
    value: scheme,
    label: scheme.charAt(0).toUpperCase() + scheme.slice(1),
  }));

  return (
    <div
      className="py-1 px-2 flex items-center justify-between w-full bg-opacity-100"
      style={{ backgroundColor: colors.background }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-10"></div>

      {/* Mobile Menu Button */}
      {isMobile && (
        <LCDButton
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          colors={colors}
          displayOn={displayOn}
          backlightOn={backlightOn}
          frontlightOn={frontlightOn}
          className="hover:opacity-80 px-2"
        >
          {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
        </LCDButton>
      )}

      <LCDText
        colors={colors}
        displayOn={displayOn}
        backlightOn={backlightOn}
        frontlightOn={frontlightOn}
        className="font-bold hidden md:block"
      >
        {`${APP_NAME} ${APP_VERSION}`}
      </LCDText>

      {/* Controls - Responsive Layout */}
      <div className={`flex items-center ${isMobile ? 'ml-auto' : ''}`}>
        {/* Mobile-optimized controls */}
        {isMobile ? (
          <>
            <LCDButton
              onClick={onMuteToggle}
              colors={colors}
              displayOn={displayOn}
              backlightOn={backlightOn}
              frontlightOn={frontlightOn}
              className="hover:opacity-80 px-2"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume size={16} />}
            </LCDButton>

            <LCDDropdown
              options={colorSchemeOptions}
              value={colorScheme}
              onChange={(value) => onColorSchemeChange(value as ColorScheme)}
              colors={colors}
              displayOn={displayOn}
              backlightOn={backlightOn}
              frontlightOn={frontlightOn}
              label=""
              dropDirection="left"
              className="mx-2"
            />

            <LCDButton
              onClick={onDisplayToggle}
              colors={colors}
              displayOn={displayOn}
              backlightOn={backlightOn}
              frontlightOn={frontlightOn}
              className="hover:opacity-80 px-2"
            >
              <Power size={16} />
            </LCDButton>
          </>
        ) : (
          // Desktop controls (original layout)
          <>
            <div className="flex items-center">
              <LCDButton
                onClick={onMuteToggle}
                colors={colors}
                displayOn={displayOn}
                backlightOn={backlightOn}
                frontlightOn={frontlightOn}
                className="hover:opacity-80 px-2"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume size={16} />}
              </LCDButton>
              <LCDInputRange
                colors={colors}
                displayOn={displayOn}
                backlightOn={backlightOn}
                frontlightOn={frontlightOn}
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={onVolumeChange}
                className="w-24"
              />
            </div>

            <div className="mx-4 h-4 w-px" style={{ backgroundColor: colors.secondary }}></div>

            <LCDButton
              onClick={onFullscreenToggle}
              colors={colors}
              displayOn={displayOn}
              backlightOn={backlightOn}
              frontlightOn={frontlightOn}
              className="hover:opacity-80 px-2"
            >
              {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            </LCDButton>

            <div className="mx-4 h-4 w-px" style={{ backgroundColor: colors.secondary }}></div>

            <div className="flex items-center">
              <LCDButton
                onClick={onBacklightToggle}
                colors={colors}
                displayOn={displayOn}
                backlightOn={backlightOn}
                frontlightOn={frontlightOn}
                className="hover:opacity-80 px-2"
              >
                <Sun size={16} />
              </LCDButton>
              <LCDButton
                onClick={onFrontlightToggle}
                colors={colors}
                displayOn={displayOn}
                backlightOn={backlightOn}
                frontlightOn={frontlightOn}
                className="hover:opacity-80 px-2"
              >
                <Moon size={16} />
              </LCDButton>
            </div>

            <div className="mx-4 h-4 w-px" style={{ backgroundColor: colors.secondary }}></div>

            <div className="flex items-center">
              <LCDDropdown
                options={colorSchemeOptions}
                value={colorScheme}
                onChange={(value) => onColorSchemeChange(value as ColorScheme)}
                colors={colors}
                displayOn={displayOn}
                backlightOn={backlightOn}
                frontlightOn={frontlightOn}
                label=""
                dropDirection="right"
                className="mr-4"
              />
              <LCDText
                colors={colors}
                displayOn={displayOn}
                backlightOn={backlightOn}
                frontlightOn={frontlightOn}
                className="px-2"
              >
                {currentTime} | {currentDate}
              </LCDText>
            </div>

            <div className="mx-4 h-4 w-px" style={{ backgroundColor: colors.secondary }}></div>

            <LCDButton
              onClick={onDisplayToggle}
              colors={colors}
              displayOn={displayOn}
              backlightOn={backlightOn}
              frontlightOn={frontlightOn}
              className="hover:opacity-80 px-2"
            >
              <Power size={16} />
            </LCDButton>
          </>
        )}
      </div>
    </div>
  );
};

export default TopBar;
