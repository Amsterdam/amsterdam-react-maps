import { GlobalStyle, ThemeProvider } from '@datapunt/asc-ui'
import { addDecorator, addParameters } from '@storybook/react'
import React from 'react'
import styled from 'styled-components'
import { withA11y } from '@storybook/addon-a11y'
import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks'
import sortStories from './util/sort-stories'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

const SORT_ORDER = {
  Introduction: ['Welcome', 'Getting Started', 'Contributing'],
  UI: ['DrawTool', 'ViewerContainer', 'Map Panel', 'BaseLayerToggle'],
}

const StoryWrapper = styled.div`
  position: relative;
`

function withGlobalStyles(storyFn) {
  return (
    <ThemeProvider>
      <>
        <GlobalStyle />
        <StoryWrapper>{storyFn()}</StoryWrapper>
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
