import React from 'react'
import Popover from './Popover'
import {mount} from 'enzyme'

describe('tocco-ui', () => {
  describe('Popover', () => {
    it('should show popover content on mouseover and hide on mouseout', () => {
      const wrapper = mount(
        <Popover content={<span className="content">Popover</span>}><span className="child">Test</span></Popover>
      )
      expect(wrapper.find('.child')).to.have.length(1)
      expect(wrapper.find('.content')).to.have.length(0)

      wrapper.simulate('mouseover')
      expect(wrapper.find('.content')).to.have.length(1)

      wrapper.simulate('mouseout')
      expect(wrapper.find('.content')).to.have.length(0)
    })
  })
})
