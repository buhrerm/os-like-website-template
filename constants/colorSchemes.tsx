export const colorSchemes = {
  arctic: {
    // Primary interactive elements, calls-to-action
    primary: '#00FF7F',
    // Large surface areas, main background
    background: '#0A1520', // Deeper, richer dark blue
    secondary: '#147AAC', // Muted blue,
    // Informational elements, progress indicators
    info: '#40E0D0',
    // Success states, positive actions
    success: '#7FFF00',
    // Warning states, cautionary actions
    warning: '#FFD700',
    // Error states, critical actions
    error: '#FF4500',
    // Main text color
    textPrimary: '#E6F3F3', // Slightly warmer white
    // Secondary text, less important information
    textSecondary: '#99C1C6', // Muted blue-grey
    // Subtle borders, separators
    border: '#00308F',
    // Hover and focus states for interactive elements
    highlight: '#33FFD1', // Brighter cyan for emphasis
    // Overlay for modal backgrounds, dim effects
    overlay: '#000C14',
    // Glow effect for aurora-inspired elements
    glow: 'rgba(0, 255, 127, 0.7)',
  },
  arcticLight: {
    // Primary interactive elements, calls-to-action
    primary: '#1A936F', // Deeper mint green
    background: '#EBE6E0', // Warmer, softer off-white
    secondary: '#4989BC', // Deeper pastel blue
    info: '#40A6A6', // Deeper teal
    success: '#5FA35F', // Deeper sage
    warning: '#C99B4A', // Warmer gold
    error: '#BF5858', // Deeper coral red
    textPrimary: '#2C3E50', // Deep blue-grey
    textSecondary: '#5D7A8C', // Medium blue-grey
    border: '#D1C7BC', // Warmer beige
    highlight: '#26B99A', // Bright teal highlight
    overlay: 'rgba(235, 230, 224, 0.85)',
    glow: 'rgba(26, 147, 111, 0.3)',
  },
  contrast: {
    // Primary interactive elements, calls-to-action
    primary: '#E61B5B', // Darker hot pink
    background: '#0D0D12', // Near-black with slight blue tint
    secondary: '#00CC7A', // Darker cyber green
    info: '#2BCEFF', // Slightly muted cyan
    success: '#00CC52', // Darker matrix green
    warning: '#FF7A00', // Deeper cyber orange
    error: '#E60033', // Deeper electric red
    textPrimary: '#F2F2F7', // Very slight blue-white
    textSecondary: '#D1D1E6', // Light purple-grey
    border: '#1A1A3F', // Deep cyber blue
    highlight: '#FF1AB2', // Brighter pink highlight for contrast
    overlay: 'rgba(13, 13, 18, 0.9)',
    glow: 'rgba(230, 27, 91, 0.7)',
  },
};

export type ColorScheme = keyof typeof colorSchemes;
export type ColorContext = 'app' | 'site';

// CSS helper for scanline effect
export const scanlineEffect = `
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 50%,
    rgba(0, 0, 0, 0.05) 50%
  );
  background-size: 100% 8px;
  background-repeat: repeat-y;
  opacity: 0.3;
`;

export const crtScreenEffect = ({
  curved = true,
  scanlines = true,
  vignette = true,
  rgbShift = true,
} = {}) => `
  position: relative;
  overflow: hidden;
  ${curved ? 'border-radius: 5px / 4px;' : ''}
  
  ${
    scanlines
      ? `
    &::before {
      content: " ";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: linear-gradient(
        to bottom,
        rgba(18, 16, 16, 0) 50%,
        rgba(0, 0, 0, 0.02) 50%
      );
      background-size: 100% 8px;
      pointer-events: none;
      z-index: 2;
      opacity: 0.3;
    }
  `
      : ''
  }
  
  ${
    vignette
      ? `
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(
        circle at center,
        rgba(0, 0, 0, 0) 70%,
        rgba(0, 0, 0, 0.05) 100%
      );
      pointer-events: none;
      z-index: 2;
    }
  `
      : ''
  }
  
  ${
    rgbShift
      ? `
    text-shadow: 
      0.05px 0 0 rgba(255, 0, 0, 0.1),
      -0.05px 0 0 rgba(0, 255, 0, 0.1),
      0 0 0.5px;
  `
      : ''
  }
`;
