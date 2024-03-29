import { render, screen } from '@testing-library/react'

import ViewerContainer from './ViewerContainer'

describe('ViewerContainer', () => {
  it('should render correctly', () => {
    render(
      <ViewerContainer
        topLeft="top left content"
        topRight="top right content"
        bottomLeft="bottom left content"
        bottomRight="bottom right content"
      />,
    )

    expect(screen.queryByTestId('container')).toBeInTheDocument()

    expect(screen.queryByTestId('topLeft')).toBeInTheDocument()
    expect(screen.queryByTestId('topRight')).toBeInTheDocument()
    expect(screen.queryByTestId('bottomLeft')).toBeInTheDocument()
    expect(screen.queryByTestId('bottomRight')).toBeInTheDocument()

    expect(screen.queryByText('top left content')).toBeInTheDocument()
    expect(screen.queryByText('top right content')).toBeInTheDocument()
    expect(screen.queryByText('bottom left content')).toBeInTheDocument()
    expect(screen.queryByText('bottom right content')).toBeInTheDocument()
  })
})
