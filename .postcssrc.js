// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {
    	browsers: ['last 100 versions']
    },
    "postcss-px2rem": {
    	remUnit: 75
    }
  }
}
