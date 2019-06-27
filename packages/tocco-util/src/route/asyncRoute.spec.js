import React from 'react'
import {mount} from 'enzyme'

import asyncRoute from './asyncRoute'

describe('tocco-util', () => {
  describe('route', () => {
    describe('asyncRoute', () => {
      const InnerComp = () => <div>test</div>

      test('should render nothing before loaded', () => {
        const promise = new Promise(() => {
        }) // never resolved

        const AsyncComp = asyncRoute(() => promise)
        const wrapper = mount(<AsyncComp/>)
        wrapper.update()
        expect(wrapper.find(InnerComp)).to.have.length(0)
      })

      test('should render component when loaded', done => {
        const promise = Promise.resolve(InnerComp)

        const AsyncComp = asyncRoute(() => promise)
        const wrapper = mount(<AsyncComp/>)

        promise.then(() => {
          wrapper.update()
          expect(wrapper.find(InnerComp)).to.have.length(1)
          done()
        })
      })

      test('should set mounted var accordingly and not log an error', done => {
        const promise = new Promise(resolve => setTimeout(resolve(InnerComp), 100))

        const AsyncComp = asyncRoute(() => promise)
        const wrapper = mount(<AsyncComp/>)
        expect(wrapper.instance().mounted).to.be.true
        wrapper.unmount()

        promise.then(done())
      })
    })
  })
})
