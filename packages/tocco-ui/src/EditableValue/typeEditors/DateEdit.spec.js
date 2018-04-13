import React from 'react'
import DateEdit from './DateEdit'
import DateAbstract from './DateAbstract'
import {intlEnzyme} from 'tocco-test-util'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('DateEdit ', () => {
        it('should render an instance of DateAbstract', () => {
          const wrapper = intlEnzyme.mountWithIntl(
            <DateEdit onChange={EMPTY_FUNC}/>
          )

          const dateAbstract = wrapper.find(DateAbstract)
          expect(dateAbstract).to.have.length(1)
        })
      })
    })
  })
})
