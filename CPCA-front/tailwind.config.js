/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xxs: '320px',    // Extra extra small devices (phones, less than 320px)
        xs: '480px',     // Extra small devices (phones, up to 480px)
        sm: '640px',     // Small devices (landscape phones, 640px and up)
        md: '768px',     // Medium devices (tablets, 768px and up)
        lg: '1024px',    // Large devices (desktops, 1024px and up)
        xl: '1280px',    // Extra large devices (large desktops, 1280px and up)
      },
      animation: {
        bounce: 'bounce 2s ease-in-out infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['dim'],
  },
};