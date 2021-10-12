import {flow, last, curry} from 'lodash'
import {dragAndDrop} from 'tocco-util'

import DropTypes from './dropTypes'
import {InfoBoxRenderTypes} from './infoBoxTypes'

const sortInfoBoxes = boxes => boxes.sort((a, b) => {
  if (a.col === b.col) {
    return a.row - b.row
  }
  return a.col - b.col
})

const getLastInfoBox = boxes => flow([sortInfoBoxes, last])(boxes)

const getInfoBoxesForColumn = curry((column, boxes) => sortInfoBoxes(boxes).filter(i => i.col === column))

const reindex = curry(sortedBoxes => {
  return sortedBoxes
    .reduce(({index, boxes}, box) => {
      const nextIndex = typeof index[box.col] === 'number' ? index[box.col] + 1 : 0
      const acc = {
        boxes: [
          ...boxes,
          {...box, row: nextIndex}
        ],
        index: {
          ...index,
          [box.col]: nextIndex
        }
      }
      return acc
    }, {index: {}, boxes: []}).boxes
})

const removeInfoBox = curry((idToRemove, boxes) => reindex(sortInfoBoxes(boxes).filter(({id}) => id !== idToRemove)))

const insertDraggedAtDropped = curry((draggingId, dragOverId, position, sortedBoxes) => {
  const dragOverColumn = sortedBoxes.find(b => b.id === dragOverId)?.col
  return reindex(sortedBoxes
    .reduce((boxes, box) => {
      const moveBoxHere = box.id === dragOverId
      return [
        ...boxes,
        ...(position === dragAndDrop.DropPosition.Before && moveBoxHere
          ? [{id: draggingId, col: dragOverColumn, row: -1}]
          : []),
        box,
        ...(position === dragAndDrop.DropPosition.After && moveBoxHere
          ? [{id: draggingId, col: dragOverColumn, row: -1}]
          : [])
      ]
    }, [])
  )
})

export const moveDraggedToDropped = (draggingId, dragOverId, position, boxes) => flow([
  sortInfoBoxes,
  removeInfoBox(draggingId),
  insertDraggedAtDropped(draggingId, dragOverId, position)])(boxes)

export const appendDraggedAsLastItemToDropped = (draggingId, dragOverId, boxes) => {
  const lastInfoBox = flow([getInfoBoxesForColumn(dragOverId), getLastInfoBox])(boxes)
  const nextRowIndex = lastInfoBox ? lastInfoBox.row + 1 : 0
  return [...removeInfoBox(draggingId, boxes), {id: draggingId, col: dragOverId, row: nextRowIndex}]
}

export const getRenderInfoBoxesForColumn = (draggingId, currentlyDragOver, position, column, boxes) => {
  const {type: dragOverType, id: dragOverId} = currentlyDragOver || {}
  const isOverItself = dragOverId === draggingId && dragOverType === DropTypes.InfoBox
  const DropPreviewInfoBox = {type: InfoBoxRenderTypes.DropPreview, id: draggingId}

  let renderBoxes = boxes
    .filter(i => i.col === column)
    .map(box => ({type: InfoBoxRenderTypes.InfoBox, id: box.id}))
    .filter(({id}) => (typeof dragOverId !== 'undefined' && !isOverItself) ? id !== draggingId : true)
    .reduce((acc, key) => {
      const showPreviewHere = key.id === dragOverId && dragOverType === DropTypes.InfoBox && !isOverItself
      return [
        ...acc,
        ...(position === dragAndDrop.DropPosition.Before && showPreviewHere
          ? [DropPreviewInfoBox]
          : []),
        (key.id === draggingId && isOverItself) ? {...key, type: InfoBoxRenderTypes.DropPreview} : key,
        ...(position === dragAndDrop.DropPosition.After && showPreviewHere
          ? [DropPreviewInfoBox]
          : [])
      ]
    }, [])
  
  if (dragOverType === DropTypes.Column && dragOverId === column) {
    renderBoxes = [...renderBoxes, DropPreviewInfoBox]
  }

  return renderBoxes
}
