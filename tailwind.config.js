module.exports = {
  content: [
    "./public/**/*.css",
    "./views/**/*.ejs",
  ],
  theme: {
    colors: {
      primary: '#26b88b',
      secondary: '#3c4240',
      dark: '#0b1e1e'
    },
  },
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer')
  ]
}