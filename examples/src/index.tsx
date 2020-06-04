import 'core-js/es/map'
import 'core-js/es/set'

// The Symbol polyfill is needed for transformation done by @babel/preset-react.
// For more information see: https://github.com/facebook/react/issues/8379
import 'core-js/es/symbol'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App />, window.document.getElementById('root'))
