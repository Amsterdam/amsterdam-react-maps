import React from 'react'
import { ThemeProvider, GlobalStyle } from '@datapunt/asc-ui'
import 'leaflet/dist/leaflet.css'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './AppRoutes'

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
