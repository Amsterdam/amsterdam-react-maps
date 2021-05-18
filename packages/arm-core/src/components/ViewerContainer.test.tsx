import { render, screen } from '@testing-library/react'

import ViewerContainer from './ViewerContainer'

describe('ViewerContainer', () => {
  beforeEach(() => {
    // @ts-ignore
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    render(<ViewerContainer />)
    // @TODO fix render

    expect(screen.queryByTestId('container')).not.toBeNull()
  })
})
