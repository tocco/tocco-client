import {screen, render} from '@testing-library/react'

import Button from '../Button'
import ButtonGroup from './ButtonGroup'

describe('tocco-ui', () => {
  describe('ButtonGroup', () => {
    test('should wrap children in a styled container', () => {
      render(
        <ButtonGroup>
          <Button label="btn 1" />
          <Button label="btn 2" />
        </ButtonGroup>
      )

      expect(screen.queryAllByRole('button')).to.have.length(2)
      expect(screen.getByText('btn 1')).exist
      expect(screen.getByText('btn 2')).exist
    })
  })
})
