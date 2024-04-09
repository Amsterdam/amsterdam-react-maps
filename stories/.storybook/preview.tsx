import React from 'react'
import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui'
import { DocsContainer, DocsPage } from '@storybook/addon-docs'
import { Preview } from '@storybook/react'
import 'leaflet/dist/leaflet.css'
import styled from 'styled-components'
import sortStories from './util/sort-stories'

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
    options: {
      // Messy but storySort cannot be an import
      // @see https://github.com/storybookjs/storybook/commit/6753867b837b558d45408b3fdc8be0900fbf6995
      storySort: (a, b) => {
        function position(item, array = []) {
          const index = array.indexOf(item)
          // Show unsorted items at the bottom.
          return index === -1 ? 10000 : index
        }

        const SORT_ORDER = {
          Introduction: ['Welcome', 'Getting Started', 'Contributing'],
          UI: ['DrawTool', 'ViewerContainer', 'Map Panel', 'BaseLayerToggle'],
          Other: [],
        }
        const groups = Object.keys(SORT_ORDER)

        const aKind = a.title
        const bKind = b.title
        const [aGroup, aComponent] = aKind.split('/')
        const [bGroup, bComponent] = bKind.split('/')

        // Preserve story sort order.
        if (aKind === bKind) {
          return 0
        }

        // Sort stories in a group.
        if (aGroup === bGroup) {
          const group = SORT_ORDER[aGroup]

          return position(aComponent, group) - position(bComponent, group)
        }

        // Sort groups.
        return position(aGroup, groups) - position(bGroup, groups)
      }
    },
    docs: {
      container: DocsContainer,
      page: DocsPage,
    },
  }
}

export default preview
