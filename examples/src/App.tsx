import React from 'react'
import { ThemeProvider, GlobalStyle } from '@datapunt/asc-ui'
import { Route, HashRouter as Router } from 'react-router-dom'
import AppRoutes from './AppRoutes'

import 'leaflet/dist/leaflet.css'

const App: React.FC = () => (
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
