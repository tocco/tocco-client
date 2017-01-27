import React from 'react'
import {mount} from 'enzyme'

import BoolEdit from './BoolEdit'

describe('tocco-ui', function() {
  describe('EditableValue', function() {
    describe('typeEditors', function() {
      describe('BoolEdit ', function() {
        it('should show checked checkbox on true', function() {
          const wrapper = mount(<BoolEdit value/>)
          const checkbox = () => wrapper.find('input')
          checkbox().should.be.checked()
        })

        it('should show unchecked checkbox on falsy values', function() {
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

        it('call on change', function() {
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
