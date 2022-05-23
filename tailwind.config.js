module.exports = {
  content: ["./**/*.html"],
  theme: {
    colors: {
      'white': '#fff',
      'brand_black': '#101010',
      'mobileNav_bg-default': '#37507a',
      'mobileNav_bg-active': '#35baf2'
    },
    container: {
      center: true
    },
    extend: {
      fontSize: {
        navItems: "clamp(0.6rem, 1.5vw, 2rem)"
      },
      gap: {
        default: '1.5rem'
      },
      padding: {
        default: '1.5rem'
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
