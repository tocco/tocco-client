import React from 'react'
import {shallow} from 'enzyme'

import AdvancedSearch from './AdvancedSearch'

describe('tocco-util', () => {
  describe('formData', () => {
    describe('advancedSearch', () => {
      describe('AdvancedSearch', () => {
        test('should render ListApp', () => {
          const ListApp = () => <div>ListApp</div>
          const wrapper = shallow(
            <AdvancedSearch ListApp={ListApp} entityName="User" formBase="User" emitAction={() => {}}/>
          )
          expect(wrapper.find(ListApp)).to.have.length(1)
        })
      })
    })
  })
})
