import React from "react";
import L from "leaflet";
import { Button } from "@datapunt/asc-ui";
import { useMapInstance } from "@datapunt/react-maps";

const GPSButton = () => {
  const { mapInstance } = useMapInstance();
  const [loading, setLoading] = React.useState(false);
  const geoLocationSupported = navigator.geolocation;

  const setUserLocation = () => {
    setLoading(true);
    if (geoLocationSupported) {
      navigator.geolocation.getCurrentPosition(position => {
        setLoading(false);
        mapInstance.panTo(
          new L.LatLng(position.coords.latitude, position.coords.longitude)
        );
      });
    } else {
      setLoading(false);
      alert("Geolocation is not supported by this browser.");
    }
  };
  return (
    <>
      {loading && <strong>loading</strong>}
      <Button disabled={!geoLocationSupported} onClick={setUserLocation}>
        User location
      </Button>
    </>
  );
};

export default GPSButton;
