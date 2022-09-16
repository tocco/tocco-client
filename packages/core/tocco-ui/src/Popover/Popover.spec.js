import {render, screen, fireEvent} from '@testing-library/react'

import Popover from './Popover'

describe('tocco-ui', () => {
  describe('Popover', () => {
    test('should show popover content on mouseover and hide on mouseout', () => {
      render(
        <Popover content={<span data-testid="content">Popover</span>}>
          <span data-testid="child">Test</span>
        </Popover>
      )

      expect(screen.queryAllByTestId('child')).to.have.length(1)
      expect(screen.queryAllByTestId('content')).to.have.length(0)

      fireEvent.mouseOver(screen.getByText('Test'))

      expect(screen.queryAllByTestId('content')).to.have.length(1)

      fireEvent.mouseOut(screen.getByText('Test'))

      expect(screen.queryAllByTestId('content')).to.have.length(0)
    })
  })
})
