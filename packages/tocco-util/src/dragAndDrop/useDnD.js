import {isEqual} from 'lodash'
import {useState} from 'react'

const initialState = {
  currentlyDragging: null,
  currentlyDragOver: null,
  dropPosition: null, // 'after' or 'before'
  offset: null
}

export const DropPosition = {
  Before: 'Before',
  After: 'After'
}

export default changePosition => {
  const [state, setState] = useState(initialState)

  const events = item => ({
    onDragStart: e => {
      setState({...state, currentlyDragging: item})
    },
    onDragEnter: e => {
      if (!isEqual(state.currentlyDragOver, item)) {
        const bounding = e.target ? e.target.getBoundingClientRect() : {}
        const offset = bounding.y + (bounding.height / 2)
        setState({...state, currentlyDragOver: item, offset})
      }
      e.stopPropagation()
    },
    onDragOver: e => {
      const after = e.clientY - state.offset > 0
      const dropPosition = after ? DropPosition.After : DropPosition.Before
      setState(state => ({...state, dropPosition}))
      e.preventDefault()
      e.stopPropagation()
      return true
    },
    onDrop: e => {
      changePosition(state.currentlyDragging, state.currentlyDragOver, state.dropPosition)
      setState(initialState)
      e.stopPropagation()
    },
    onDragEnd: e => {
      setState(initialState)
      e.stopPropagation()
    }
  })

  return {dndEvents: events, dndState: state}
}
