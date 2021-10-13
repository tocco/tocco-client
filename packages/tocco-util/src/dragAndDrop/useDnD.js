import {isEqual} from 'lodash'
import {useState} from 'react'

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

  const events = item => ({
    onDragStart: e => {
      setState({...state, currentlyDragging: item})
      e.stopPropagation()
    },
    onDragEnter: e => {
      if (state.currentlyDragging && !isEqual(state.currentlyDragOver, item)) {
        const bounding = e.target ? e.target.getBoundingClientRect() : {}
        const offset = bounding.y + (bounding.height / 2)
        setState({...state, currentlyDragOver: item, offset})
      }
      e.stopPropagation()
    },
    onDragOver: e => {
      if (state.currentlyDragging) {
        const after = e.clientY - state.offset > 0
        const dropPosition = after ? DropPosition.Bottom : DropPosition.Top
        setState(state => ({...state, dropPosition}))
        e.preventDefault()
        e.stopPropagation()
        return true
      }
    },
    onDrop: e => {
      if (state.currentlyDragging && state.currentlyDragOver) {
        changePosition(state.currentlyDragging, state.currentlyDragOver, state.dropPosition)
        setState(initialState)
        e.stopPropagation()
      }
    },
    onDragEnd: e => {
      if (state.currentlyDragging && state.currentlyDragOver) {
        setState(initialState)
        e.stopPropagation()
      }
    }
  })

  return {dndEvents: events, dndState: state}
}
