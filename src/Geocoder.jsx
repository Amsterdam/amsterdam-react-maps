import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { SearchBar } from "@datapunt/asc-ui";
import styled from "@datapunt/asc-core";

const AutoSuggestListStyle = styled.div`
  background-color: #fff;
  border: 1px solid grey;
  width: calc(100% - 45px);
  box-shadow: 2px 2px 0 0 #999;
  margin-top: -2px;

  & > ul {
    margin: 0;
    padding: 0;

    li {
      list-style: none;
      font-size: 0;

      display: inline-block;

      font-size: 16px;
      text-decoration: none;
      text-overflow: ellipsis;
      padding: 0 6px 0 7px;
      width: 100%;
      height: 32px;
      line-height: 32px;
      overflow: hidden;
      white-space: nowrap;
    }
  }
`;

const AutoSuggestList = ({ items, id, name, value, onChange, onSelect }) => {
  return (
    items && (
      <AutoSuggestListStyle>
        <ul>
          {items &&
            items.map(item => (
              <li key={item[id]} id={item[id]}>
                {item[name]}
              </li>
            ))}
        </ul>
      </AutoSuggestListStyle>
    )
  );
};

const GeocoderStyle = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
`;

const Geocoder = () => {
  const [term, setTerm] = useState("");
  const [location, setLocation] = useState({});
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(term);
      if (!term || term.length < 3) {
        setResults([]);
        return;
      }

      const result = await fetch(
        `https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?fq=gemeentenaam:amsterdam&fq=type:adres&q=${term}`
      );
      const data = await result.json();
      setResults([...data.response.docs]);
    };

    fetchData();
  }, [term]);

  return (
    <GeocoderStyle>
      <SearchBar
        placeholder="Enter the search text"
        onWatchValue={value => {
          setTerm(value);
        }}
        onSubmit={() => {}}
        value={term}
      ></SearchBar>
      <AutoSuggestList
        items={results}
        id="id"
        name="weergavenaam"
        value="weergavenaam"
        onChange={e => setTerm(e.value)}
        onSelect={e => {
          setTerm(e.value);
          setLocation(e.location);
        }}
      ></AutoSuggestList>
    </GeocoderStyle>
  );
};

export default Geocoder;
