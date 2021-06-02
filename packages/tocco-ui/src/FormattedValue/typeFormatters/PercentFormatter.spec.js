import React from 'react'
import {mount} from 'enzyme'
import {IntlProvider} from 'react-intl'

import PercentFormatter from './PercentFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('PercentFormatter ', () => {
        test('should format value', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <PercentFormatter value={2.41}/>
            </IntlProvider>
          )
          expect(wrapper.text()).to.equal('2.41%')
        })

        test('should format value accorind to locale', () => {
          const wrapper = mount(
            <IntlProvider locale="de">
              <PercentFormatter value={99.9}/>
            </IntlProvider>
          )
          expect(wrapper.text()).to.equal('99,90%')
        })
      })
    })
  })
})
