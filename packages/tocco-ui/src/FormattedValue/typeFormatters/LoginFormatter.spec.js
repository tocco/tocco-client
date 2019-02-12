import React from 'react'
import {mount} from 'enzyme'

import LoginFormatter from './LoginFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('LoginFormatter ', () => {
        test('should format value', () => {
          const value = {username: 'dake'}
          const wrapper = mount(<LoginFormatter
            value={value}/>)
          expect(wrapper.text()).to.equal('dake')
        })
      })
    })
  })
})
