
import React from 'react'
import ButtonGroup from './ButtonGroup'
import {shallow} from 'enzyme'

describe('tocco-ui', function() {
  describe('ButtonGroup', function() {
    it('should have three defaultProps', () => {
      const wrapper = shallow(
        <ButtonGroup><span>child</span></ButtonGroup>
      )
      const {look, melt} = wrapper.props()
      expect(look).to.equal('flat')
      expect(melt).to.equal(false)
      const {buttonGroupInk} = wrapper.find('span').props()
      expect(buttonGroupInk).to.equal('base')
    })
  })

  describe('ButtonGroup', function() {
    it('should pass three props to child', () => {
      const wrapper = shallow(
        <ButtonGroup
          ink="primary"
          look="raised"
          melt={true}
        ><span>child</span></ButtonGroup>
      )
      const {buttonGroupInk, look, buttonGroupMelt} = wrapper.find('span').props()
      expect(buttonGroupInk).to.equal('primary')
      expect(look).to.equal('raised')
      expect(buttonGroupMelt).to.equal(true)
    })
  })
})
