# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Prefix the change with one of these keywords:

- Added: for new features.
- Changed: for changes in existing functionality.
- Deprecated: for soon-to-be removed features.
- Removed: for now removed features.
- Fixed: for any bug fixes.
- Security: in case of vulnerabilities.


## [0.10.1]
- Added: README files for Core, Cluster and Nontiled npm packages

## [0.10.0]
- Updated: all peerdependencies for react (17 and 18), react-dom, leaflet, leaflet.cluster and leaflet.nontiled
- Added: ARM-core now exports: 
    AMSTERDAM_MAPS_OPTIONS,
    AMSTERDAM_LAYERS,
    AERIAL_AMSTERDAM_LAYERS,
    MIN_ZOOM_LEVEL,
    MAX_ZOOM_LEVEL,

## [0.9.2]
- Added: ARM-core now exports GeoJSON, useMapInstance, useMapEvents and useEvents
- Added: GeoJSON test

## [0.9.1]
- Fixed: **BREAKING** placemment of items in `ViewerContainer`
- Added: more stories

## [0.9.0]
- Removed: **BREAKING** `@amsterdam/arm-draw` package and `DrawTool`
- Added: more unit tests
- Added: more stories

## [0.6.0]
- Removed: **BREAKING** unused props in several components 
- Removed: **BREAKING** `onInitLayers` and unused `isOpen` props on draw tool
- Added: `onEndInitialItems` prop for draw tool
- Added: All components exported from `@amsterdam/arm-draw` now also export their respective prop types
- Added: Pass along props to `BaseLayerToggle` component.
- Changed: `DrawTool` component will now pass along other props down the component hierarchy

## [0.5.1]
- Changed: Update React Maps to version 0.12.0

## [0.5.0]
- Changed: Add shadow in the map mobile drawer for better UX [#1108](https://github.com/Amsterdam/amsterdam-react-maps/pull/1108)
- Changed: **BREAKING** Updated Amsterdam Styled Components version to 0.28.0
- Changed: **BREAKING** Minimum supported version of React to v17

## [0.4.1]

- Fixed: switched to es6 style imports to fix background image resolution in BaseLayerToggle in apps that prefer `esModule: true` [see also](https://github.com/facebook/create-react-app/pull/9934)

## [0.4.0]

- Changed: Moved packages to @amsterdam organization on NPM.
- Added: `setInstance` prop to Marker component
- Changed: MarkerClusterGroup has a breaking change. The L.MarkerClusterGroup layer is constructed outside of the component. 
- Added: MarkerClusterGroup accepts events for the L.MarkerClusterGroup layer instead of individual markers
- Added: MarkerClusterGroup now has a setInstance method
- Changed: **BREAKING** `DrawTool` no longer accepts the `mapInstance` prop.
- Changed: Return values of `useMapInstance` no longer checked for null values.
- Changed: Updated version of `@datapunt/react-maps` to version 0.9.1

## [0.3.5]

- Changed: Marker component now accepts the more generic LatLngExpression instead of only a LatLng

## [0.3.4]

- Deprecated: amsterdam-react-maps package
- Changed: usePanToLatLng now accepts a LatLngLiteral instead of a LatLng

## [0.2.7]

- Added: BaseLayerToggle component
- Added: DrawTool
- Added: MapPanel (desktop) & MapPanelDrawer (mobile) components
- Added: RDGeoJSON

## [0.2.0]

- Added: Draw tool
- Added: MarkerClusterGroup
- Added: Map (with amsterdam-maps defaults)
- Added: BaseLayer component
- Changed: Marker now accepts options and events
