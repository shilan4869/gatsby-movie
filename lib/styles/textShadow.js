const plugin = require('tailwindcss/plugin')

const textShadow = ({ matchUtilities, theme }) => {
  matchUtilities(
    {
      'text-shadow': value => ({
        textShadow: value,
      }),
    },
    { values: theme('textShadow') },
  )
}

module.exports = plugin(textShadow)
