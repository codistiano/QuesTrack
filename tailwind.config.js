export default {
  content: [
    './views/**/*.ejs',
    './public/**/*.js',
    'node_modules/preline/dist/*.js',
    'node_modules/preline/dist/*.mjs',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('preline/plugin'),
  ],
}
