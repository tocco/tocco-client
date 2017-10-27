import React from 'react'
import {mount} from 'enzyme'
import lazyComponent from './lazyComponent'

describe('tocco-ui', () => {
  describe('util', () => {
    describe('lazyLoadComponent', () => {
      const InnerComp = () => <div>test</div>

      it('should render nothing before loaded', () => {
        const promise = new Promise(() => {
        }) // never resolved

        const AsyncComp = lazyComponent(() => promise)
        const wrapper = mount(<AsyncComp/>)

        expect(wrapper.find(InnerComp)).to.have.length(0)
      })

      it('should render component when loaded', done => {
        const promise = Promise.resolve(InnerComp)

        const AsyncComp = lazyComponent(() => promise)
        const wrapper = mount(<AsyncComp/>)

        promise.then(() => {
          expect(wrapper.find(InnerComp)).to.have.length(1)
          done()
        })
      })

      it('should set mounted var accordingly and not log an error', done => {
        const promise = new Promise(resolve => setTimeout(resolve(InnerComp), 100))

        const AsyncComp = lazyComponent(() => promise)
        const wrapper = mount(<AsyncComp/>)
        expect(wrapper.instance().mounted).to.be.true
        wrapper.unmount()

        promise.then(done())
      })
    })
  })
})
