module.exports = {
  content: [
    "./public/**/*.css",
    "./views/**/*.ejs",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer')
  ]
}