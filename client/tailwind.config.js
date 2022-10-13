/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: '#4982F3',
      black: '#2B2E30',
      grey: { default: '#333333', hover: '#33333F' },
      pink: '#FCDDEE',
      blue: {
        dark: '#042552',
        light: '#E5EDFC',
        default: '#0D59EF',
        hover: '#0D10FF'
      },
      cyan: '#09B6E0',
      yellow: '#FFB619',
      'light-green': '#01D2A1',
      white: '#fff'
    },
    fontSize: {
      xsmall: '12px',
      small: '24px',
      large: '40px',
      xlarge: '48px',
      regular: '16px'
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      serif: ['Poppins', 'serif']
    },
    borderRadius: {
      default: '8px'
    },
    extend: {}
  }
}
