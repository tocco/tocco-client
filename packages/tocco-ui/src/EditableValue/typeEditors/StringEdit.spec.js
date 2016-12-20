import React from 'react'
import {mount} from 'enzyme'

import StringEdit from './StringEdit'

describe('tocco-ui', function() {
  describe('EditableValue', function() {
    describe('typeEditors', function() {
      describe('StringEdit ', function() {
        it('should show input with value', function() {
          const wrapper = mount(<StringEdit value="TEST"/>)
          expect(wrapper.find('input')).to.have.length(1)
          expect(wrapper.find('input').first()).to.have.attr('value', 'TEST')
        })

        it('should handle undefined value', function() {
          const wrapper = mount(<StringEdit/>)
          expect(wrapper.find('input')).to.have.length(1)
          expect(wrapper.find('input').first()).to.have.attr('value', '')
        })

        it('should call onChange', function() {
          const spy = sinon.spy()
          const newValue = 'newValue'

          const wrapper = mount(<StringEdit onChange={spy}/>)
          wrapper.find('input').first().simulate('change', {target: {value: newValue}})
          expect(spy).to.have.been.calledWith(newValue)
        })
      })
    })
  })
})
