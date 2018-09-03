import React from 'react'
import {mount} from 'enzyme'

import LoginFormatter from './LoginFormatter'

describe('tocco-ui', function() {
  describe('FormattedValue', function() {
    describe('typeFormatters', () => {
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
})
