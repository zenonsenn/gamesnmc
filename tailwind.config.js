/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  future: {
    // Disables hover on touch-screen devices
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // Magazine (Anybody) cotout weights
    'font-[300]',
    'font-[400]',
    'font-[500]',
    'font-[600]',
    'font-[700]',
    'font-[800]',
    // Magazine (Anybody) cutout
    'fw-70',
    'fw-80',
    'fw-90',
    'fw-100',
    'fw-110',
    'fw-120',
    'fw-130',
    'fw-140',
    'fw-150',
  ],
}
