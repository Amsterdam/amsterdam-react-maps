import React, { memo, useEffect, useRef, useCallback, useState } from 'react'
import { useMapInstance } from '@datapunt/react-maps'
import L from 'leaflet'

// `https://map.data.amsterdam.nl/maps/parkeervakken?
// REQUEST=GetFeature&SERVICE=wfs&OUTPUTFORMAT=application/json;%20subtype=geojson;%20charset=utf-8&
// Typename=fiscaal_parkeervakken&version=1.1.0&srsname=urn:ogc:def:crs:EPSG::4326`
const WFS_ENDPOINT = 'https://map.data.amsterdam.nl/maps/parkeervakken'
const wfsParameters = {
  service: 'WFS',
  version: '1.1.0',
  request: 'GetFeature',
  typeName: 'fiscaal_parkeervakken',
  outputFormat: 'application/json; subtype=geojson; charset=utf-8',
  srsName: 'urn:ogc:def:crs:EPSG::4326',
}
const MIN_ZOOM_LEVEL = 14

const defaultStyleParkeerVakken = {
  color: '#000',
  weight: 2,
  opacity: 1,
  fillOpacity: 0,
}

const hoverStyleParkeerVakken = {
  color: '#000',
  weight: 3,
  opacity: 1,
  fillOpacity: 1,
  fillColor: '#ccc',
}

const defaultStyleSelection = {
  color: '#ec0000',
  weight: 2,
  opacity: 1,
  fillOpacity: 0.5,
  fillColor: '#ec0000',
}

const hoverStyleSelection = {
  color: '#ec0000',
  weight: 3,
  opacity: 1,
  fillOpacity: 0.3,
  fillColor: '#ec0000',
}

const WfsLayer = ({ bbox }) => {
  const { mapInstance } = useMapInstance()
  const wfsLayer = useRef(null)
  const wfsSelectionLayer = useRef(null)
  const [features, setFeatures] = useState([])
  const [selection, setSelection] = useState([])

  const addFeature = useCallback(
    feature => {
      wfsSelectionLayer.current.addData(feature)
      setSelection([...selection, feature])
    },
    [wfsLayer.current],
  )

  const removeFeature = useCallback(
    (feature, layer) => {
      setSelection([
        ...selection.filter(item => item.object.id !== feature.properties.id),
      ])
      wfsSelectionLayer.current.removeLayer(layer)
    },
    [wfsSelectionLayer.current],
  )

  const handleLayerFeature = (feature, layer) => {
    layer.on('mouseover', () => layer.setStyle(hoverStyleParkeerVakken))
    layer.on('mouseout', () => layer.setStyle(defaultStyleParkeerVakken))
    layer.on('click', e => {
      e.originalEvent.preventDefault()
      addFeature(feature, e.latlng)
    })
  }

  const handleSelectionLayerFeature = (feature, layer) => {
    layer.on('mouseover', () => layer.setStyle(hoverStyleSelection))
    layer.on('mouseout', () => layer.setStyle(defaultStyleSelection))
    layer.on('click', e => {
      e.originalEvent.preventDefault()
      removeFeature(feature, layer)
    })
  }

  useEffect(() => {
    console.log('mapInstance effect')
    if (mapInstance) {
      wfsLayer.current = L.geoJSON(null, {
        style: defaultStyleParkeerVakken,
        onEachFeature: handleLayerFeature,
      }).addTo(mapInstance)
      wfsSelectionLayer.current = L.geoJSON(null, {
        style: defaultStyleSelection,
        onEachFeature: handleSelectionLayerFeature,
      }).addTo(mapInstance)
    }
  }, [mapInstance])

  const clearLayers = useCallback(() => {
    const layer: any = wfsLayer && wfsLayer.current

    if (!layer) return
    const layers = layer.getLayers()
    layers.forEach(l => l.remove())
    layer.clearLayers()
  }, [wfsLayer])

  useEffect(() => {
    console.log(features)
    if (mapInstance && mapInstance.getZoom() >= MIN_ZOOM_LEVEL) {
      clearLayers()
      if (features) wfsLayer.current.addData(features)
      wfsSelectionLayer.current.bringToFront()
    }
  }, [features, mapInstance])

  useEffect(() => {
    ;(async () => {
      if (mapInstance && mapInstance.getZoom() >= MIN_ZOOM_LEVEL) {
        const bboxParams = {
          bbox: mapInstance.getBounds().toBBoxString(),
        }
        const parameters = L.Util.extend(wfsParameters, bboxParams)
        const url = `${WFS_ENDPOINT}${L.Util.getParamString(parameters)}`
        const response = await fetch(url)
        const data: any = await response.json()
        setFeatures(data.features)
      }
    })()
  }, [bbox])

  return null
}

export default memo(WfsLayer)
