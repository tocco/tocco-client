
import React from 'react'
import ButtonGroup from './ButtonGroup'
import {shallow} from 'enzyme'

describe('tocco-ui', function() {
  describe('ButtonGroup', function() {
    it('should have three defaultProps', () => {
      const wrapper = shallow(
        <ButtonGroup/>
      )
      const {children, look, melt} = wrapper.props()
      expect(children).to.equal(undefined)
      expect(look).to.equal('flat')
      expect(melt).to.equal(false)
    })
  })
})
