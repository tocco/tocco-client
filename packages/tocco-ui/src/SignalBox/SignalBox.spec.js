import {shallow} from 'enzyme'
import React from 'react'

import SignalBox from './SignalBox'
import Typography from '../Typography'

describe('tocco-ui', function() {
  describe('SignalBox', function() {
    it('should have one defaultProps', () => {
      const wrapper = shallow(
        <SignalBox/>
      )
      const {condition} = wrapper.props()
      expect(condition).to.equal('base')
    })

    it('should not render title, meta and children', () => {
      const wrapper = shallow(
        <SignalBox/>
      )
      expect(wrapper.children()).to.have.length(0)
    })

    it('should render title as <H5>, meta as <Small> and children', () => {
      const wrapper = shallow(
        <SignalBox
          title="title text"
          meta="meta text"
        >
          <span>child text</span>
        </SignalBox>
      )
      expect(wrapper.children()).to.have.length(3)
      expect(wrapper.find(Typography.H5).dive().dive().text()).to.be.equal('title text')
      expect(wrapper.find(Typography.Small).dive().dive().text()).to.be.equal('meta text')
      expect(wrapper.find('span').text()).to.be.equal('child text')
    })
  })
})
