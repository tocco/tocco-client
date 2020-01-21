import {mount} from 'enzyme'
import React from 'react'

import Ball from './Ball'

describe('tocco-ui', () => {
  describe('Button', () => {
    test('should handle click events', () => {
      const onButtonClick = sinon.spy()
      const wrapper = mount(<Ball icon="chevron-right" onClick={onButtonClick}/>)
      wrapper.find('button').simulate('click')
      expect(onButtonClick).to.have.property('callCount', 1)
    })
  })
})
