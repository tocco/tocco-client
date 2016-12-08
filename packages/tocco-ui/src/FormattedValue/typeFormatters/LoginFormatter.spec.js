import React from 'react'
import LoginFormatter from './LoginFormatter'
import {mount} from 'enzyme'

describe('tocco-ui', function() {
  describe('FormattedValue', function() {
    describe('LoginFormatter ', function() {
      it('should format value', function() {
        const value = {username: 'dake'}
        const wrapper = mount(<LoginFormatter
          value={value}/>)
        expect(wrapper.text()).to.equal('dake')
      })
    })
  })
})
