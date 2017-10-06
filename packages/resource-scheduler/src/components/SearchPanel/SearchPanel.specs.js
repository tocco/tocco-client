import React from 'react'
import {SearchPanel} from './SearchPanel'
import {shallow} from 'enzyme'

describe('resource-scheduler', () => {
  describe('components', () => {
    describe('SearchPanel', () => {
      it('should render', () => {
        const wrapper = shallow(<SearchPanel/>)
        expect(wrapper.find('div')).to.have.length(1)
      })
    })
  })
})
