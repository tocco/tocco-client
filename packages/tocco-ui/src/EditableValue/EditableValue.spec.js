import React from 'react'
import {mount} from 'enzyme'

import EditableValue from './'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('<EditableValue>', () => {
      test('should export component that', () => {
        const wrapper = mount(<EditableValue type="string" value="test"/>)
        expect(wrapper.find('span')).to.have.length(1)
      })
    })
  })
})
