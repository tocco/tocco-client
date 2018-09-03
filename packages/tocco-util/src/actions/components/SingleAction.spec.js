import React from 'react'
import {Button} from 'tocco-ui'
import {intlEnzyme} from 'tocco-test-util'

import SingleAction from './SingleAction'

describe('tocco-util', () => {
  describe('actions', () => {
    describe('components', () => {
      describe('SingleAction', () => {
        it('should invoke onclick and stop propagation', () => {
          const definition = {}
          const clickSpy = sinon.spy()
          const stopPropagationSpy = sinon.spy()
          const wrapper = intlEnzyme.shallowWithIntl(<SingleAction definition={definition} onClick={clickSpy}/>)
          wrapper.find(Button).simulate('click', {stopPropagation: stopPropagationSpy})
          expect(clickSpy).to.have.property('callCount', 1)
          expect(stopPropagationSpy).to.have.property('callCount', 1)
        })
      })
    })
  })
})
