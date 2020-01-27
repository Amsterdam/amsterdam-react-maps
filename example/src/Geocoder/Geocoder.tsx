import React, { useEffect, useState, useCallback, useReducer } from 'react'
import 'leaflet/dist/leaflet.css'
import { SearchBar } from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import { useMapInstance } from '@datapunt/react-maps'
import SearchResultsList from './SearchResultsList'
import { nearestAdresToString } from './services/transformers'

interface GeocoderState {
  term: string
  address: string
  results: any[]
  index: number
  searchMode: boolean
}

const initialState: GeocoderState = {
  term: '',
  address: '',
  results: [],
  index: -1,
  searchMode: true,
}

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

interface ActionType {
  type: string
  payload: any
}

const SEARCH_TERM_CHANGED = 'SEARCH_TERM_CHANGED'
const searchTermChanged = (value: string) => ({
  type: SEARCH_TERM_CHANGED,
  payload: value,
})

const SEARCH_TERM_SELECTED = 'SEARCH_TERM_SELECTED'
const searchTermSelected = (value: string) => ({
  type: SEARCH_TERM_SELECTED,
  payload: value,
})

const SEARCH_RESULTS_CHANGED = 'SEARCH_RESULTS_CHANGED'
const searchResultsChanged = (results: any[]) => ({
  type: SEARCH_RESULTS_CHANGED,
  payload: results,
})

const RESULT_SELECTED = 'RESULT_SELECTED'
const resultSelected = (index: number) => ({
  type: RESULT_SELECTED,
  payload: index,
})

const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS'
const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS,
  payload: null,
})

const reducer = (state: any, action: ActionType) => {
  console.log(action.type)
  switch (action.type) {
    case SEARCH_TERM_CHANGED:
      return {
        ...state,
        term: action.payload,
        indeobjectobjectx: -1,
        results: [],
        searchMode: true,
      }

    case SEARCH_TERM_SELECTED:
      return {
        ...state,
        term: action.payload,
        index: -1,
        searchMode: false,
      }

    case SEARCH_RESULTS_CHANGED:
      return {
        ...state,
        index: -1,
        results: [...action.payload],
      }

    case RESULT_SELECTED:
      return {
        ...state,
        term: action.payload === -1 ? '' : state.results[action.payload].name,
        index: action.payload,
      }

    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        index: -1,
        results: [],
      }

    default:
      return state
  }
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
  const [state, dispatch] = useReducer(reducer, initialState)
  const [markerLocation, setMarkerLocation] = useState()

  useEffect(() => {
    console.log('state changed', state)
  }, [state])

  const onSelect = async (index: number) => {
    dispatch(searchTermSelected(state.results[index].name))
    const { id } = state.results[index]
    const location = await getAddressById(id)
    if (location) {
      setMarkerLocation(location)
    }
    dispatch(clearSearchResults())
  }

  useEffect(() => {
    if (!state.searchMode) return
    if (state.index > -1) return
    if (state.term.length < 3) {
      dispatch(clearSearchResults())
    } else {
      ;(async () => {
        const suggestions = await getSuggestions(state.term)
        dispatch(searchResultsChanged(suggestions))
      })()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.term])

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

        dispatch(
          resultSelected(state.index > -1 ? state.index - 1 : state.index),
        )
        break

      // Arrow down
      case 40:
        dispatch(
          resultSelected(
            state.index < state.results.length - 1
              ? state.index + 1
              : state.index,
          ),
        )
        break

      // Escape
      case 27:
        dispatch(searchTermChanged(''))
        dispatch(clearSearchResults())
        marker.setOpacity(0)
        break

      // Enter
      case 13:
        if (state.index > -1) {
          await onSelect(state.index)
        }
        break

      default:
        break
    }
  }

  const handleOnSubmit = async () => {
    if (state.results.length === 0) return
    const index = state.index === -1 ? 0 : state.index
    onSelect(index)
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
        value={state.term}
      />
      <SearchResultsList
        items={state.results}
        selected={state.index}
        onSelect={onSelect}
      />
    </GeocoderStyle>
  )
}

export default Geocoder
