import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ViewerContainer } from '@datapunt/asc-ui'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { Map, Zoom, BaseLayer, Scale } from '@datapunt/arm-core'
import { MarkerClusterGroup } from '@datapunt/arm-cluster'
import getDataSelection, { DataSelection } from '../api/getDataSelection'

const StyledViewerContainer = styled(ViewerContainer)`
  z-index: 400;
`

const CONFIG = {
  params: {
    shape:
      '[[4.894230533839637,52.375020731825956],[4.8918540164222115,52.37132657239667],[4.899263378646926,52.37054197320004],[4.90232182515308,52.37058473631911],[4.899663252673563,52.37456004610897]]',
  },
  endpoint: 'https://api.data.amsterdam.nl/dataselectie/bag/geolocation/',
}

const MarkerClustering: React.FC = () => {
  const [results, setResults] = useState<DataSelection>()
  useEffect(() => {
    ;(async () => {
      const res = await getDataSelection(CONFIG.endpoint, CONFIG.params)
      setResults(res)
    })()
  }, [])

  return (
    <Map fullScreen>
      <Scale
        options={{
          position: 'bottomright',
          metric: true,
          imperial: false,
        }}
      />

      <StyledViewerContainer bottomRight={<Zoom />} />
      {results?.markers && (
        <MarkerClusterGroup
          events={{
            click: (e) => {
              window.alert(
                `Marker clicked!, Lat: ${e.latlng.lat}, Lng: ${e.latlng.lng}`,
              )
            },
          }}
          markers={results.markers}
        />
      )}
      <BaseLayer />
    </Map>
  )
}

export default MarkerClustering
