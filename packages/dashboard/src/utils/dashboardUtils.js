import {flow, curry} from 'lodash'
import {dragAndDrop} from 'tocco-util'

import DropTypes from './dropTypes'
import {InfoBoxRenderTypes} from './infoBoxTypes'

const sortInfoBoxes = boxes => boxes.sort((a, b) => {
  if (a.col === b.col) {
    return a.row - b.row
  }
  return a.col - b.col
})

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

const insertDraggedAtDropped = curry((draggingId, dragOverId, position, sortedBoxes) => {
  const dragOverColumn = sortedBoxes.find(b => b.id === dragOverId)?.col
  const draggingBox = sortedBoxes.find(b => b.id === draggingId)
  return reindex(sortedBoxes
    .reduce((boxes, box) => {
      const moveBoxHere = box.id === dragOverId
      const isDraggingBox = box.id === draggingId
      if (isDraggingBox) {
        // filter out dragging box from the old place
        return boxes
      }

      return [
        ...boxes,
        ...(position === dragAndDrop.DropPosition.Top && moveBoxHere
          ? [{...draggingBox, col: dragOverColumn, row: -1}]
          : []),
        box,
        ...(position === dragAndDrop.DropPosition.Bottom && moveBoxHere
          ? [{...draggingBox, col: dragOverColumn, row: -1}]
          : [])
      ]
    }, [])
  )
})

export const moveDraggedToDropped = (draggingId, dragOverId, position, boxes) => flow([
  sortInfoBoxes,
  insertDraggedAtDropped(draggingId, dragOverId, position)])(boxes)

export const appendDraggedAsLastItemToDropped = (draggingId, dragOverId, boxes) => {
  const draggingBox = boxes.find(b => b.id === draggingId)
  return reindex([
    ...sortInfoBoxes(boxes).filter(({id}) => id !== draggingId),
    {...draggingBox, col: dragOverId, row: -1}
  ])
}

export const getRenderInfoBoxesForColumn = (draggingId, currentlyDragOver, position, column, boxes) => {
  const {type: dragOverType, id: dragOverId} = currentlyDragOver || {}
  const isOverItself = dragOverId === draggingId && dragOverType === DropTypes.InfoBox
  const draggingBox = boxes.find(b => b.id === draggingId)
  const draggingPreviewBox = {...draggingBox, type: InfoBoxRenderTypes.DropPreview}

  let renderBoxes = boxes
    .filter(i => i.col === column)
    .map(box => ({...box, type: InfoBoxRenderTypes.InfoBox}))
    .filter(({id}) => (typeof dragOverId !== 'undefined' && !isOverItself) ? id !== draggingId : true)
    .reduce((acc, key) => {
      const showPreviewHere = key.id === dragOverId && dragOverType === DropTypes.InfoBox && !isOverItself
      return [
        ...acc,
        ...(position === dragAndDrop.DropPosition.Top && showPreviewHere
          ? [draggingPreviewBox]
          : []),
        (key.id === draggingId && isOverItself) ? {...key, type: InfoBoxRenderTypes.DropPreview} : key,
        ...(position === dragAndDrop.DropPosition.Bottom && showPreviewHere
          ? [draggingPreviewBox]
          : [])
      ]
    }, [])
  
  if (dragOverType === DropTypes.Column && dragOverId === column) {
    renderBoxes = [...renderBoxes, draggingPreviewBox]
  }

  return renderBoxes
}
