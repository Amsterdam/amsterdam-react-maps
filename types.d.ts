import L from 'leaflet'

// TODO: Build out these type definitions and contribute them upstream: https://github.com/ptv-logistics/Leaflet.NonTiledLayer/issues/24
declare module 'leaflet' {
  interface NonTiledLayerOptions {
    attribution?: string,
    opacity?: number,
    zIndex?: undefined,
    minZoom?: number,
    maxZoom: number,
    pointerEvents?: null,
    errorImageUrl?: string
    bounds?: L.LatLngBounds,
    useCanvas?: undefined
  }

  interface NonTiledLayer extends L.Layer {}
  function nonTiledLayer(url: string, options: NonTiledLayerOptions): NonTiledLayer;

  namespace NonTiledLayer {
    interface WMS extends NonTiledLayer {}
  }
  namespace nonTiledLayer {
    function wms(url: string, options: L.WMSOptions): NonTiledLayer.WMS;
  }
}

import 'jest-styled-components';