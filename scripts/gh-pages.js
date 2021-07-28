// eslint-disable-next-line
const ghpages = require('gh-pages')

ghpages.publish('stories/lib', (err) => {
  // eslint-disable-next-line no-console
  console.warn(err)
  process.exit(1)
})
