
import {renderHook, act} from '@testing-library/react-hooks'

import useResize from './useResize'

describe('tocco-util', () => {
  describe('resize', () => {
    describe('useResize', () => {
      beforeEach(() => {
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb())
      })

      afterEach(() => {
        window.requestAnimationFrame.mockRestore()
      })

      test('should return resizeState', () => {
        const selector = sinon.spy()
        const resizeCallback = sinon.spy()
        const resizeFinishedCallback = sinon.spy()

        const expectedResizingState = {
          resizingElement: '1',
          isResizing: true
        }

        const {result} = renderHook(() => useResize(selector, resizeCallback, resizeFinishedCallback))

        const element = '1'
        act(() => {
          result.current.startResize(element)()
        })

        expect(result.current.resizeState).to.deep.equal(expectedResizingState)
      })

      test('should return register and remove mouse events and call callback', () => {
        const selector = () => ({clientWidth: 50, clientHeight: 50})
        const resizeCallback = sinon.spy()
        const resizeFinishedCallback = sinon.spy()

        const {result} = renderHook(() => useResize(selector, resizeCallback, resizeFinishedCallback))

        const element = '1'
        act(() => {
          result.current.startResize(element)()
        })

        act(() => {
          result.current.resizingEvents.onMouseMove({clientX: 100, clientY: 100})
          result.current.resizingEvents.onMouseMove({clientX: 200, clientY: 200})
        })

        expect(resizeCallback).to.have.been.calledWith('1', {width: 150, height: 150})

        act(() => {
          result.current.resizingEvents.onMouseUp()
        })

        expect(resizeFinishedCallback).to.have.been.calledWith('1')
      })

      test('should stop resizing immediately when mouse up event invoked', () => {
        jest.useFakeTimers()

        const selector = () => ({clientWidth: 50, clientHeight: 50})
        const resizeCallback = sinon.spy()
        const resizeFinishedCallback = sinon.spy()

        const {result} = renderHook(() => useResize(selector, resizeCallback, resizeFinishedCallback))

        const element = '1'
        act(() => {
          result.current.startResize(element)()
        })

        act(() => {
          result.current.resizingEvents.onMouseMove({clientX: 100, clientY: 100})
          result.current.resizingEvents.onMouseMove({clientX: 200, clientY: 200})
        })

        expect(resizeCallback.called).to.equal(true)
        
        resizeCallback.resetHistory()

        act(() => {
          result.current.resizingEvents.onMouseUp()
        })
        act(() => {
          result.current.resizingEvents.onMouseMove({clientX: 300, clientY: 300})
        })

        expect(resizeCallback.called).to.equal(false)
      })
    })
  })
})
