import React from 'react'
import {shallow} from 'enzyme'

import Icon from '../../Icon'
import BooleanFormatter from './BooleanFormatter'

describe('tocco-ui', function() {
  describe('FormattedValue', function() {
    describe('typeFormatters', () => {
      describe('BooleanFormatter ', function() {
        it('should format true value', function() {
          const wrapper = shallow(
            <BooleanFormatter value/>
          )
          expect(wrapper.find(Icon).prop('icon')).to.equal('check')
        })

        it('should format falsy value', function() {
          const wrapper = shallow(
            <BooleanFormatter value={false}/>
          )
          expect(wrapper.find(Icon).prop('icon')).to.equal('times')
        })
      })
    })
  })
})
