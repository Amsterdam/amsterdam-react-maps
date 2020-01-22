import React, { useEffect, useState, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import { SearchBar } from "@datapunt/asc-ui";
import styled from "@datapunt/asc-core";
import { useMapInstance } from "@datapunt/react-maps";
import SearchResultsList from './SearchResultsList';
import { wktPointToLocation, nearestAdresToString } from './services/transformers';

const GeocoderStyle = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
`;

const GEOCODER_API_SUGGEST =
  "https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?fq=gemeentenaam:amsterdam&fq=type:adres&q=";
const GEOCODER_API_LOOKUP =
  "https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?fq=gemeentenaam:amsterdam&fq=type:adres&id=";

const inputProps = {
  autoCapitalize: "off",
  autoComplete: "off",
  autoCorrect: "off"
};

const Geocoder = ({ marker, clickPointInfo }) => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(-1);
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState();
  const [id, setId] = useState();
  const { mapInstance } = useMapInstance();

  const onSelect = index => {
    const { weergavenaam: address, id } = results[index];
    setAddress(address);
    setSelected(-1);
    setResults([]);
    setId(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id === "") return;

      const result = await fetch(`${GEOCODER_API_LOOKUP}${id}`);
      const { response } = await result.json();
      // console.log(data);
      if (response.docs[0]) {
        console.log(response.docs[0]);
        const location = wktPointToLocation(response.docs[0].centroide_ll);
        setLocation(location);
      }
      setId("");
    };

    fetchData();
  }, [id]);

  const getCurrentValue = useCallback(() => {
    return selected > -1
      ? results[selected].weergavenaam
      : term === ""
      ? address
      : term;
  }, [selected, results, term, address]);

  useEffect(() => {
    const fetchData = async () => {
      if (selected > -1) return;
      if (!term || term.length < 3) {
        setResults([]);
        return;
      }

      const result = await fetch(`${GEOCODER_API_SUGGEST}${term}`);
      const data = await result.json();
      setResults([...data.response.docs]);
    };
    console.log("fetchData", selected, term);
    fetchData();
  }, [selected, term]);

  useEffect(() => {
    console.log("pointClickInfo", clickPointInfo);
    if (!clickPointInfo) return;
    const { location, nearestAdres } = clickPointInfo;
    marker.setLatLng(location);
    setSelected(-1);
    setResults([]);
    setAddress(nearestAdresToString(nearestAdres));
    setTerm("");
  }, [clickPointInfo, marker]);

  const flyTo = useCallback(
    location => {
      const currentZoom = mapInstance.getZoom();
      mapInstance.flyTo(location, currentZoom < 11 ? 11 : currentZoom);
      marker.setOpacity(1);
    },
    [mapInstance, marker]
  );

  useEffect(() => {
    if (!location) return;
    if (selected !== -1) setAddress(results[selected].weergavenaam);
    setSelected(-1);
    setResults([]);
    setTerm("");
    marker.setLatLng(location);
    flyTo(location);
    setLocation();
  }, [flyTo, location, marker, results, selected]);

  const handleKeyDown = event => {
    if (results.length === 0) return;
    console.log(event.keyCode);
    switch (event.keyCode) {
      // Arrow up
      case 38:
        // By default the up arrow puts the cursor at the
        // beginning of the input, we don't want that!
        event.preventDefault();

        setSelected(selected > -1 ? selected - 1 : selected);
        break;

      // Arrow down
      case 40:
        setSelected(selected < results.length - 1 ? selected + 1 : selected);
        break;

      // Escape
      case 27:
        setSelected(-1);
        setAddress("");
        setTerm("");
        console.log(marker);
        debugger;
        marker.setOpacity(0);
        break;

      // Enter
      case 13:
        if (selected > -1) {
          console.log(
            "show addres in the map for: " + results[selected].weergavenaam
          );
          setId(results[selected].id);
        }
        break;
      default:
        break;
    }
  };

  return (
    <GeocoderStyle>
      <SearchBar
        placeholder="Enter the search text"
        onWatchValue={value => {
          console.log("onWatchValue", value, address, term);
          if (address === "" && term !== value) setTerm(value);
        }}
        onSubmit={() => {
          console.log("onSubmit");
        }}
        onChange={e => {
          console.log("onChange", e);
          setSelected(-1);
          address !== "" ? setTerm(e) : setAddress("");
          if (e === "") {
            setAddress(e);
            marker.setOpacity(0);
          }
        }}
        onKeyDown={e => {
          console.log("onKeyDown");
          handleKeyDown(e);
        }}
        value={getCurrentValue()}
        inputProps={inputProps}
      ></SearchBar>
      <SearchResultsList
        items={results}
        selected={selected}
        id="id"
        name="weergavenaam"
        value="weergavenaam"
        onSelect={onSelect}
      ></SearchResultsList>
    </GeocoderStyle>
  );
};

export default Geocoder;
