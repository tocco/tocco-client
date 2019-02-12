import React from 'react'
import {mount} from 'enzyme'
import {IntlProvider} from 'react-intl'

import LongitudeFormatter from './LongitudeFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('LongitudeFormatter ', () => {
        test('should format value', () => {
          const value = {value: 0.82710405122667465, minimum: false, maximum: false}
          const wrapper = mount(<IntlProvider locale="en"><LongitudeFormatter
            value={value}/></IntlProvider>)
          expect(wrapper.text()).to.equal('0.827104051226675')
        })

        test('should format value accorind to locale', () => {
          const value = {value: 0.82710405122667465, minimum: false, maximum: false}
          const wrapper = mount(<IntlProvider locale="de"><LongitudeFormatter
            value={value}/></IntlProvider>)
          expect(wrapper.text()).to.equal('0,827104051226675')
        })
      })
    })
  })
})
