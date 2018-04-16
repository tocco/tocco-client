import React from 'react'
import DateAbstract from './DateAbstract'
import {intlEnzyme} from 'tocco-test-util'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('DateAbstract', () => {
        it('should call initialized', done => {
          const initSpy = () => { done() }

          intlEnzyme.mountWithIntl(
            <DateAbstract options={{}} initialized={initSpy}/>
          )
        })
      })
    })
  })
})
