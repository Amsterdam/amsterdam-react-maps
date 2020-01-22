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

      {/* <Map
        ref={mapRef}
        events={{
          zoomend: () => {
            console.log("zoomend");
          },
          click: async e => {
            console.log("click");
            // addMarker(e.latlng);
            const pointInfo = await pointQuery(e);
            console.log("click results: ", pointInfo);
            setClickPointInfo(pointInfo);
          },
          move: () => {
            console.log("move");
          }
        }}
        options={{
          center: [52.3731081, 4.8932945],
          zoom: 10,
          crs: getCrs(),
          maxBounds: [
            [52.25168, 4.64034],
            [52.50536, 5.10737]
          ]
        }}
        style={{
          width: "100%",
          height: "100vh"
        }}
      >
        <ViewerContainer
          style={{ zIndex: 400 }}
          topLeft={<Geocoder {...geocoderProps} />}
          topRight={<GPSButton />}
          bottomRight={<Controls />}
          bottomLeft={
            <button type="button" onClick={moveMarker}>
              Move marker
            </button>
          }
        />
        <Marker
          setInstance={setMarker}
          args={[markerPosition]}
          options={{
            icon: DefaultMarkerIcon
          }}
        />
        {markers.map(latlng => (
          <Marker
            args={[latlng]}
            options={{
              icon: DefaultMarkerIcon
            }}
          />
        ))}
        <TileLayer
          args={["https://{s}.data.amsterdam.nl/topo_rd/{z}/{x}/{y}.png"]}
          options={{
            subdomains: ["acc.t1", "acc.t2", "acc.t3", "acc.t4"],
            tms: true,
            attribution:
              '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          }}
          methods={{
            openTooltip: e => {
              console.log(e);
            }
          }}
        />
        <NonTiledLayer
          {...{
            id: "kgem",
            url: "https://acc.map.data.amsterdam.nl/maps/brk",
            identify: false,
            format: "image/png",
            transparent: true,
            layers: ["kadastrale_gemeente", "kadastrale_gemeente_label"]
          }}
        />
      </Map> */}
    </ThemeProvider>
  );
};

export default App;
