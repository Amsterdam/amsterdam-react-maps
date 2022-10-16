import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui'
import { withA11y } from '@storybook/addon-a11y'
import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks'
import { addDecorator, addParameters } from '@storybook/react'
import 'leaflet/dist/leaflet.css'
import React from 'react'
import styled from 'styled-components'
import sortStories from './util/sort-stories'

const SORT_ORDER = {
  Introduction: ['Welcome', 'Getting Started', 'Contributing', 'Changelog'],
  UI: [
    'ViewerContainer',
    'BaseLayer',
    'Marker',
    'Map Panel',
    'BaseLayerToggle',
  ],
  Layers: ['GeoJSON', 'NonTiled WMS Layer', 'RDGeoJSON', 'WFS'],
  Other: ['Click and Search Nearby', 'MarkerClusteringGroup'],
}

const StoryWrapper = styled.div`
  height: 100vh; /* Ensure the map takes up the whole story preview */
  position: relative;
`

function withGlobalStyles(storyFn) {
  return (
    <ThemeProvider>
      <>
        {/* @ts-ignore */}
        <GlobalStyle />
        <StoryWrapper>{storyFn()}</StoryWrapper>
      </>
    </ThemeProvider>
  )
}

addDecorator(withGlobalStyles)
addDecorator(withA11y as any)

addParameters({
  layout: 'fullscreen',
  options: {
    storySort: sortStories(SORT_ORDER),
    showRoots: true,
  },
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
})
