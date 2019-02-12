import React from 'react'
import {mount} from 'enzyme'

import BoolEdit from './BoolEdit'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('BoolEdit ', () => {
        test('should show checked checkbox on true', () => {
          const wrapper = mount(<BoolEdit value/>)
          const checkbox = () => wrapper.find('input')
          checkbox().should.be.checked()
        })

        test('should show unchecked checkbox on falsy values', () => {
          const wrapper = mount(<BoolEdit value={false}/>)
          const checkbox = () => wrapper.find('input')
          checkbox().should.not.be.checked()

          const wrapper2 = mount(<BoolEdit value={null}/>)
          const checkbox2 = () => wrapper2.find('input')
          checkbox2().should.not.be.checked()

          const wrapper3 = mount(<BoolEdit/>)
          const checkbox3 = () => wrapper3.find('input')
          checkbox3().should.not.be.checked()
        })

        test('call on change', () => {
          const spy = sinon.spy()
          const wrapper = mount(<BoolEdit value={false} onChange={spy}/>)
          const checkbox = () => wrapper.find('input')
          checkbox().simulate('change', {target: {checked: true}})

          expect(spy).to.have.been.calledWith(true)
        })
      })
    })
  })
})
