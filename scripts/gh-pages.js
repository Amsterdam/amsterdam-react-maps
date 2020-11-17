const ghpages = require('gh-pages')

ghpages.publish('stories/lib', (err) => {
  console.warn(err)
  process.exit(1)
})
