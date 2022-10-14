/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: { default: '#4982F3', hover: '#5982FF' },
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
      green: '#01D2A1',
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
      1: '8px',
      2: '16px'
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      3: '3px',
      4: '8px',
      6: '12px',
      8: '16px'
    },
    extend: {}
  }
}
