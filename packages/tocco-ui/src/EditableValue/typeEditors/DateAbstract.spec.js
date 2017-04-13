import React from 'react'
import {mount} from 'enzyme'
import {IntlProvider} from 'react-intl'

import DateAbstract from './DateAbstract'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('DateAbstract ', () => {
        it('should render an empty date field if null given', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <DateAbstract value={null}/>
            </IntlProvider>
          )

          const input = wrapper.find('input')

          expect(input).to.have.length(1)
          expect(input).to.have.attr('value', '')
        })

        it('should render an empty date field if empty array given', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <DateAbstract value={[]}/>
            </IntlProvider>
          )

          const input = wrapper.find('input')

          expect(input).to.have.length(1)
          expect(input).to.have.attr('value', '')
        })

        it('should render an empty date field if array with null given', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <DateAbstract value={[null]}/>
            </IntlProvider>
          )

          const input = wrapper.find('input')

          expect(input).to.have.length(1)
          expect(input).to.have.attr('value', '')
        })

        it('should render a date field with a single value', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <DateAbstract value={['2017-04-13']}/>
            </IntlProvider>
          )

          const input = wrapper.find('input')

          expect(input).to.have.length(1)
          expect(input).to.have.attr('value', '2017-04-13')
        })

        it('should render a date field with multiple values', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <DateAbstract value={['2017-04-13', '2017-04-14']}/>
            </IntlProvider>
          )

          const input = wrapper.find('input')

          expect(input).to.have.length(1)
          expect(input).to.have.attr('value', '2017-04-13; 2017-04-14')
        })
      })
    })
  })
})
