import React from 'react'
import {mount} from 'enzyme'

import EditableValue from './'

describe('tocco-ui', function() {
  describe('EditableValue', function() {
    describe('<EditableValue>', function() {
      it('should export component that', function() {
        const wrapper = mount(<EditableValue type="string" value="test"/>)
        expect(wrapper.find('span')).to.have.length(1)
      })
    })
  })
})
