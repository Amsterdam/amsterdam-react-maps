import React, { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { Map, TileLayer, Marker } from "@datapunt/react-maps";
import {
  ThemeProvider,
  GlobalStyle,
  ViewerContainer,
} from "@datapunt/asc-ui";
import Controls from "./Zoom";
import GPSButton from "./GPSButton";
import getCrs from "./utils/getCrs";
import DefaultMarkerIcon from "./DefaultMarkerIcon";
import NonTiledLayer from "./NonTiledLayer";
import { pointQuery } from "./utils/pointQuery";
import Geocoder from "./Geocoder";

const App = () => {
  const [defaultMarker, setDefaultMarker] = useState();
  const [markerPosition, setMarkerPosition] = useState({
    lat: 52.3731081,
    lng: 4.8932945
  });
  const [clickPointInfo, setClickPointInfo] = useState();

  const [markers, setMarkers] = useState([]);

  const mapRef = useRef(null);

  function moveMarker() {
    const { lat, lng } = markerPosition;
    setMarkerPosition({
      lat: lat + 0.0001,
      lng: lng + 0.0001
    });
  }

  const addMarker = latlng => {
    setMarkers(c => [...c, latlng]);
  };

  useEffect(() => {
    if (defaultMarker) {
      defaultMarker.setLatLng(markerPosition);
    }
  }, [defaultMarker, markerPosition]);

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Map
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
          topLeft={<Geocoder marker={defaultMarker} clickPointInfo={clickPointInfo}/>}
          topRight={<GPSButton />}
          bottomRight={<Controls />}
          bottomLeft={
            <button type="button" onClick={moveMarker}>
              Move marker
            </button>
          }
        />
        <Marker
          setInstance={setDefaultMarker}
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
      </Map>
    </ThemeProvider>
  );
};

export default App;
