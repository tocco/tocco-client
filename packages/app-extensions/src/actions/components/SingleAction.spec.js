import React from 'react'
import {Button} from 'tocco-ui'
import {intlEnzyme} from 'tocco-test-util'

import SingleAction from './SingleAction'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('components', () => {
      describe('SingleAction', () => {
        test('should invoke onclick and stop propagation', () => {
          const definition = {}
          const clickSpy = sinon.spy()
          const stopPropagationSpy = sinon.spy()
          const wrapper = intlEnzyme.mountWithIntl(<SingleAction definition={definition} onClick={clickSpy}/>)
          wrapper.find(Button).simulate('click', {stopPropagation: stopPropagationSpy})
          expect(clickSpy).to.have.property('callCount', 1)
          expect(stopPropagationSpy).to.have.property('callCount', 1)
        })
      })
    })
  })
})
