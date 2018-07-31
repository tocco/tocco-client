import React from 'react'
import {shallow} from 'enzyme'

import AdvancedSearch from './AdvancedSearch'

describe('tocco-util', () => {
  describe('formData', () => {
    describe('advancedSearch', () => {
      describe('AdvancedSearch', () => {
        it('should render ListApp', () => {
          const ListApp = () => <div>ListApp</div>
          const wrapper = shallow(<AdvancedSearch ListApp={ListApp} entityName="User" formBase="User"/>)
          expect(wrapper.find(ListApp)).to.have.length(1)
        })
      })
    })
  })
})
