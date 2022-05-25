const DEFAULTS = {
  layoutspacing: '1.5rem',
  containerwidths: {
    lg: '70rem'
  }
}

const colors = {
  'white': '#fff',
  'tan': '#F8F6F3',
  'brand_black': '#101010',
  'brand_blue': '#007BAF',//F4F9FB
  'mobileNav_bg-default': '#37507a',
  'mobileNav_bg-active': '#35baf2'
}

module.exports = {
  content: ["./**/*.html"],
  theme: {
    colors: colors,
    container: {
      center: true
    },
    extend: {
      fontSize: {
        navItems: "clamp(0.6rem, 1.5vw, 2rem)"
      },
      gap: {
        default: DEFAULTS.layoutspacing
      },
      width: {
        heroCaptionWidth: 'clamp(20rem, 40vw, 30rem)'
      },
      padding: {
        default: DEFAULTS.layoutspacing
      },
      margin: {
        default: DEFAULTS.layoutspacing
      },
      maxWidth: {
        lg: DEFAULTS.containerwidths.lg
      }
    },
    fontFamily: {
      'display': ['Fira Sans', 'serif'],
      'body': ['Source Sans Pro', 'sans-serif']
    }
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
