import React from 'react'
import {mount} from 'enzyme'

import PhoneEdit from './PhoneEdit'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('PhoneEdit ', () => {
        test('should call on change with phone number in e.164 format', () => {
          const onChangeSpy = sinon.spy()
          const wrapper = mount(
            <PhoneEdit value="0792345678" onChange={onChangeSpy}/>
          )
          return wrapper.find(PhoneEdit).instance().importLibPhoneNumber().then(() => {
            wrapper.find('input').simulate('change', {target: {value: '0793456789'}})
            return expect(onChangeSpy).to.have.been.calledWith('+41793456789')
          })
        })
      })
    })
  })
})
