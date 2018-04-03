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
          expect(input.instance().value).to.eql('')
        })

        it('should render an empty date field if empty array given', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <DateAbstract value={[]}/>
            </IntlProvider>
          )

          const input = wrapper.find('input')

          expect(input).to.have.length(1)
          expect(input.instance().value).to.eql('')
        })

        it('should render an empty date field if array with null given', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <DateAbstract value={[null]}/>
            </IntlProvider>
          )

          const input = wrapper.find('input')

          expect(input).to.have.length(1)
          expect(input.instance().value).to.eql('')
        })

        it('should render a date field with a single value', done => {
          const initialized = () => {
            const input = wrapper.find('input')
            expect(input).to.have.length(1)
            expect(input.instance().value).to.eql('2017-04-13')
            done()
          }

          const wrapper = mount(
            <IntlProvider locale="en">
              <DateAbstract value={['2017-04-13']} initialized={initialized}/>
            </IntlProvider>
          )
        })

        it('should render a date field with multiple values', done => {
          const initialized = () => {
            const input = wrapper.find('input')
            expect(input).to.have.length(1)
            expect(input.instance().value).to.eql('2017-04-13; 2017-04-14')
            done()
          }

          const wrapper = mount(
            <IntlProvider locale="en">
              <DateAbstract value={['2017-04-13', '2017-04-14']} initialized={initialized}/>
            </IntlProvider>
          )
        })
      })
    })
  })
})
