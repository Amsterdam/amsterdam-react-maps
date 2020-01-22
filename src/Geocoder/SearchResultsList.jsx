import React, { useCallback } from "react";
import "leaflet/dist/leaflet.css";
import { Link } from "@datapunt/asc-ui";
import styled from "@datapunt/asc-core";
import SearchResultsListStyle from './SearchResultsListStyle';

const StyledLink = styled(Link)`
  font-weight: ${({ active }) => (active ? 700 : 400)};

  &:hover {
    font-weight: 700;
    cursor: pointer;
  }
`;

const SearchResultsListItem = ({ id, name, selected, index, onSelect }) => {
  return (
    <li>
      <StyledLink
        id={id}
        active={index === selected}
        variant="blank"
        onClick={() => onSelect(index)}
      >
        {name}
      </StyledLink>
    </li>
  );
};

const SearchResultsList = ({ items, id, name, selected, onSelect }) => {
  const handleSelectedLink = useCallback(
    index => {
      console.log("handleSelectedLink", index);
      onSelect(index);
    },
    [onSelect]
  );

  return (
    items && (
      <SearchResultsListStyle>
        <ul>
          {items &&
            items.map((item, index) => (
              <SearchResultsListItem
                key={item[id]}
                id={item[id]}
                name={item[name]}
                index={index}
                selected={selected}
                onSelect={handleSelectedLink}
              />
            ))}
        </ul>
      </SearchResultsListStyle>
    )
  );
};

export default SearchResultsList;
