import React from 'react'
import {enzymeUtil} from 'tocco-test-util'

import DateEdit from './DateEdit'
import DateAbstract from './DateAbstract'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('DateEdit ', () => {
        test('should render an instance of DateAbstract', () => {
          const wrapper = enzymeUtil.mountEmbedded(
            <DateEdit onChange={EMPTY_FUNC}/>
          )

          const dateAbstract = wrapper.find(DateAbstract)
          expect(dateAbstract).to.have.length(1)
        })
      })
    })
  })
})
