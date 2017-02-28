import React from 'react'
import {shallow} from 'enzyme'

import {EntityBrowser} from './EntityBrowser'

describe('entity-browser', () => {
  describe('components', () => {
    describe('EntityBrowser', () => {
      it('should call initialize', () => {
        const initSpy = sinon.spy()
        shallow(<EntityBrowser routes={[]} initialize={initSpy}/>)
        expect(initSpy).to.have.calledOnce
      })
    })
  })
})
