const { mapValues } = require('lodash')
const colors = require('tailwindcss/colors')
const intellisense = require('./lib/styles/intellisense')
const utilities = require('./lib/styles/utilities')
const textShadow = require('./lib/styles/textShadow')

module.exports = {
  content: [ './lib/**/*.js', './src/**/*.js' ],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
      mouse: { raw: '(hover: hover)' },
    },
    textColor: theme => ({
      ...theme('colors'),
      DEFAULT: '#141414',
      dark: colors.gray[ 900 ],
      secondary: colors.gray[ 700 ],
      tertiary: colors.gray[ 500 ],
      quaternary: colors.gray[ 400 ],
      light: colors.white,
    }),
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: 'rgba(156, 163, 175, 0.25)',
      secondary: colors.gray[ 300 ],
      tertiary: colors.gray[ 400 ],
      dark: colors.gray[ 700 ],
      light: colors.gray[ 50 ],
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      DEFAULT: '#141414',
      dark: colors.gray[ 900 ],
      light: colors.white,
      'black-10': 'rgba(0, 0, 0, 0.1)',
      'black-25': 'rgba(0, 0, 0, 0.25)',
      'black-50': 'rgba(0, 0, 0, 0.5)',
      'black-75': 'rgba(0, 0, 0, 0.75)',
      'white-25': 'rgba(0, 0, 0, 0.25)',
    }),
    aspectRatio: [ 1, 2, 3, 4, 9, 10, 16, 21, 148, 285, 316, 641 ],
    animation: {
      'spin-infinite': 'spin 0.5s ease-in-out infinite',
      pop: 'pop 0.25s ease-in-out',
      rise: 'rise 0.25s ease-in-out',
      shrink: 'shrink 0.3s ease-in-out',
      'fly-in-from-left': 'fly-in-from-left 0.5s cubic-bezier(0,1,0.5,1)',
      sharpen: 'sharpen 0.25s ease-out',
      'fade-in': 'fade-in 1s ease-in 1s both',
      disabled: 'disabled 1s ease-in 0.5s forwards',
      heartbeat: 'heartbeat 1.5s forwards',
    },
    keyframes: {
      spin: {
        '100%': { transform: 'rotate(-360deg)' },
      },
      pop: {
        '0%': { transform: 'scale(0.5)' },
        '80%': { transform: 'scale(1.1)' },
      },
      rise: {
        '0%': {
          transform: 'translateY(55%)',
        },
        '70%': {
          transform: 'translateY(-15%)',
        },
      },
      shrink: {
        '0%': {
          transform: 'translateY(-20%)',
          opacity: '0%',
        },
        '50%': {
          transform: 'translateY(5%)',
          opacity: '100%',
        },
      },
      heartbeat: {
        '8%': {
          transform: 'scale(1.075)',
        },
        '15%': {
          transform: 'none',
        },
        '20%': {
          transform: 'none',
        },
        '30%': {
          transform: 'scale(1.25)',
        },
        '38%': {
          transform: 'scale(0.9)',
        },
        '45%': {
          transform: 'none',
        },
        '62%': {
          transform: 'none',
        },
        '80%': {
          transform: 'scale(1.1)',
        },
        '90%': {
          transform: 'none',
        },
      },
      'fly-in-from-left': {
        '0%': {
          transform: 'translateX(-75%)',
        },
      },
      sharpen: {
        '0%': {
          filter: 'blur(0px)',
        },
        '30%': {
          filter: 'blur(2px)',
        },
        '70%': {
          filter: 'blur(2px)',
        },
        '100%': {
          filter: 'blur(0px)',
        },
      },
      'fade-in': {
        '0%': {
          opacity: 0,
        },
      },
      'fade-out': {
        '100%': {
          opacity: 0.25,
        },
      },
      disabled: {
        '100%': {
          opacity: 0.6,
        },
      },
    },
    fontFamily: {
      sans: [
        'Roboto',
        '-apple-system',
        `'Helvetica Neue'`,
        'BlinkMacSystemFont',
        'Helvetica',
        'Arial',
        'sans-serif',
      ],
      mono: [
        'SFMono-Regular',
        'Consolas',
        'Courier New',
        'Courier',
        'monospace',
      ],
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
    },
    extend: {
      colors: {
        'primary-cyan': '#00B9AE',
        'light-gray': 'rgba(249, 249, 249, 0.1)',
        success: '#29B474',
        warning: '#fa8c16',
        danger: '#DC3545',
      },
      width: (theme, { breakpoints }) => ({
        ...breakpoints(theme('screens')),
      }),
      minWidth: theme => ({
        ...theme('spacing'),
      }),
      minHeight: theme => ({
        main: '348px',
        ...theme('spacing'),
        ...mapValues(theme('fontSize'), ([ fontSize, { lineHeight } ]) => lineHeight === '1' ? fontSize : lineHeight),
      }),
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
    backgroundImage: {
      times: `url('lib/fontawesome/far fa-times.svg')`,
      'chevron-left': `url('lib/fontawesome/far fa-chevron-left.svg')`,
      'chevron-right': `url('lib/fontawesome/far fa-chevron-right.svg')`,
      'chevron-down': `url('lib/fontawesome/far fa-chevron-down.svg')`,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [ intellisense, utilities, textShadow ],
  corePlugins: [
    'animation',
    'preflight',
    'alignItems',
    'appearance',
    'backdropBlur',
    'backgroundColor',
    'backgroundImage',
    'backgroundPosition',
    'backgroundRepeat',
    'backgroundSize',
    'borderColor',
    'borderRadius',
    'borderWidth',
    'boxShadow',
    'boxShadowColor',
    'boxSizing',
    'brightness',
    'cursor',
    'display',
    'divideWidth',
    'fill',
    'flex',
    'flexDirection',
    'flexGrow',
    'flexShrink',
    'flexWrap',
    'fontFamily',
    'fontSize',
    'fontStyle',
    'fontWeight',
    'height',
    'inset',
    'justifyContent',
    'margin',
    'maxHeight',
    'maxWidth',
    'minHeight',
    'minWidth',
    'objectFit',
    'opacity',
    'order',
    'outlineStyle',
    'overflow',
    'padding',
    'pointerEvents',
    'position',
    'resize',
    'ringColor',
    'ringWidth',
    'scale',
    'textAlign',
    'textColor',
    'textDecoration',
    'textOverflow',
    'textTransform',
    'transform',
    'transitionDelay',
    'transitionDuration',
    'transitionProperty',
    'textShadow',
    'userSelect',
    'whitespace',
    'wordBreak',
    'width',
    'zIndex',
  ],
}
