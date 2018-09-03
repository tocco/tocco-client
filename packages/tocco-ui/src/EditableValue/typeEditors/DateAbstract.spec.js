import React from 'react'
import {intlEnzyme} from 'tocco-test-util'

import DateAbstract from './DateAbstract'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('DateAbstract', () => {
        it('should call initialized', function(done) {
          this.timeout(10000)

          const initSpy = () => { done() }

          intlEnzyme.mountWithIntl(
            <DateAbstract options={{}} initialized={initSpy}/>
          )
        })
      })
    })
  })
})
