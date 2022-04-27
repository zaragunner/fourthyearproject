module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      inset: {
         right :{
           "18" : "4.5rem"
         },
      },
     height :{
        "100" : 	'36rem'
     },

        outline: {
          gray: '1.5px solid #d1d5db',
        },
      colors: {
        indigo: {
          // theme('colors.indigo.light')
          light: '#b3bcf5',
  
          // theme('colors.indigo.DEFAULT')
          DEFAULT: '#5c6ac4',
        },
  
        // theme('colors.indigo-dark')
        'indigo-dark': '#202e78',
      }
    
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
