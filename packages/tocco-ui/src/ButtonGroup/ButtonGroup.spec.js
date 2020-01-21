import React from 'react'
import {shallow} from 'enzyme'

import Button from '../Button'
import ButtonGroup from './ButtonGroup'
import StyledButtonGroup from './StyledButtonGroup'

describe('tocco-ui', () => {
  describe('ButtonGroup', () => {
    test('should wrap children in a styled container', () => {
      const wrapper = shallow(
        <ButtonGroup>
          <Button label="btn 1"/>
          <Button label="btn 2"/>
        </ButtonGroup>
      )

      expect(wrapper.find(StyledButtonGroup)).to.have.length(1)
      expect(wrapper.find(Button)).to.have.length(2)
    })
  })
})
