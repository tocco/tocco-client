import React from 'react'
import {shallow} from 'enzyme'

import PhoneEdit from './PhoneEdit'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('PhoneEdit ', () => {
        it('should display the formatted phone number in input', () => {
          const wrapper = shallow(<PhoneEdit value="+41794733123" onChange={() => {}}/>)
          expect(wrapper.find('input').props()['value']).to.eql('+41 79 473 31 23')
        })

        it('should call on change with phone number in e.164 format', () => {
          const onChangeSpy = sinon.spy()
          const wrapper = shallow(<PhoneEdit value="+41794733123" onChange={onChangeSpy}/>)

          wrapper.find('input').simulate('change', {target: {value: '079 473 31 23'}})

          expect(onChangeSpy).to.have.been.calledWith('+41794733123')
        })
      })
    })
  })
})
