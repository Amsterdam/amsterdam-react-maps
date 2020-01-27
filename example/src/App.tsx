import React from 'react'
import { ThemeProvider, GlobalStyle } from '@datapunt/asc-ui'
// Since we only use the example directory to show different usecases, we don't need to include
// react-router-dom as a dependency and thus ignore this eslint warning
// eslint-disable-next-line import/no-extraneous-dependencies
import { Route, BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import 'leaflet/dist/leaflet.css'

const App = () => (
  <ThemeProvider>
    <GlobalStyle />
    <Router>
      {Object.entries(AppRoutes).map(([key, options]) => (
        <Route key={key} {...options} />
      ))}
    </Router>
  </ThemeProvider>
)

export default App
