import React from 'react'
import {mount} from 'enzyme'
import asyncRoute from './asyncRoute'

describe('entity-browser', () => {
  describe('util', () => {
    describe('asyncRoute', () => {
      const InnerComp = () => <div>test</div>

      it('should render nothing before loaded', () => {
        const promise = new Promise(() => {}) // never resolved

        const AsyncComp = asyncRoute(() => promise)
        const wrapper = mount(<AsyncComp/>)

        expect(wrapper.find(InnerComp)).to.have.length(0)
      })

      it('should render component when loaded', done => {
        const promise = Promise.resolve(InnerComp)

        const AsyncComp = asyncRoute(() => promise)
        const wrapper = mount(<AsyncComp/>)

        promise.then(() => {
          expect(wrapper.find(InnerComp)).to.have.length(1)
          done()
        })
      })
    })
  })
})
