import React from 'react'
import {enzymeUtil} from 'tocco-test-util'

import TimeEdit from './TimeEdit'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('TimeEdit ', () => {
        test('should render input', () => {
          const wrapper = enzymeUtil.mountEmbedded(
            <TimeEdit value="16:30" onChange={EMPTY_FUNC}/>
          )
          expect(wrapper.find('input')).to.have.length(1)
        })
      })
    })
  })
})
