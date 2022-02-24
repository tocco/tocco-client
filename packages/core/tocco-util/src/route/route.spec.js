import {mount} from 'enzyme'

import {loadRoute} from './route'

describe('tocco-util', () => {
  describe('route', () => {
    describe('route', () => {
      describe('loadRoute', () => {
        const InnerComp = () => <div>test</div>
        const InnerComp2 = () => <div>test</div>

        const checkEachComponentRendered = (wrapper, components, done) => {
          wrapper.update()
          components.forEach(comp => expect(wrapper.find(comp)).to.have.length(1))
          done()
        }

        test('should load and render component', done => {
          const promise = Promise.resolve({
            default: {
              container: InnerComp
            }
          })

          const Cmp = loadRoute(null, () => promise)

          const wrapper = mount(<Cmp />)

          setTimeout(() => checkEachComponentRendered(wrapper, [InnerComp], done), 0)
        })

        test('should return component class from cache if loaded with key', done => {
          const promise1 = Promise.resolve({
            default: {container: InnerComp}
          })
          const promise2 = Promise.resolve({
            default: {container: InnerComp2}
          })

          const Cmp = loadRoute(null, () => promise1, 'my-route')
          const Cmp2 = loadRoute(null, () => promise2, 'my-route')

          const wrapper = mount(
            <div>
              <Cmp />
              <Cmp2 />
            </div>
          )

          setTimeout(() => {
            wrapper.update()
            expect(wrapper.find(InnerComp)).to.have.length(2)
            expect(wrapper.find(InnerComp2)).to.have.length(0)
            done()
          }, 0)
        })

        test('should not return component class from cache if loaded without key', done => {
          const promise1 = Promise.resolve({
            default: {container: InnerComp}
          })
          const promise2 = Promise.resolve({
            default: {container: InnerComp2}
          })

          const Cmp = loadRoute(null, () => promise1)
          const Cmp2 = loadRoute(null, () => promise2)

          const wrapper = mount(
            <div>
              <Cmp />
              <Cmp2 />
            </div>
          )

          setTimeout(() => checkEachComponentRendered(wrapper, [InnerComp, InnerComp2], done), 0)
        })

        test('should not return component class from cache if loaded with different key', done => {
          const promise1 = Promise.resolve({
            default: {container: InnerComp}
          })
          const promise2 = Promise.resolve({
            default: {container: InnerComp2}
          })

          const Cmp = loadRoute(null, () => promise1, 'my-route-1')
          const Cmp2 = loadRoute(null, () => promise2, 'my-route-2')

          const wrapper = mount(
            <div>
              <Cmp />
              <Cmp2 />
            </div>
          )

          setTimeout(() => checkEachComponentRendered(wrapper, [InnerComp, InnerComp2], done), 0)
        })
      })
    })
  })
})
