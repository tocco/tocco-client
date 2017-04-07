import React from 'react'
import SubGrid from './SubGrid'
import {shallow} from 'enzyme'

// const EMPTY_FUNC = () => {}

describe('entity-browser', () => {
  describe('components', () => {
    describe('SubGrid', () => {
      it('should render', () => {
        const wrapper = shallow(<SubGrid/>)
        expect(wrapper.find('div')).to.have.length(1)
      })
    })
  })
})
