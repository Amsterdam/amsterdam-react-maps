import React, { useCallback } from 'react'
import 'leaflet/dist/leaflet.css'
import { Link } from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import SearchResultsListStyle from './SearchResultsListStyle'

const StyledLink = styled(Link)<{ active?: boolean }>`
  // @ts-ignore
  font-weight: ${({ active }) => (active ? 700 : 400)};

  &:hover {
    font-weight: 700;
    cursor: pointer;
  }
`

const SearchResultsListItem = ({
  id,
  name,
  selected,
  index,
  onSelect,
}: any) => (
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
)

const SearchResultsList = ({ items, selected, onSelect }: any) => {
  const handleSelectedLink = useCallback(
    index => {
      onSelect(index)
    },
    [onSelect],
  )

  return (
    items && (
      <SearchResultsListStyle>
        <ul>
          {items &&
            items.map(({ id, name }: any, index: number) => (
              <SearchResultsListItem
                key={id}
                id={id}
                name={name}
                index={index}
                selected={selected}
                onSelect={handleSelectedLink}
              />
            ))}
        </ul>
      </SearchResultsListStyle>
    )
  )
}

export default SearchResultsList
