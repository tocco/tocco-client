import {renderHook, act} from '@testing-library/react-hooks'

import useResizeObserver from './useResizeObserver'

const createMockResizeObserver = () => {
  let callback = () => {}

  const observe = sinon.spy()
  const unobserve = sinon.spy()
  const disconnect = sinon.spy()

  class MockResizeObserver {
    constructor(observeCallback) {
      callback = observeCallback
    }

    observe = observe
    unobserve = unobserve
    disconnect = disconnect
  }

  const onResize = entries => callback(entries)

  global.ResizeObserver = MockResizeObserver
  return [onResize, {observe, unobserve, disconnect}]
}

describe('tocco-ui', () => {
  describe('Button', () => {
    describe('useResizeObserver', () => {
      test('should provide a ref', () => {
        const {result} = renderHook(() => useResizeObserver())

        const [ref] = result.current
        expect(typeof ref).to.eql('function')
      })

      test('should update contentRect on resize', () => {
        const [onResize] = createMockResizeObserver()
        const node = {}

        const {result} = renderHook(() => useResizeObserver())

        const [ref] = result.current

        act(() => {
          ref(node)
          onResize([{contentRect: {width: 200}}])
        })

        const [_ref, contentRect] = result.current // eslint-disable-line no-unused-vars
        expect(contentRect).to.eql({width: 200})
      })

      test('should ignore broken resize callbacks', () => {
        const [onResize] = createMockResizeObserver()
        const node = {}

        const {result} = renderHook(() => useResizeObserver())

        const [ref] = result.current

        act(() => {
          ref(node)
          onResize([{contentRect: {width: 200}}])
          onResize('no array')
        })

        const [_ref, contentRect] = result.current // eslint-disable-line no-unused-vars
        expect(contentRect).to.eql({width: 200})
      })

      test('should use first entry in resize callback', () => {
        const [onResize] = createMockResizeObserver()
        const node = {}

        const {result} = renderHook(() => useResizeObserver())

        const [ref] = result.current

        act(() => {
          ref(node)
          onResize([{contentRect: {width: 200}}, {contentRect: {width: 400}}])
        })

        const [_ref, contentRect] = result.current // eslint-disable-line no-unused-vars
        expect(contentRect).to.eql({width: 200})
      })

      test('should observe when ref is connected', () => {
        const [_onResize, {observe}] = createMockResizeObserver() // eslint-disable-line no-unused-vars
        const node = {foo: 'bar'}

        const {result} = renderHook(() => useResizeObserver())

        const [ref] = result.current

        act(() => {
          ref(node)
        })

        expect(observe).to.have.been.calledWith(node)
      })

      test('should disconnect observer on unmount', () => {
        const [_onResize, {disconnect}] = createMockResizeObserver() // eslint-disable-line no-unused-vars
        const node = {}

        const {result, unmount} = renderHook(() => useResizeObserver())

        const [ref] = result.current

        act(() => {
          ref(node)
        })

        unmount()

        expect(disconnect).to.have.been.calledOnce
      })
    })
  })
})
