const plugin = require('tailwindcss/plugin')

const utilities = ({ addUtilities, theme }) => {
  // replaces tailwind spacing utility
  const spacing = Object.entries(theme('spacing'))
    .map(([ amount, value ]) => [ amount, value.match(/^([0-9.]+)(\w+)?$/) ])
    .map(([ amount, [ , value, unit = 'px' ] ]) => ({
      [ `.space-${ amount }` ]: {
        margin: `-${ value / 2 }${ unit }`,
      },
      [ `.space-${ amount } > *` ]: {
        padding: `${ value / 2 }${ unit }`,
      },
      [ `.space-x-${ amount } > * + *` ]: {
        marginLeft: `${ value }${ unit }`,
      },
      [ `.space-y-${ amount } > * + *` ]: {
        marginTop: `${ value }${ unit }`,
      },
    }))

  const span = Array(25)
    .fill(0)
    .map((v, span) => ({
      [ `.span-${ span }` ]: {
        // this is mandatory for the flex items to play with margin and padding
        minWidth: 0,
        flexBasis: `${ (span * 100 / 24).toFixed(8) }%`,
      },
    }))

  const lineClamp = Array(5)
    .fill(0)
    .map((v, index) => index + 1)
    .map(value => ({
      [ `.line-clamp-${ value }` ]: {
        display: '-webkit-box',
        '-webkit-line-clamp': String(value),
        '-webkit-box-orient': 'vertical',
      },
    }))

  const aspectRatio = theme('aspectRatio', [])
    .map(value => ({
      [ `.aspect-w-${ value }` ]: {
        '--tw-aspect-w': String(value),
      },
      [ `.aspect-h-${ value }` ]: {
        '--tw-aspect-h': String(value),
      },
    }))
    .concat({
      '.aspect-ratio': {
        position: 'relative',
        paddingBottom: `calc(var(--tw-aspect-h) / var(--tw-aspect-w) * 100%)`,
      },
      '.aspect-ratio > *': {
        position: 'absolute',
        width: '100%',
        height: '100%',
      },
    })

  const animation = [
    {
      '.animation-reverse': {
        animationDirection: 'reverse',
      },
      '.animation-forwards': {
        animationFillMode: 'forwards',
      },
    },
  ]

  const invert = [
    {
      '.invert': {
        filter: 'invert(100%)',
      },
      '.invert-0': {
        filter: 'invert(0)',
      },
    },
  ]

  const utilities = [
    spacing,
    span,
    lineClamp,
    aspectRatio,
    animation,
    invert,
  ]

  utilities.flat().forEach(addUtilities)
}

module.exports = plugin(utilities)
