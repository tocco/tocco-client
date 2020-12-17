import React from 'react'
import {mount} from 'enzyme'

import LayoutContainer from './LayoutContainer'
import StyledLayoutContainer from './StyledLayoutContainer'

describe('tocco-ui', () => {
  describe('LayoutContainer', () => {
    test('should render parent and children', () => {
      const wrapper = mount(<LayoutContainer><span>child1</span><span>child2</span></LayoutContainer>)
      expect(wrapper.find(StyledLayoutContainer)).to.have.length(1)
      expect(wrapper.find('span')).to.have.length(2)
      expect(wrapper.find('span').first().text()).to.equal('child1')
      expect(wrapper.find('span').last().text()).to.equal('child2')
    })
  })
})
