import React from 'react'
import {mount} from 'enzyme'
import {TestThemeProvider} from 'tocco-test-util'

import Icon from '../../Icon'
import BooleanFormatter from './BooleanFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('BooleanFormatter ', () => {
        test('should format true value', () => {
          const wrapper = mount(<TestThemeProvider>
            <BooleanFormatter value={true}/>
          </TestThemeProvider>
          )

          expect(wrapper.find(Icon).prop('icon')).to.equal('check')
        })

        test('should format falsy value', () => {
          const wrapper = mount(
            <TestThemeProvider>
              <BooleanFormatter value={false}/>
            </TestThemeProvider>
          )
          expect(wrapper.find(Icon).prop('icon')).to.equal('times')
        })
      })
    })
  })
})
