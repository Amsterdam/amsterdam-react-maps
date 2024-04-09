import React from 'react'
import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui'
import { DocsContainer, DocsPage } from '@storybook/addon-docs'
import { Preview } from '@storybook/react'
import 'leaflet/dist/leaflet.css'
import styled from 'styled-components'
import sortStories from './util/sort-stories'

const SORT_ORDER = {
  Introduction: ['Welcome', 'Getting Started', 'Contributing'],
  UI: ['DrawTool', 'ViewerContainer', 'Map Panel', 'BaseLayerToggle'],
  Other: [],
}

const StoryWrapper = styled.div`
  height: 100vh; /* Ensure the map takes up the whole story preview */
  position: relative;
`


const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <>
          <GlobalStyle />
          <StoryWrapper>
            <Story />
          </StoryWrapper>
        </>
      </ThemeProvider>
    )
  ],
  parameters: {
    layout: 'fullscreen',
    // options: {
      // TODO fix
      // storySort: sortStories(SORT_ORDER),
      // showRoots: true,
    // },
    // docs: {
    //   container: DocsContainer,
    //   page: DocsPage,
    // },
  }
}

export default preview
