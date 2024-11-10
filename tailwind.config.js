module.exports = {
  purge: [],
  darkMode: 'media',
  theme: {
    
    extend: {
      colors: {
        'dark-green': '#1A2D31',
        'utd-green' : '#275844',
        'navy-blue' : '#121025',
        'dark-orange' : '#633816',
        'utd-orange' : '#95510D',

      },
      fontFamily: {
        majorMonoDisplay: ["MAJORMONO", "sans"],
        manjari: ["MANJARI", "sans-serif"], //not too sure if it's monspace, sans-srif, sans, etc...
        manjari2: ["MANJARI-THIN", "sans-serif"]
      },
      
    
      backgroundColor:{
        'bg-opacity-50': 'rgba(39, 88, 68, 0.5)',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'hover', 'focus'],
    },
  },
  plugins: [],
};
