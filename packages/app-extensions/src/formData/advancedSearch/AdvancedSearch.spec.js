import React from 'react'
import {shallow} from 'enzyme'

import AdvancedSearch from './AdvancedSearch'

describe('app-extensions', () => {
  describe('formData', () => {
    describe('advancedSearch', () => {
      describe('AdvancedSearch', () => {
        test('should render ListApp', () => {
          const ListApp = () => <div>ListApp</div>
          const wrapper = shallow(
            <AdvancedSearch ListApp={ListApp} entityName="User" formName="User" emitAction={() => {}}/>
          )
          expect(wrapper.find(ListApp)).to.have.length(1)
        })
      })
    })
  })
})
