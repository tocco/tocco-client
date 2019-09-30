import React from 'react'
import {mount} from 'enzyme'

import StringEdit from './StringEdit'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('StringEdit ', () => {
        test('should show input with value', () => {
          const wrapper = mount(<StringEdit value="TEST"/>)
          expect(wrapper.find('input')).to.have.length(1)
          expect(wrapper.find('input').first()).to.have.attr('value', 'TEST')
        })

        test('should handle undefined value', () => {
          const wrapper = mount(<StringEdit/>)
          expect(wrapper.find('input')).to.have.length(1)
          expect(wrapper.find('input').first()).to.have.attr('value', '')
        })

        test('should call onChange', async() => {
          const spy = sinon.spy()
          const newValue = 'newValue'

          const wrapper = mount(<StringEdit onChange={spy}/>)
          wrapper.find('input').first().simulate('change', {target: {value: newValue}})
          await new Promise(resolve => setTimeout(() => {
            expect(spy).to.have.been.calledWith(newValue)
            resolve()
          }, 350))
        })
      })
    })
  })
})
