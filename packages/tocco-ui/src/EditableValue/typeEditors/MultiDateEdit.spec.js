import React from 'react'
import {intlEnzyme, IntlStub} from 'tocco-test-util'

import MultiDateEdit from './MultiDateEdit'
import DateAbstract from './DateAbstract'

const EMPTY_FUNC = () => {}
const valueObject = {
  exactValue: null,
  fromValue: null,
  toValue: null
}
const intlOptions = {...IntlStub, locale: 'de'}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('MultiDateEdit ', () => {
        test('should render an instance of DateAbstract', () => {
          const wrapper = intlEnzyme.mountWithIntl(
            <MultiDateEdit onChange={EMPTY_FUNC} value={valueObject}/>
          )

          const dateAbstract = wrapper.find(DateAbstract)
          expect(dateAbstract).to.have.length(1)
        })

        test('should set a single date', () => {
          const testTimeInput = {
            exactValue: '2018-10-20',
            fromValue: null,
            toValue: null
          }
          const wrapper = intlEnzyme.mountWithIntl(
            <MultiDateEdit onChange={EMPTY_FUNC} value={testTimeInput} intl={intlOptions}/>
          )
          const innerDateAbstract = wrapper.find(DateAbstract).first()
          expect(innerDateAbstract.props().value).to.eql([testTimeInput.exactValue])
        })

        test('should switch button-text on click', done => {
          const testTimeInput = {
            exactValue: '2018-10-20',
            fromValue: null,
            toValue: null
          }
          const wrapper = intlEnzyme.mountWithIntl(
            <MultiDateEdit onChange={EMPTY_FUNC} value={testTimeInput} intl={intlOptions}/>
          )
          const button = wrapper.find('button')
          setTimeout(() => {
            button.simulate('click')
            expect(button.text()).to.eql('Exact Calendar')
            done()
          })
        })

        test('should render two input fields on click', done => {
          const testTimeInput = {
            exactValue: null,
            fromValue: '2018-10-20',
            toValue: null
          }
          const wrapper = intlEnzyme.mountWithIntl(
            <MultiDateEdit onChange={EMPTY_FUNC} value={testTimeInput} intl={intlOptions}/>
          )
          const button = wrapper.find('button')
          setTimeout(() => {
            button.simulate('click')
            const inputFields = wrapper.find(DateAbstract)
            expect(inputFields).to.have.lengthOf(2)
            done()
          })
        })
      })
    })
  })
})
