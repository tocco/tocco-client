import {screen, render, fireEvent} from '@testing-library/react'

import Ball from './Ball'

describe('tocco-ui', () => {
  describe('Button', () => {
    test('should handle click events', () => {
      const onButtonClick = sinon.spy()
      render(<Ball icon="chevron-right" onClick={onButtonClick} />)
      fireEvent.click(screen.getByRole('button'))
      expect(onButtonClick).to.have.been.calledOnce
    })
  })
})
