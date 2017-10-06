import React from 'react'
import ResourceScheduler from './ResourceScheduler'
import {shallow} from 'enzyme'

describe('resource-scheduler', () => {
  describe('components', () => {
    describe('ResourceScheduler', () => {
      it('should render', () => {
        const wrapper = shallow(<ResourceScheduler/>)
        expect(wrapper.find('div')).to.have.length(1)
      })
    })
  })
})
