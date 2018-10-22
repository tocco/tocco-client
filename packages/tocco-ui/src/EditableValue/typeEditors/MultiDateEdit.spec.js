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

        test('should set a single date on blur', () => {
          const testTimeInput = {
            exactValue: '2018-10-20',
            fromValue: null,
            toValue: null
          }
          const wrapper = intlEnzyme.mountWithIntl(
            <MultiDateEdit onChange={EMPTY_FUNC} value={testTimeInput} intl={intlOptions}/>
          )
          const innerDateAbstract = wrapper.find(DateAbstract).first()
          innerDateAbstract.simulate('blur')
          expect(innerDateAbstract.props().value).to.eql([testTimeInput.exactValue])
        })
      })
    })
  })
})
