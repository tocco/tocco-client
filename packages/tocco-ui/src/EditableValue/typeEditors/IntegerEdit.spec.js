import React from 'react'
import {mountWithIntl} from 'tocco-test-util/src/intlEnzyme/intlEnzyme'

import IntegerEdit from './IntegerEdit'
import NumberEdit from './NumberEdit'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('IntegerEdit ', () => {
        test('should render NumberEdit', () => {
          const wrapper = mountWithIntl(
            <IntegerEdit value={1234567} options={{}} onChange={EMPTY_FUNC} />
          )
          expect(wrapper.find(NumberEdit)).to.have.length(1)
        })

        test('should render NumberEdit with correct value', () => {
          const wrapper = mountWithIntl(
            <IntegerEdit value={1234567} options={{}} onChange={EMPTY_FUNC} />
          )
          expect(wrapper.find(NumberEdit).props().value).to.be.eql(1234567)
        })
      })
    })
  })
})
