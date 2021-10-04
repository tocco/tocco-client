
import {renderHook, act} from '@testing-library/react-hooks'

import useResize from './useResize'

describe('tocco-ui', () => {
  describe('Table', () => {
    describe('useResize', () => {
      beforeEach(() => {
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb())
      })

      afterEach(() => {
        window.requestAnimationFrame.mockRestore()
      })

      test('should return resizingColumn', () => {
        const tableElRef = null
        const resizeCallback = sinon.spy()
        const resizeFinishedCallback = sinon.spy()

        const {result} = renderHook(() => useResize(tableElRef, resizeCallback, resizeFinishedCallback))

        const column = {id: 'firstname'}
        act(() => {
          result.current.startResize(column)()
        })

        expect(result.current.resizingColumn).to.be.eql(column)
      })

      test('should return register and remove mouse events and call callback', () => {
        jest.useFakeTimers()

        const tableElRef = {current: {querySelector: () => ({offsetWidth: 50})}}
        const resizeCallback = sinon.spy()
        const resizeFinishedCallback = sinon.spy()

        const map = {}
        window.addEventListener = jest.fn((event, cb) => {
          map[event] = cb
        })

        window.removeEventListener = event => {
          delete map[event]
        }

        const {result} = renderHook(() => useResize(tableElRef, resizeCallback, resizeFinishedCallback))

        const column = {id: 'firstname'}
        act(() => {
          result.current.startResize(column)()
        })

        expect(map).to.have.property('mousemove')
        expect(map).to.have.property('mouseup')

        map.mousemove({clientX: 100})
        map.mousemove({clientX: 200})
        expect(resizeCallback).to.have.been.calledWith('firstname', 150)

        map.mouseup()

        expect(resizeFinishedCallback).to.have.been.calledWith('firstname')

        jest.runAllTimers()

        expect(map).to.not.have.property('mousemove')
        expect(map).to.not.have.property('mouseup')
      })
    })
  })
})
