import {useState} from 'react'

const initialState = {
  currentlyDragging: null,
  currentlyDragOver: null,
  dropPosition: null // 'after' or 'before'
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
      if (state.currentlyDragOver !== item) {
        setState({...state, currentlyDragOver: item})
      }
      e.stopPropagation()
    },
    onDragOver: e => {
      if (e.target) {
        const bounding = e.target.getBoundingClientRect()
        const offset = bounding.y + (bounding.height / 2)
        const after = e.clientY - offset > 0
        const dropPosition = after ? DropPosition.After : DropPosition.Before
        setState({...state, dropPosition})
      }
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
