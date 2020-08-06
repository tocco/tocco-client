import {useState} from 'react'

const initialState = {
  currentlyDragging: null,
  currentlyDragOver: null
}

export default (changePosition, columns) => {
  const [state, setState] = useState(initialState)

  const events = columnId => ({
    onDragStart: e => {
      setState({...state, currentlyDragging: columnId})
    },
    onDragEnter: e => {
      if (state.currentlyDragOver !== columnId) {
        setState({...state, currentlyDragOver: columnId})
      }
    },
    onDragOver: e => {
      e.preventDefault()
      e.stopPropagation()
      return true
    },
    onDrop: e => {
      changePosition(state.currentlyDragging, state.currentlyDragOver, columns)
      setState(initialState)
      e.stopPropagation()
    },
    onDragEnd: e => {
      setState(initialState)
    },
    onDragLeave: e => {
      const isTargetDraggable = e.target.getAttribute('draggable')
      if (isTargetDraggable && state.currentlyDragOver === columnId) {
        setState({
          ...state,
          currentlyDragOver: null
        })
      }
    }

  })

  return {dndEvents: events, dndState: state}
}
