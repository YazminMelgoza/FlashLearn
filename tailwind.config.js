/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    
    './src/**/*.{html,ts,vue}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', 'sans-serif']
      },

      colors: {
        primary: {
          'fondo':'#FFFFFF',
          'progreso1': '#816D00',
          'iconoprogreso1': "#9E8600",
          'seleccionado': '#003B8C',
          'noseleccionado': '#ABABAB',
          'bloques': '#F5F7FF',
          'botonañadir': '#240A8F',
          '100': '#003050',
          '200': '#D8FEFB',
          '300': '#BAF8EF',
          '400': '#96E6D7',
          '500': '#6CC4AE',
          '600': '#449D81',
          '700': '#2C755A',
          '800': '#1B4E38',
          '900': '#0D261A',
          'barracolor': '#96E6D7'
        },
        accent: {
          '100': '#F8F2FF',
          '200': '#DAC0FE',
          '300': '#B189F5',
          '400': '#7D51DF',
          '500': '#431EB3',
          '600': '#240A8F',
          '700': '#10026C',
          '800': '#060049',
          '900': '#010026'
        }
      }
    },
  },
  plugins: [],
}

