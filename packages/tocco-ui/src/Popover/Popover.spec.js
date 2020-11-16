import React from 'react'
import {mount} from 'enzyme'
import {act} from '@testing-library/react-hooks'

import Popover from './Popover'

describe('tocco-ui', () => {
  describe('Popover', () => {
    test('should show popover content on mouseover and hide on mouseout', () => {
      const wrapper = mount(
        <Popover content={<span className="content">Popover</span>}><span className="child">Test</span></Popover>
      )
      expect(wrapper.find('.child')).to.have.length(1)
      expect(wrapper.find('.content')).to.have.length(0)

      act(() => {
        wrapper.find('span').first().simulate('mouseover')
      })

      expect(wrapper.find('.content')).to.have.length(1)

      act(() => {
        wrapper.find('span').first().simulate('mouseout')
      })

      expect(wrapper.find('.content')).to.have.length(0)
    })
  })
})
