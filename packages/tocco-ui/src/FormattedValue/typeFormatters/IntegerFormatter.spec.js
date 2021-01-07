import React from 'react'
import {mount} from 'enzyme'
import {IntlProvider} from 'react-intl'

import IntegerFormatter from './IntegerFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('IntegerFormatter ', () => {
        test('should show value unformatted', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <IntegerFormatter value={99999}/>
            </IntlProvider>
          )
          expect(wrapper.text()).to.equal('99999')
        })
      })
    })
  })
})
