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

## [0.3.6] (unreleased)
- Changed: MarkerClusterGroup has a breaking change. The L.MarkerClusterGroup layer is constructed outside of the component. 
- Added: MarkerClusterGroup accepts events for the L.MarkerClusterGroup layer instead of individual markers
- Added: MarkerClusterGroup now has a setInstance method

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
