import {isEqual} from 'lodash'
import {useCallback, useMemo, useState} from 'react'

const initialState = {
  currentlyDragging: null,
  currentlyDragOver: null,
  dropPosition: null,
  offset: null
}

export const DropPosition = {
  Top: 'Top',
  Bottom: 'Bottom'
}

export default changePosition => {
  const [state, setState] = useState(initialState)
  const {currentlyDragging, currentlyDragOver, dropPosition, offset} = state

  const events = useCallback(
    item => ({
      onDragStart: e => {
        setState(state => ({...state, currentlyDragging: item}))

        /**
         * Workaround: https://github.com/facebook/react/issues/1355
         * dragEnd-event is not fired in React for already removed components.
         * That's why we need to add the event listener for this event on the dom node directly.
         */
        const draggableElement = e.target
        const onDragEnd = dragEndEvent => {
          setState(initialState)
          dragEndEvent.stopPropagation()
          if (draggableElement) {
            draggableElement.removeEventListener('dragend', onDragEnd)
          }
        }
        if (draggableElement) {
          draggableElement.addEventListener('dragend', onDragEnd, false)
        }

        e.stopPropagation()
      },
      onDragEnter: e => {
        if (currentlyDragging && !isEqual(currentlyDragOver, item)) {
          const bounding = e.target ? e.target.getBoundingClientRect() : {}
          const offset = bounding.y + bounding.height / 2
          setState(state => ({...state, currentlyDragOver: item, offset}))
        }
        e.stopPropagation()
      },
      onDragOver: e => {
        if (currentlyDragging) {
          const after = e.clientY - offset > 0
          const dropPosition = after ? DropPosition.Bottom : DropPosition.Top
          setState(state => ({...state, dropPosition}))
          e.preventDefault()
          e.stopPropagation()
          return true
        }
      },
      onDrop: e => {
        if (currentlyDragging && currentlyDragOver) {
          changePosition(currentlyDragging, currentlyDragOver, dropPosition)
          setState(initialState)
          e.stopPropagation()
        }
      }
    }),
    [currentlyDragOver, currentlyDragging, dropPosition, offset, changePosition]
  )

  // so that state object is not changing unnecessary although no value on object has changed
  const dndState = useMemo(
    () => ({
      currentlyDragOver,
      currentlyDragging,
      dropPosition,
      offset
    }),
    [currentlyDragOver, currentlyDragging, dropPosition, offset]
  )

  return {dndEvents: events, dndState}
}
