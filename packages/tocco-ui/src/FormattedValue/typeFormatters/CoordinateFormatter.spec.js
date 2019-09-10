import React from 'react'
import {mount} from 'enzyme'
import {IntlProvider} from 'react-intl'

import CoordinateFormatter from './CoordinateFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('LongitudeFormatter ', () => {
        test('should format value', () => {
          const value = 0.82710405122667465
          const wrapper = mount(<IntlProvider locale="en"><CoordinateFormatter
            value={value}/></IntlProvider>)
          expect(wrapper.text()).to.equal('0.827104051226675')
        })

        test('should format value accorind to locale', () => {
          const value = 0.82710405122667465
          const wrapper = mount(<IntlProvider locale="de"><CoordinateFormatter
            value={value}/></IntlProvider>)
          expect(wrapper.text()).to.equal('0,827104051226675')
        })
      })
    })
  })
})
