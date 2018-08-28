import React from 'react'
import {mount} from 'enzyme'

import lazyComponent from './lazyComponent'

describe('tocco-ui', () => {
  describe('util', () => {
    describe('lazyLoadComponent', () => {
      const InnerComp = () => <div>test</div>

      it('should render nothing before loaded', () => {
        const promise = new Promise(() => {}) // never resolved

        const AsyncComp = lazyComponent(() => promise)
        const wrapper = mount(<AsyncComp/>)
        wrapper.update()
        expect(wrapper.find(InnerComp)).to.have.length(0)
      })

      it('should render component when loaded', done => {
        const promise = Promise.resolve(InnerComp)

        const AsyncComp = lazyComponent(() => promise)
        const wrapper = mount(<AsyncComp/>)

        promise.then(() => {
          wrapper.update()
          expect(wrapper.find(InnerComp)).to.have.length(1)
          done()
        })
      })

      it('should respect selector param', done => {
        const selector = 'xyz'
        const promise = Promise.resolve({[selector]: InnerComp})
        const AsyncComp = lazyComponent(() => promise, selector)
        const wrapper = mount(<AsyncComp/>)

        promise.then(() => {
          wrapper.update()
          expect(wrapper.find(InnerComp)).to.have.length(1)
          done()
        })
      })

      it('should respect default component param', () => {
        const Default = () => <div>loading...</div>
        const promise = new Promise(() => {})

        const AsyncComp = lazyComponent(() => promise, null, <Default/>)
        const wrapper = mount(<AsyncComp/>)
        wrapper.update()
        expect(wrapper.find(Default)).to.have.length(1)
        expect(wrapper.html()).to.contains('loading...')
      })

      it('should call onLoaded', done => {
        const onLoadedSpy = sinon.spy()
        const promise = Promise.resolve(InnerComp)
        const AsyncComp = lazyComponent(() => promise, null, null, onLoadedSpy)
        const wrapper = mount(<AsyncComp/>)
        expect(onLoadedSpy).not.to.be.called
        promise.then(() => {
          wrapper.update()
          expect(onLoadedSpy).to.be.called
          done()
        })
      })

      it('should set mounted var accordingly and not log an error', done => {
        const promise = new Promise(resolve => setTimeout(resolve({default: InnerComp}), 100))

        const AsyncComp = lazyComponent(() => promise)
        const wrapper = mount(<AsyncComp/>)
        expect(wrapper.instance().mounted).to.be.true
        wrapper.unmount()

        promise.then(done())
      })
    })
  })
})
