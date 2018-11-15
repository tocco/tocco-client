
import React from 'react'
import {mount} from 'enzyme'

import MultiCheckbox from './MultiCheckbox'

describe('tocco-ui', () => {
  describe('MultiCheckbox', () => {
    test('should render input', () => {
      const cb = sinon.spy()
      const wrapper = mount(
        <MultiCheckbox
          cbCheck={cb}
          cbUncheck={cb}
        />
      )
      expect(wrapper.find('input')).to.have.lengthOf(1)
    })

    test('should call cbCheck on status unchecked', () => {
      const cbCheck = sinon.spy()
      const cbUncheck = sinon.spy()
      const wrapper = mount(
        <MultiCheckbox
          cbCheck={cbCheck}
          cbUncheck={cbUncheck}
        />
      )
      wrapper.find('input').simulate('change')
      expect(cbCheck).to.have.property('callCount', 1)
      expect(cbUncheck).to.have.property('callCount', 0)
    })

    test('should call cbUncheck on status checked', () => {
      const cbCheck = sinon.spy()
      const cbUncheck = sinon.spy()
      const wrapper = mount(
        <MultiCheckbox
          status="checked"
          cbCheck={cbCheck}
          cbUncheck={cbUncheck}
        />
      )
      wrapper.find('input').simulate('change')
      expect(cbCheck).to.have.property('callCount', 0)
      expect(cbUncheck).to.have.property('callCount', 1)
    })

    test('should call cbUncheck on status indeterminate', () => {
      const cbCheck = sinon.spy()
      const cbUncheck = sinon.spy()
      const wrapper = mount(
        <MultiCheckbox
          status="indeterminate"
          cbCheck={cbCheck}
          cbUncheck={cbUncheck}
        />
      )
      wrapper.find('input').simulate('change')
      expect(cbCheck).to.have.property('callCount', 0)
      expect(cbUncheck).to.have.property('callCount', 1)
    })

    test('should change states correctly', () => {
      const cb = sinon.spy()
      const wrapper = mount(
        <MultiCheckbox
          status="indeterminate"
          cbCheck={cb}
          cbUncheck={cb}
        />
      )
      expect(wrapper.getDOMNode()).to.have.property('checked', true)
      expect(wrapper.getDOMNode()).to.have.property('indeterminate', true)

      wrapper.find('input').simulate('change')
      expect(wrapper.getDOMNode()).to.have.property('checked', false)
      expect(wrapper.getDOMNode()).to.have.property('indeterminate', false)

      wrapper.find('input').simulate('change')
      expect(wrapper.getDOMNode()).to.have.property('checked', true)
      expect(wrapper.getDOMNode()).to.have.property('indeterminate', false)

      wrapper.find('input').simulate('change')
      expect(wrapper.getDOMNode()).to.have.property('checked', false)
      expect(wrapper.getDOMNode()).to.have.property('indeterminate', false)
    })
  })
})
