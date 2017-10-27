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
          expect(input.get(0).value).to.eql('')
        })

        it('should render an empty date field if empty array given', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <DateAbstract value={[]}/>
            </IntlProvider>
          )

          const input = wrapper.find('input')

          expect(input).to.have.length(1)
          expect(input.get(0).value).to.eql('')
        })

        it('should render an empty date field if array with null given', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <DateAbstract value={[null]}/>
            </IntlProvider>
          )

          const input = wrapper.find('input')

          expect(input).to.have.length(1)
          expect(input.get(0).value).to.eql('')
        })

        it('should render a date field with a single value', done => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <DateAbstract value={['2017-04-13']}/>
            </IntlProvider>
          )

          const input = wrapper.find('input')

          expect(input).to.have.length(1)

          // workaround to await async load of flatpickr component
          setTimeout(() => {
            expect(input.get(0).value).to.eql('2017-04-13')
            done()
          }, 200)
        })

        it('should render a date field with multiple values', done => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <DateAbstract value={['2017-04-13', '2017-04-14']}/>
            </IntlProvider>
          )

          const input = wrapper.find('input')

          expect(input).to.have.length(1)
          // workaround to await async load of flatpickr component
          setTimeout(() => {
            expect(input.get(0).value).to.eql('2017-04-13; 2017-04-14')
            done()
          }, 200)
        })
      })
    })
  })
})
