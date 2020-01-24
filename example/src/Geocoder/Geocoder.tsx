import React, { useEffect, useState, useCallback } from 'react'
import 'leaflet/dist/leaflet.css'
import { SearchBar } from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import { useMapInstance } from '@datapunt/react-maps'
import SearchResultsList from './SearchResultsList'
import { nearestAdresToString } from './services/transformers'

const GeocoderStyle = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
`

const inputProps: any = {
  autoCapitalize: 'off',
  autoComplete: 'off',
  autoCorrect: 'off',
}

const Geocoder = ({
  marker,
  clickPointInfo,
  placeholder,
  getSuggestions,
  getAddressById,
  ...otherProps
}: any) => {
  const { mapInstance } = useMapInstance()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [addressText, setAddressText] = useState('')
  const [location, setLocation] = useState()
  const [addressId, setAddressId] = useState()

  const onSelect = useCallback(
    index => {
      const { name, id } = searchResults[index]
      setAddressText(name)
      setSelectedIndex(-1)
      setSearchResults([])
      setAddressId(id)
    },
    [searchResults],
  )

  useEffect(() => {
    ;(async () => {
      if (addressId === '') return

      const location = await getAddressById(addressId)
      if (location) {
        setLocation(location)
      }
      setAddressId('')
    })()
  }, [addressId, getAddressById])

  const getSearchValue = useCallback(() => {
    return selectedIndex > -1
      ? // @ts-ignore
        searchResults[selectedIndex].name
      : searchTerm === ''
      ? addressText
      : searchTerm
  }, [selectedIndex, searchResults, searchTerm, addressText])

  useEffect(() => {
    if (selectedIndex > -1) return
    if (searchTerm.length < 3) {
      setSelectedIndex(-1)
      setSearchResults([])
      return
    } else {
      ;(async () => {
        const suggestions = await getSuggestions(searchTerm)
        // @ts-ignore
        setSearchResults([...suggestions])
      })()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  useEffect(() => {
    if (!clickPointInfo) return
    const { location, nearestAdres } = clickPointInfo
    marker.setLatLng(location)
    marker.setOpacity(1)
    setAddressText(nearestAdresToString(nearestAdres))
    setSearchTerm('')
    setSelectedIndex(-1)
    setSearchResults([])
  }, [clickPointInfo, marker])

  const flyTo = useCallback(
    location => {
      const currentZoom = mapInstance.getZoom()
      mapInstance.flyTo(location, currentZoom < 11 ? 11 : currentZoom)
      marker.setOpacity(1)
    },
    [mapInstance, marker],
  )

  useEffect(() => {
    if (!location) return
    if (selectedIndex !== -1) {
      setAddressText(searchResults[selectedIndex].name)
    }
    // setSearchResults([]) // Todo: causes the browser to crash?
    setSelectedIndex(-1)
    setSearchTerm('')
    marker.setLatLng(location)
    flyTo(location)
    setLocation(location)
  }, [flyTo, location, marker, searchResults, selectedIndex])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.keyCode) {
      // Arrow up
      case 38:
        // By default the up arrow puts the cursor at the
        // beginning of the input, we don't want that!
        event.preventDefault()

        setSelectedIndex(selectedIndex > -1 ? selectedIndex - 1 : selectedIndex)
        break

      // Arrow down
      case 40:
        setSelectedIndex(
          selectedIndex < searchResults.length - 1
            ? selectedIndex + 1
            : selectedIndex,
        )
        break

      // Escape
      case 27:
        setAddressText('')
        setSearchTerm('')
        setSelectedIndex(-1)
        setSearchResults([])
        marker.setOpacity(0)
        break

      // Enter
      case 13:
        if (selectedIndex > -1) {
          // @ts-ignore
          setAddressId(searchResults[selectedIndex].id)
        }
        break

      default:
        break
    }
  }

  const handleOnSubmit = () => {
    if (searchResults.length === 0) return
    selectedIndex === -1 ? onSelect(0) : onSelect(selectedIndex)
  }

  const handleOnChange = (value: any): void => {
    setSelectedIndex(-1)
    addressText !== '' ? setSearchTerm(value) : setAddressText('')
    if (value === '') {
      setAddressText(value)
      marker.setOpacity(0)
    }
  }

  const handleOnWatchValue = (value: string) => {
    if (addressText === '' && searchTerm !== value) setSearchTerm(value)
  }

  return (
    <GeocoderStyle {...otherProps}>
      <SearchBar
        placeholder={placeholder || 'Zoek adres'}
        inputProps={inputProps}
        onWatchValue={handleOnWatchValue}
        onSubmit={handleOnSubmit}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        value={getSearchValue()}
      />
      <SearchResultsList
        items={searchResults}
        selected={selectedIndex}
        onSelect={onSelect}
      />
    </GeocoderStyle>
  )
}

export default Geocoder
