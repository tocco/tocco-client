import React from 'react'
import {enzymeUtil} from 'tocco-test-util'

import DateAbstract from './DateAbstract'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('DateAbstract', () => {
        test('should call initialized', done => {
          const initSpy = () => { done() }

          const wrapper = enzymeUtil.mountEmbedded(
            <DateAbstract options={{}} initialized={initSpy} onChange={() => {}}/>
          )

          expect(wrapper.find('input')).to.have.length(2)
        })
      })
    })
  })
})
