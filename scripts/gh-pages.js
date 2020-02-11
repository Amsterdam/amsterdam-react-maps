/* eslint-disable no-console,import/no-extraneous-dependencies */
const ghpages = require('gh-pages')

ghpages.publish('dist', err => {
  console.warn(err)
  process.exit(1)
})
