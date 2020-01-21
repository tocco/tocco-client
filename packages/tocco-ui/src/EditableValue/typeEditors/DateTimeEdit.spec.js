import React from 'react'
import {enzymeUtil} from 'tocco-test-util'

import DateTimeEdit from './DateTimeEdit'
import DateAbstract from './DateAbstract'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('DateTimeEdit ', () => {
        test('should render an instance of DateAbstract', () => {
          const wrapper = enzymeUtil.mountEmbedded(
            <DateTimeEdit onChange={EMPTY_FUNC}/>
          )

          const dateAbstract = wrapper.find(DateAbstract)
          expect(dateAbstract).to.have.length(1)
        })
      })
    })
  })
})
