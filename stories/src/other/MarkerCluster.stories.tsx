// import { withKnobs, boolean, number } from '@storybook/addon-knobs'
import { Map, ViewerContainer, Zoom, BaseLayer } from '@amsterdam/arm-core'
import {
  MarkerClusterGroup,
  createClusterMarkers,
} from '@amsterdam/arm-cluster'
import MarkerFilters from '../examples/MarkerFilters'
import markers from '../stubs/markers.json'

export default {
  title: 'Other/MarkerClusteringGroup',
  component: MarkerClusterGroup,
  // decorators: [withKnobs],
}

export const Default = {
  render: () => (
    <Map fullScreen>
      <ViewerContainer bottomRight={<Zoom />} />
      <MarkerClusterGroup
        markers={createClusterMarkers({
          markers,

          events: {
            click: (e) => {
              window.alert(
                `Marker clicked!, Lat: ${e.latlng.lat}, Lng: ${e.latlng.lng}`,
              )
            },
          },
        })}
      />
      <BaseLayer />
    </Map>
  ),

  name: 'Default',
}

export const WithKnobsPlayWithOptions = {
  render: () => (
    <Map fullScreen>
      <ViewerContainer bottomRight={<Zoom />} />
      <MarkerClusterGroup
        optionsOverrides={{
          spiderfyOnMaxZoom: false,
          showCoverageOnHover: false,
          zoomToBoundsOnClick: true,

          maxClusterRadius: 50,

          chunkedLoading: true,

          disableClusteringAtZoom: 16,
        }}
        markers={createClusterMarkers({
          markers,
        })}
      />
      <BaseLayer />
    </Map>
  ),

  name: 'With Knobs (play with options)',
}

export const WithMarkerFilteringAndCustomMarkers = {
  render: () => (
    <Map fullScreen>
      <ViewerContainer
        bottomRight={<Zoom />}
        bottomLeft={
          <MarkerFilters
            markersSource={markers}
            clusterComponent={(markersFiltered) => (
              <MarkerClusterGroup markers={markersFiltered} />
            )}
          />
        }
      />
      <BaseLayer />
    </Map>
  ),

  name: 'With marker filtering and custom markers',
}
