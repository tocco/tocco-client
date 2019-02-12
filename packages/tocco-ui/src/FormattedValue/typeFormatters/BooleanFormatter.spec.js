import React from 'react'
import {shallow} from 'enzyme'

import Icon from '../../Icon'
import BooleanFormatter from './BooleanFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('BooleanFormatter ', () => {
        test('should format true value', () => {
          const wrapper = shallow(
            <BooleanFormatter value/>
          )
          expect(wrapper.find(Icon).prop('icon')).to.equal('check')
        })

        test('should format falsy value', () => {
          const wrapper = shallow(
            <BooleanFormatter value={false}/>
          )
          expect(wrapper.find(Icon).prop('icon')).to.equal('times')
        })
      })
    })
  })
})
