
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
        <MultiCheckbox value="unchecked" onChange={cb} />
      )
      wrapper.find('input').simulate('change', {target: {checked: true}})
      expect(cb).to.be.calledOnce
      expect(cb).to.have.been.calledWith('checked')
    })

    test('should call onChange(\'unchecked\') on status checked', () => {
      const cb = sinon.spy()
      const wrapper = mount(
        <MultiCheckbox
          value="checked"
          onChange={cb}
        />
      )
      wrapper.find('input').simulate('change', {target: {checked: false}})
      expect(cb).to.be.calledOnce
      expect(cb).to.have.been.calledWith('unchecked')
    })

    test('should call onChange(\'unchecked\') on status indeterminate', () => {
      const cb = sinon.spy()
      const wrapper = mount(
        <MultiCheckbox
          value="indeterminate"
          onChange={cb}
        />
      )
      wrapper.find('input').simulate('change', {target: {checked: false}})
      expect(cb).to.be.calledOnce
      expect(cb).to.have.been.calledWith('unchecked')
    })
  })
})
