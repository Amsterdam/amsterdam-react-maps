import { GlobalStyle, ThemeProvider } from '@datapunt/asc-ui'
import { addDecorator, addParameters } from '@storybook/react'
import React from 'react'
import { withA11y } from '@storybook/addon-a11y'
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks'
import sortStories from './util/sort-stories'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

const SORT_ORDER = {
  Introduction: ['Welcome', 'Getting Started', 'Contributing'],
  UI: ['DrawTool', 'ViewerContainer', 'Map Panel', 'BaseLayerToggle'],
}

function withGlobalStyles(storyFn) {
  return (
    <ThemeProvider>
      <>
        <GlobalStyle />
        {storyFn()}
      </>
    </ThemeProvider>
  )
}

addDecorator(withGlobalStyles)
addDecorator(withA11y)

addParameters({
  options: {
    storySort: sortStories(SORT_ORDER),
    showRoots: true,
  },
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
})
