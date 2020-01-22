import React from "react";
import "leaflet/dist/leaflet.css";
import { ThemeProvider, GlobalStyle } from "@datapunt/asc-ui";
import { Route, BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Router>
        <div>
          {Object.keys(AppRoutes).map(key => {
            const { path, component } = AppRoutes[key];
            return (
              <Route
                key={key}
                path={path}
                component={component}
                exact={key === "HOME"}
              />
            );
          })}
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
