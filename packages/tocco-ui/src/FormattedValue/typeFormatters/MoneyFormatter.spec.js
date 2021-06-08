import React from 'react'
import {mount} from 'enzyme'
import {IntlProvider} from 'react-intl'

import MoneyFormatter from './MoneyFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('MoneyFormatter ', () => {
        test('should format a money amount', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <MoneyFormatter value={1245.50}/>
            </IntlProvider>
          )
          expect(wrapper.text()).to.equal('1,245.50')
        })

        test('should format a money amount regarding locale', () => {
          const wrapper = mount(
            <IntlProvider locale="de-CH">
              <MoneyFormatter value={1245.50}/>
            </IntlProvider>
          )
          expect(wrapper.text()).to.match(/1['’]245.50/)
        })
      })
    })
  })
})
