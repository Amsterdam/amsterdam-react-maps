module.exports = {
  extends: ['../.eslintrc.js'],
  rules: {
    // Since we only use the example directory to show different usecases, we don't need to include
    // react-router-dom as a dependency and therefore ignore this eslint warning
    'import/no-extraneous-dependencies': 0,
  },
}
