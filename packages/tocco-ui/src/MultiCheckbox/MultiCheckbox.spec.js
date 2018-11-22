
import React from 'react'
import {mount} from 'enzyme'

import MultiCheckbox from './MultiCheckbox'

describe('tocco-ui', () => {
  describe('MultiCheckbox', () => {
    test('should render input', () => {
      const cb = sinon.spy()
      const wrapper = mount(
        <MultiCheckbox onChange={cb} />
      )
      expect(wrapper.find('input')).to.have.lengthOf(1)
    })

    test('should call onChange(\'checked\') on status unchecked', () => {
      const cb = sinon.spy()
      const wrapper = mount(
        <MultiCheckbox onChange={cb} />
      )
      wrapper.find('input').simulate('change')
      expect(cb).to.have.property('callCount', 1)
      expect(cb).to.have.been.calledWith('checked')
    })

    test('should call onChange(\'unchecked\') on status checked', () => {
      const cb = sinon.spy()
      const wrapper = mount(
        <MultiCheckbox
          status="checked"
          onChange={cb}
        />
      )
      wrapper.find('input').simulate('change')
      expect(cb).to.have.property('callCount', 1)
      expect(cb).to.have.been.calledWith('unchecked')
    })

    test('should call onChange(\'unchecked\') on status indeterminate', () => {
      const cb = sinon.spy()
      const wrapper = mount(
        <MultiCheckbox
          status="indeterminate"
          onChange={cb}
        />
      )
      wrapper.find('input').simulate('change')
      expect(cb).to.have.property('callCount', 1)
      expect(cb).to.have.been.calledWith('unchecked')
    })

    test('should change states correctly', () => {
      const cb = sinon.spy()
      const wrapper = mount(
        <MultiCheckbox
          status="indeterminate"
          onChange={cb}
        />
      )
      expect(wrapper.state().status).to.equal('indeterminate')
      expect(wrapper.getDOMNode()).to.have.property('checked', true)
      expect(wrapper.getDOMNode()).to.have.property('indeterminate', true)

      wrapper.find('input').simulate('change')
      expect(wrapper.state().status).to.be.false
      expect(wrapper.getDOMNode()).to.have.property('checked', false)
      expect(wrapper.getDOMNode()).to.have.property('indeterminate', false)

      wrapper.find('input').simulate('change')
      expect(wrapper.state().status).to.equal('checked')
      expect(wrapper.getDOMNode()).to.have.property('checked', true)
      expect(wrapper.getDOMNode()).to.have.property('indeterminate', false)

      wrapper.find('input').simulate('change')
      expect(wrapper.state().status).to.be.false
      expect(wrapper.getDOMNode()).to.have.property('checked', false)
      expect(wrapper.getDOMNode()).to.have.property('indeterminate', false)
    })
  })
})
