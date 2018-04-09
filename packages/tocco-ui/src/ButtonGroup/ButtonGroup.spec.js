
import React from 'react'
import ButtonGroup from './ButtonGroup'
import {shallow} from 'enzyme'

describe('tocco-ui', function() {
  describe('ButtonGroup', function() {
    it('should have three defaultProps', () => {
      const wrapper = shallow(
        <ButtonGroup/>
      )
      const props = wrapper.instance().props
      expect(Object.keys(props).length).to.equal(3)
      const {ink, look, melt} = props
      expect(ink).to.equal('base')
      expect(look).to.equal('flat')
      expect(melt).to.equal(false)
    })
  })
})
