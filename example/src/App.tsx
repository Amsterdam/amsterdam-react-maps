import React, { useEffect } from 'react'
import { ThemeProvider, GlobalStyle } from '@datapunt/asc-ui'
import 'leaflet/dist/leaflet.css'
import { Route, BrowserRouter as Router, useHistory } from 'react-router-dom'
import AppRoutes from './AppRoutes'

const defaultRoute = '/geojson-wfs' // '/';

const App = () => {
  useEffect(() => {
    window.history.pushState({}, '', defaultRoute)
  }, [])

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Router>
        {Object.entries(AppRoutes).map(([key, options]) => (
          <Route key={key} {...options} />
        ))}
      </Router>
    </ThemeProvider>
  )
}

export default App
