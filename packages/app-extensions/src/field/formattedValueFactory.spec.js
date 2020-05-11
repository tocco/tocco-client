import React from 'react'
import {FormattedValue} from 'tocco-ui'
import {mount} from 'enzyme'

import formattedValueFactory from './formattedValueFactory'

describe('app-extensions', () => {
  describe('fomField', () => {
    describe('formattedValueFactory', () => {
      test('should return simple formattedValue', () => {
        const Field = formattedValueFactory('string')
        const formField = {dataType: 'string'}

        const value = 'test'

        const wrapper = mount(<Field value={value} formField={formField}/>)

        expect(wrapper.find(FormattedValue)).to.have.length(1)
        expect(wrapper.find(FormattedValue)).to.have.prop('value', value)
      })
    })
  })
})
