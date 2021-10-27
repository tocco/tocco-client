import {renderHook, act} from '@testing-library/react-hooks'

import useDnD from './useDnD'

describe('tocco-ui', () => {
  describe('Table', () => {
    describe('useDnD', () => {
      test('should set state and event for drag and drop event', () => {
        const event = {stopPropagation: () => {}}
        const changePosition = sinon.spy()
        const draggingFieldId = 'firstname'
        const dragOverFieldId = 'lastname'

        const {result} = renderHook(() => useDnD(changePosition))

        expect(result.current.dndState.currentlyDragging).to.be.null

        act(() => {
          result.current.dndEvents(draggingFieldId).onDragStart(event)
        })

        expect(result.current.dndState.currentlyDragging).to.eql(draggingFieldId)

        act(() => {
          result.current.dndEvents(dragOverFieldId).onDragEnter(event)
        })

        expect(result.current.dndState.currentlyDragOver).to.eql(dragOverFieldId)

        act(() => {
          result.current.dndEvents(draggingFieldId).onDrop(event)
        })

        expect(changePosition).to.be.calledWith(draggingFieldId, dragOverFieldId)
        expect(result.current.dndState.currentlyDragging).to.be.null
        expect(result.current.dndState.currentlyDragOver).to.be.null
      })

      test('should set state for drag abort', () => {
        const event = {stopPropagation: () => {}}
        const changePosition = sinon.spy()
        const draggingFieldId = 'firstname'
        const dragOverFieldId = 'lastname'

        const {result} = renderHook(() => useDnD(changePosition))

        act(() => {
          result.current.dndEvents(draggingFieldId).onDragStart(event)
        })

        expect(result.current.dndState.currentlyDragging).to.eql(draggingFieldId)

        act(() => {
          result.current.dndEvents(dragOverFieldId).onDragEnter(event)
        })

        expect(result.current.dndState.currentlyDragOver).to.eql(dragOverFieldId)

        act(() => {
          result.current.dndEvents(dragOverFieldId).onDrop(event)
        })
        expect(result.current.dndState.currentlyDragging).to.be.null
      })

      test('should clear state on dragend', () => {
        let dragend
        const addEventListenerSpy = sinon.spy()
        const event = {
          stopPropagation: () => {},
          target: {
            addEventListener: (_event, func) => {
              dragend = func
              addEventListenerSpy()
            },
            removeEventListener: sinon.spy()
          }
        }
        const changePosition = sinon.spy()
        const draggingFieldId = 'firstname'

        const {result} = renderHook(() => useDnD(changePosition))

        expect(result.current.dndState.currentlyDragging).to.be.null

        act(() => {
          result.current.dndEvents(draggingFieldId).onDragStart(event)
        })

        expect(result.current.dndState.currentlyDragging).to.eql(draggingFieldId)
        expect(addEventListenerSpy).to.be.calledOnce
        act(() => {
          dragend({stopPropagation: () => {}})
        })

        expect(event.target.removeEventListener).to.be.calledOnce
        expect(result.current.dndState.currentlyDragging).to.be.null
      })
    })
  })
})
