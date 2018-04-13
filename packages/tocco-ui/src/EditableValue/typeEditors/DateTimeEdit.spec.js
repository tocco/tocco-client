import React from 'react'
import DateTimeEdit from './DateTimeEdit'
import DateAbstract from './DateAbstract'
import {intlEnzyme} from 'tocco-test-util'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('DateTimeEdit ', () => {
        it('should render an instance of DateAbstract', () => {
          const wrapper = intlEnzyme.mountWithIntl(
            <DateTimeEdit onChange={EMPTY_FUNC}/>
          )

          const dateAbstract = wrapper.find(DateAbstract)
          expect(dateAbstract).to.have.length(1)
        })
      })
    })
  })
})
