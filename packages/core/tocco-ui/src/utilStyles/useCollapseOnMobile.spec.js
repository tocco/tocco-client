import {renderHook, act} from '@testing-library/react-hooks'

import {useCollapseOnMobile} from '../utilStyles'

describe('tocco-ui', () => {
  describe('utilStyles', () => {
    describe('useCollapseOnMobile', () => {
      test('should collapse on screens smaller than 768px', () => {
        global.innerWidth = 767
        const initialCollapseState = false
        const setSearchFormCollapsed = sinon.spy()
        const {result} = renderHook(() => useCollapseOnMobile(initialCollapseState, setSearchFormCollapsed))

        expect(result.current.isCollapsed).to.be.true
      })

      test('should expand on screens larger than 768px', () => {
        global.innerWidth = 769
        const initialCollapseState = false
        const setSearchFormCollapsed = sinon.spy()
        const {result} = renderHook(() => useCollapseOnMobile(initialCollapseState, setSearchFormCollapsed))

        expect(result.current.isCollapsed).to.be.false
      })

      test('should toggle panel on initial state "false" and call callback handler', () => {
        const initialCollapseState = false
        const setSearchFormCollapsed = sinon.spy()
        const {result} = renderHook(() => useCollapseOnMobile(initialCollapseState, setSearchFormCollapsed))

        act(() => {
          result.current.toggleCollapse()
        })

        expect(setSearchFormCollapsed).to.have.been.calledWith(true)
        expect(result.current.isCollapsed).to.be.true
      })

      test('should toggle panel on initial state "true" and call callback handler', () => {
        const initialCollapseState = true
        const setSearchFormCollapsed = sinon.spy()
        const {result} = renderHook(() => useCollapseOnMobile(initialCollapseState, setSearchFormCollapsed))

        act(() => {
          result.current.toggleCollapse()
        })

        expect(setSearchFormCollapsed).to.have.been.calledWith(false)
        expect(result.current.isCollapsed).to.be.false
      })
    })
  })
})
