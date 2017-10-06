import React from 'react'
import {Scheduler} from './Scheduler'
import {shallow} from 'enzyme'

describe('scheduler', () => {
  describe('components', () => {
    describe('Scheduler', () => {
      it('should render', () => {
        const wrapper = shallow(<Scheduler/>)
        expect(wrapper.find('div')).to.have.length(1)
      })
    })
  })
})
