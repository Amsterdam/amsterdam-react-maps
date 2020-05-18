/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

import L from 'leaflet'

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    PUBLIC_URL: string
  }
}

declare module '*.bmp' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.woff2' {
  const src: string
  export default src
}

declare module '*.eot' {
  const src: string
  export default src
}

declare module '*.svg' {
  const content: React.FC<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { [key: string]: string }
  export default classes
}

declare module "*.json" {
  const value: any;
  export default value;
}

declare module '*.md' {
  const src: string
  export default src
}

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
