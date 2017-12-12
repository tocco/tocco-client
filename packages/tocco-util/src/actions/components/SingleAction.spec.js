import {shallow} from 'enzyme'
import React from 'react'
import SingleAction from './SingleAction'
import {Button} from 'tocco-ui'

describe('tocco-util', () => {
  describe('actions', () => {
    describe('components', () => {
      describe('SingleAction', () => {
        it('should invoke onclick and stop propagation', () => {
          const definition = {}
          const clickSpy = sinon.spy()
          const stopPropagationSpy = sinon.spy()
          const wrapper = shallow(<SingleAction definition={definition} onClick={clickSpy}/>)
          wrapper.find(Button).simulate('click', {stopPropagation: stopPropagationSpy})
          expect(clickSpy).to.have.property('callCount', 1)
          expect(stopPropagationSpy).to.have.property('callCount', 1)
        })
      })
    })
  })
})
