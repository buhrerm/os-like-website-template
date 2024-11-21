import React, {
  useState,
  InputHTMLAttributes,
  CSSProperties,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { colorSchemes, ColorScheme } from '../../constants/colorSchemes';

interface LCDProps {
  colors: (typeof colorSchemes)[ColorScheme];
  displayOn: boolean;
  backlightOn: boolean;
  frontlightOn: boolean;
  className?: string;
  style?: CSSProperties;
}

// Centralized LCD styles
const createLCDStyles = (
  colors: (typeof colorSchemes)[ColorScheme],
  displayOn: boolean,
  backlightOn: boolean,
  frontlightOn: boolean,
  lcdTextBackLayerColor?: string
) => {
  const baseStyle: CSSProperties = {
    fontFamily: "'DSEG14 Classic', monospace",
  };

  const backLayerStyle: CSSProperties = {
    ...baseStyle,
    color: lcdTextBackLayerColor
      ? lcdTextBackLayerColor
      : backlightOn
        ? colors.textSecondary
        : colors.background,
    textShadow: backlightOn ? colors.glow : 'none',
    transform: backlightOn ? 'translate(0px, .5px)' : 'translate(0px, 2px)',
  };

  const frontLayerStyle: CSSProperties = {
    ...baseStyle,
    color: frontlightOn ? colors.textPrimary : colors.background,
    opacity: frontlightOn ? 1 : 0,
    textShadow: frontlightOn ? colors.glow : 'none',
  };

  const displayStyle: CSSProperties = displayOn
    ? {}
    : { color: colors.background, textShadow: 'none', opacity: 0.1 };

  return {
    backLayer: { ...backLayerStyle, ...displayStyle },
    frontLayer: { ...frontLayerStyle, ...displayStyle },
  };
};

// LCD Text Component
export const LCDText: React.FC<
  LCDProps & {
    children: React.ReactNode;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    altColor?: string;
    lcdTextBackLayerColor?: string;
  }
> = ({
  children,
  className = '',
  style = {},
  size = 'md',
  altColor = '',
  colors,
  displayOn,
  backlightOn,
  frontlightOn,
  lcdTextBackLayerColor,
}) => {
  const sizeClasses = {
    xs: 'text-[0.65rem]',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const lcdStyles = createLCDStyles(
    colors,
    displayOn,
    backlightOn,
    frontlightOn,
    lcdTextBackLayerColor
  );

  return (
    <div className={`relative ${className} ${sizeClasses[size]}`}>
      <div
        className="absolute"
        style={{
          ...lcdStyles.backLayer,
          ...style,
        }}
      >
        {children}
      </div>
      <div
        className="relative"
        style={{ ...lcdStyles.frontLayer, ...style, color: altColor || lcdStyles.frontLayer.color }}
      >
        {children}
      </div>
    </div>
  );
};

// LCD Link Component
export const LCDLink: React.FC<
  LCDProps & {
    href: string;
    children: React.ReactNode;
  }
> = ({
  href,
  colors,
  displayOn,
  backlightOn,
  frontlightOn,
  children,
  className = '',
  style = {},
}) => {
  const lcdStyles = createLCDStyles(colors, displayOn, backlightOn, frontlightOn);

  const linkStyle: CSSProperties = {
    textDecoration: 'none',
    cursor: 'pointer',
    ...style,
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`lcd-link relative ${className}`}
    >
      <div className="absolute" style={{ ...lcdStyles.backLayer, ...linkStyle }}>
        {children}
      </div>
      <div className="relative" style={{ ...lcdStyles.frontLayer, ...linkStyle }}>
        {children}
      </div>
    </a>
  );
};

// LCD Button Component
export const LCDButton: React.FC<
  LCDProps & {
    onClick: () => void;
    children: React.ReactNode;
    icon?: React.ReactNode;
  }
> = ({ onClick, children, className = '', icon, colors, displayOn, backlightOn, frontlightOn }) => (
  <button
    onClick={onClick}
    className={`px-2 py-1 ${className}`}
    style={{
      backgroundColor: displayOn ? colors.secondary : colors.background,
      color: colors.textPrimary,
      boxShadow: displayOn && backlightOn ? colors.glow : null,
      transition: 'all 0.2s ease',
      opacity: displayOn && !backlightOn && !frontlightOn ? 0.3 : 1,
    }}
  >
    <LCDText
      colors={colors}
      displayOn={displayOn}
      backlightOn={backlightOn}
      frontlightOn={frontlightOn}
      lcdTextBackLayerColor={
        displayOn ? (backlightOn ? colors.textSecondary : colors.secondary) : colors.background
      }
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </LCDText>
  </button>
);

// LCD Dropdown Component
export const LCDDropdown: React.FC<
  LCDProps & {
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
    label?: string;
    displayValue?: string;
    dropDirection?: 'left' | 'right' | 'center';
  }
> = ({
  options,
  value,
  onChange,
  label,
  displayValue,
  colors,
  displayOn,
  backlightOn,
  frontlightOn,
  dropDirection = 'left',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <LCDButton
        onClick={() => setIsOpen(!isOpen)}
        colors={colors}
        displayOn={displayOn}
        backlightOn={backlightOn}
        frontlightOn={frontlightOn}
      >
        {label ? `${label}: ` : ``}
        {displayValue || options.find((opt) => opt.value === value)?.label || 'Select'}
        <ChevronDown size={16} className="inline ml-1" />
      </LCDButton>
      {isOpen && (
        <div
          className={`absolute mt-1 w-48 z-10 overflow-hidden ${
            dropDirection === 'left'
              ? 'right-0'
              : dropDirection === 'right'
                ? 'left-0'
                : 'left-1/2 transform -translate-x-1/2'
          }`}
          style={{ backgroundColor: colors.background, border: `2px solid ${colors.border}` }}
        >
          {options.map((option) => (
            <LCDButton
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-opacity-80"
              colors={colors}
              displayOn={displayOn}
              backlightOn={backlightOn}
              frontlightOn={frontlightOn}
            >
              {option.label}
            </LCDButton>
          ))}
        </div>
      )}
    </div>
  );
};

export const LCDContainer: React.FC<
  LCDProps & {
    children: React.ReactNode;
    noPadding?: boolean;
    noRounded?: boolean;
    scrollable?: boolean;
    inset?: boolean;
    scanlines?: boolean;
  }
> = ({
  children,
  colors,
  displayOn,
  frontlightOn,
  backlightOn,
  className = '',
  style = {},
  noPadding = false,
  noRounded = false,
  scrollable = true,
  inset = false,
  scanlines = true,
}) => {
  const containerStyle: CSSProperties = {
    backgroundColor: colors.background,
    boxShadow: displayOn
      ? frontlightOn
        ? backlightOn
          ? `0 0 5px 3px ${colors.secondary}`
          : `0 0 0px 1px ${colors.secondary}`
        : backlightOn
          ? `0 0 5px 0px ${colors.secondary}`
          : `0 0 0px 0px ${colors.secondary}`
      : `0 0 0px 0px ${colors.secondary}`,
    ...style,
  };
  containerStyle.boxShadow = `${inset ? 'inset' : ''} ${containerStyle.boxShadow}`;

  const scanlineStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    background: `
      linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 80%,
        rgba(0, 0, 0, 0.1) 50%
      )
    `,
    backgroundSize: '100% 4px',
    backgroundRepeat: 'repeat-y',
    zIndex: 2,
  };

  return (
    <div
      className={`
        ${noPadding ? '' : 'p-2'} 
        border-0 
        relative 
        ${noRounded ? '' : 'rounded-sm'} 
        ${scrollable ? 'overflow-hidden' : 'overflow-hidden'}
        ${className}
      `}
      style={{
        ...containerStyle,
        position: 'relative',
      }}
    >
      <div style={scanlines ? scanlineStyle : null} />
      <div
        className={scrollable ? 'overflow-y-auto h-full' : ''}
        style={{
          position: 'relative',
          zIndex: 1,
          ...(scrollable ? { maxHeight: '100%', overflowY: 'auto' } : {}),
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const LCDToggle: React.FC<
  LCDProps & {
    isOn: boolean;
    onToggle: () => void;
    disabled?: boolean;
  }
> = ({
  isOn,
  onToggle,
  disabled = false,
  colors,
  displayOn,
  backlightOn,
  frontlightOn,
  className = '',
}) => {
  const toggleStyles: CSSProperties = {
    backgroundColor: isOn ? (displayOn ? colors.primary : colors.background) : colors.background,
    borderColor: colors.border,
    borderWidth: '1px',
    boxShadow: displayOn && backlightOn ? colors.glow : 'none',
    opacity: displayOn ? (!backlightOn && !frontlightOn ? 0.3 : 1) : 0.3,
  };

  const knobStyles: CSSProperties = {
    backgroundColor: colors.textPrimary,
    transform: isOn ? 'translateX(24px)' : 'translateX(0)',
  };

  return (
    <button
      onClick={onToggle}
      disabled={disabled || !displayOn}
      className={`relative w-12 h-6 rounded-full ${className} ${disabled || !displayOn ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      style={toggleStyles}
    >
      <div
        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full ease-in-out"
        style={knobStyles}
      ></div>
    </button>
  );
};

// LCD Video Component
export const LCDVideo: React.FC<
  LCDProps & {
    src: string;
    isPlaying: boolean;
  }
> = ({
  src,
  isPlaying,
  colors,
  displayOn,
  backlightOn,
  frontlightOn,
  className = '',
  style = {},
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch((error) => console.error('Video playback failed:', error));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, src]);

  const videoStyle: CSSProperties = {
    filter: `brightness(0.7) contrast(1.2) saturate(0.8) hue-rotate(${
      colors.primary === '#00FFAA' ? '180deg' : '0deg'
    })
    ${!displayOn ? 'grayscale(100%) brightness(0)' : ''}
    ${displayOn && !frontlightOn && !backlightOn ? 'grayscale(100%) brightness(0.3)' : ''}`,
    mixBlendMode: 'screen',
    opacity: displayOn && frontlightOn ? (backlightOn ? 1 : 0.8) : 0.3,
    ...style,
  };

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted
      playsInline
      className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${className}`}
      style={videoStyle}
    />
  );
};

export const LCDIconDisplay: React.FC<
  LCDProps & {
    icon: LucideIcon;
    size?: number;
  }
> = ({
  icon: Icon,
  size = 48,
  colors,
  displayOn,
  backlightOn,
  frontlightOn,
  className = '',
  style = {},
}) => {
  const iconStyle: CSSProperties = {
    color: colors.primary,
    filter: backlightOn ? `drop-shadow(${colors.glow})` : null,
    opacity: displayOn ? (frontlightOn ? (backlightOn ? 1 : 0.8) : 0.5) : 0.3,
    fontSize: '3rem',
    ...style,
  };

  return (
    <div
      className={`flex items-center justify-center w-full h-full ${className}`}
      style={iconStyle}
    >
      <Icon size={size} />
    </div>
  );
};

export const LCDInput: React.FC<LCDProps & InputHTMLAttributes<HTMLInputElement>> = ({
  colors,
  displayOn,
  backlightOn,
  className = '',
  style = {},
  ...props
}) => {
  const inputStyle: CSSProperties = {
    backgroundColor: colors.background,
    color: colors.textPrimary,
    border: `1px solid ${colors.border}`,
    boxShadow: displayOn && backlightOn ? colors.glow : 'none',
    opacity: displayOn ? 1 : 0.5,
    ...style,
  };

  return (
    <input
      className={`px-2 py-1 focus:outline-none focus:ring-2 focus:ring-${colors.highlight} ${className}`}
      style={inputStyle}
      disabled={!displayOn}
      {...props}
    />
  );
};

export const LCDInputRange: React.FC<
  LCDProps & {
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (value: number) => void;
  }
> = ({
  colors,
  displayOn,
  backlightOn,
  frontlightOn,
  min,
  max,
  step,
  value,
  onChange,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const rangeRef = useRef<HTMLDivElement>(null);

  const updateValue = useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      if (rangeRef.current) {
        const rect = rangeRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        const newValue = min + percentage * (max - min);
        onChange(Math.round(newValue / step) * step);
      }
    },
    [min, max, step, onChange]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateValue(e);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        updateValue(e);
      }
    },
    [isDragging, updateValue]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const percentage = ((value - min) / (max - min)) * 100;

  const rangeStyle: React.CSSProperties = {
    backgroundColor: colors.background,
    borderColor: colors.border,
    boxShadow: displayOn && (backlightOn || frontlightOn) ? colors.glow : 'none',
  };

  const fillStyle: React.CSSProperties = {
    backgroundColor: colors.primary,
    width: `${percentage}%`,
    opacity: displayOn ? (frontlightOn ? (backlightOn ? 1 : 0.8) : backlightOn ? 0.3 : 0.1) : 0,
  };

  const knobStyle: React.CSSProperties = {
    backgroundColor: colors.secondary,
    left: `${percentage}%`,
    borderColor: colors.border,
    boxShadow: displayOn && (backlightOn || frontlightOn) ? colors.glow : 'none',
    opacity: displayOn ? (frontlightOn ? (backlightOn ? 1 : 1) : backlightOn ? 0.8 : 0.8) : 0.8,
  };

  return (
    <div
      ref={rangeRef}
      className={`relative h-6 cursor-pointer ${className}`}
      style={rangeStyle}
      onMouseDown={handleMouseDown}
    >
      <div className="absolute top-0 left-0 h-full" style={fillStyle} />
      <div className="absolute top-0 w-4 h-full -ml-2" style={knobStyle} />
    </div>
  );
};

export default {
  LCDText,
  LCDLink,
  LCDButton,
  LCDDropdown,
  LCDContainer,
  LCDToggle,
  LCDVideo,
  LCDIconDisplay,
  LCDInput,
  LCDInputRange,
};
