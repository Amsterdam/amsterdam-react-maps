import React, { useEffect, useState, useCallback, useReducer } from 'react'
import 'leaflet/dist/leaflet.css'
import { SearchBar } from '@datapunt/asc-ui'
import { useMapInstance } from '@datapunt/react-maps'
import SearchResultsList from './SearchResultsList'
import { nearestAdresToString } from './services/transformers'
import {
  reducer,
  searchTermSelected,
  clearSearchResults,
  searchResultsChanged,
  resultSelected,
  searchTermChanged,
  initialState,
} from './ducks'
import GeocoderStyle from './GeocoderStyle'

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
  const mapInstance = useMapInstance()
  const [{ term, results, index, searchMode }, dispatch] = useReducer(
    reducer,
    initialState,
  )
  const [markerLocation, setMarkerLocation] = useState()

  const onSelect = async (idx: number) => {
    dispatch(searchTermSelected(results[idx].name))
    const { id } = results[idx]
    const location = await getAddressById(id)
    if (location) {
      setMarkerLocation(location)
    }
    dispatch(clearSearchResults())
  }

  useEffect(() => {
    if (!searchMode) return
    if (index > -1) return
    if (term.length < 3) {
      dispatch(clearSearchResults())
    } else {
      ;(async () => {
        const suggestions = await getSuggestions(term)
        dispatch(searchResultsChanged(suggestions))
      })()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term])

  useEffect(() => {
    if (!clickPointInfo) return
    const { location, nearestAdres } = clickPointInfo
    marker.setLatLng(location)
    marker.setOpacity(1)
    dispatch(searchTermSelected(nearestAdresToString(nearestAdres)))
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
    if (!markerLocation) return
    marker.setLatLng(markerLocation)
    flyTo(markerLocation)
    setMarkerLocation(markerLocation)
  }, [markerLocation])

  const handleKeyDown = async (event: React.KeyboardEvent) => {
    switch (event.keyCode) {
      // Arrow up
      case 38:
        // By default the up arrow puts the cursor at the
        // beginning of the input, we don't want that!
        event.preventDefault()

        dispatch(resultSelected(index > -1 ? index - 1 : index))
        break

      // Arrow down
      case 40:
        dispatch(resultSelected(index < results.length - 1 ? index + 1 : index))
        break

      // Escape
      case 27:
        dispatch(searchTermChanged(''))
        dispatch(clearSearchResults())
        marker.setOpacity(0)
        break

      // Enter
      case 13:
        if (index > -1) {
          await onSelect(index)
        }
        break

      default:
        break
    }
  }

  const handleOnSubmit = async () => {
    if (results.length === 0) return
    const idx = index === -1 ? 0 : index
    onSelect(idx)
  }

  const handleOnChange = (value: any): void => {
    dispatch(searchTermChanged(value))
    if (value === '') {
      marker.setOpacity(0)
    }
  }

  return (
    <GeocoderStyle {...otherProps}>
      <SearchBar
        placeholder={placeholder || 'Zoek adres'}
        inputProps={inputProps}
        onSubmit={handleOnSubmit}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        value={term}
      />
      <SearchResultsList items={results} selected={index} onSelect={onSelect} />
    </GeocoderStyle>
  )
}

export default Geocoder
