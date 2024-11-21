import React from 'react';
import { Rnd } from 'react-rnd';
import { colorSchemes } from '../constants/colorSchemes';
import { AppWindowProps } from '../types/app';
import { LCDText, LCDButton } from './utils/LCDComponents';

interface ExtendedAppWindowProps extends AppWindowProps {
  isMobile?: boolean;
}

const AppWindow: React.FC<ExtendedAppWindowProps> = ({
  app,
  onClose,
  colorScheme,
  volume,
  backlightOn,
  frontlightOn,
  displayOn,
  isActive,
  zIndex,
  onFocus,
  isMobile,
}) => {
  const colors = colorSchemes[colorScheme];
  const AppComponent = app.component;

  const getBorderStyle = () => {
    if (!displayOn || (!frontlightOn && !backlightOn)) return `0px solid ${colors.glow}`;
    let borderWidth = '1px';
    if (frontlightOn && backlightOn) {
      borderWidth = '1px';
    } else if (frontlightOn || backlightOn) {
      borderWidth = '1px';
    }
    return `${borderWidth} solid ${colors.glow}`;
  };

  // For mobile, render a full-screen window
  if (isMobile) {
    return (
      <div
        className={`fixed inset-0 z-50 flex flex-col ${isActive ? 'active' : ''}`}
        style={{
          backgroundColor: colors.background,
          border: getBorderStyle(),
        }}
        onClick={onFocus}
      >
        <div
          className="py-1 px-2 flex justify-between items-center"
          style={{
            border: getBorderStyle(),
          }}
        >
          <LCDText
            colors={colors}
            backlightOn={backlightOn}
            frontlightOn={frontlightOn}
            displayOn={displayOn}
            className="font-bold text-sm"
          >
            {app.title}
          </LCDText>
          <LCDButton
            colors={colors}
            backlightOn={backlightOn}
            frontlightOn={frontlightOn}
            displayOn={displayOn}
            onClick={onClose}
            className="hover:opacity-80 px-1 py-0.5 text-sm"
          >
            x
          </LCDButton>
        </div>
        <div className="flex-grow relative">
          <div className="absolute inset-0" style={{ backgroundColor: colors.background }}>
            <div className="scanlines absolute inset-0 pointer-events-none opacity-5"></div>
            <AppComponent
              colors={colors}
              volume={volume}
              backlightOn={backlightOn}
              frontlightOn={frontlightOn}
              displayOn={displayOn}
            />
          </div>
        </div>
      </div>
    );
  }

  // Desktop version remains the same
  return (
    <Rnd
      default={{
        x: 100,
        y: 100,
        width: app.defaultWidth,
        height: app.defaultHeight,
      }}
      minWidth={app.minWidth}
      minHeight={app.minHeight}
      maxWidth={app.maxWidth}
      maxHeight={app.maxHeight}
      bounds="#desktop-content"
      className={`retro-window ${isActive ? 'active' : ''}`}
      dragHandleClassName="drag-handle"
      style={{
        position: 'absolute',
        zIndex: zIndex || 'auto',
        boxShadow: displayOn
          ? frontlightOn
            ? backlightOn
              ? `0 0 0px 1px ${colors.secondary}`
              : `0 0 0px 1px ${colors.secondary}`
            : backlightOn
              ? `0 0 0px 0px ${colors.secondary}`
              : `0 0 0px 0px ${colors.secondary}`
          : 'none',
      }}
      onMouseDown={onFocus}
    >
      <div
        className="h-full flex flex-col overflow-hidden"
        style={{
          backgroundColor: colors.background,
        }}
      >
        <div
          className="py-1 px-2 flex justify-between items-center drag-handle"
          style={{
            border: getBorderStyle(),
          }}
        >
          <LCDText
            colors={colors}
            backlightOn={backlightOn}
            frontlightOn={frontlightOn}
            displayOn={displayOn}
            className="font-bold text-sm"
          >
            {app.title}
          </LCDText>
          <LCDButton
            colors={colors}
            backlightOn={backlightOn}
            frontlightOn={frontlightOn}
            displayOn={displayOn}
            onClick={onClose}
            className="hover:opacity-80 px-1 py-0.5 text-sm"
          >
            x
          </LCDButton>
        </div>
        <div className="flex-grow relative">
          <div className="absolute inset-0" style={{ backgroundColor: colors.background }}>
            <div className="scanlines absolute inset-0 pointer-events-none opacity-5"></div>
            <AppComponent
              colors={colors}
              volume={volume}
              backlightOn={backlightOn}
              frontlightOn={frontlightOn}
              displayOn={displayOn}
            />
          </div>
        </div>
      </div>
    </Rnd>
  );
};

export default AppWindow;
