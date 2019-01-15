import React from 'react'
import {intlEnzyme} from 'tocco-test-util'

import DateAbstract from './DateAbstract'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('DateAbstract', () => {
        test('should call initialized', done => {
          const initSpy = () => { done() }

          const wrapper = intlEnzyme.mountWithIntl(
            <DateAbstract options={{}} initialized={initSpy}/>
          )

          expect(wrapper.find('input')).to.have.length(2)
        })
      })
    })
  })
})
