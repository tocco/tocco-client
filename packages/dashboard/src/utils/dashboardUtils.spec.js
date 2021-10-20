import {dragAndDrop} from 'tocco-util'

import {
  appendDraggedAsLastItemToDropped,
  getRenderInfoBoxesForColumn,
  moveDraggedToDropped,
  sortInfoBoxes
} from './dashboardUtils'
import DropTypes from './dropTypes'
import {InfoBoxRenderTypes} from './infoBoxTypes'

describe('dashboard', () => {
  describe('utils', () => {
    describe('dashboardUtils', () => {
      describe('sortInfoBoxes', () => {
        test(
          'should sort infoBoxes',
          () => {
            const boxes = [
              {id: 1, col: 0, row: 0},
              {id: 2, col: 0, row: 0},
              {id: 5, col: 0, row: 2},
              {id: 4, col: 0, row: 1},
              {id: 7, col: 1, row: 1},
              {id: 3, col: 0, row: 0},
              {id: 6, col: 1, row: 0}
            ]

            const expectedOrder = [1, 2, 3, 4, 5, 6, 7]

            const sortedBoxes = sortInfoBoxes(boxes)

            expect(sortedBoxes.map(b => b.id)).to.deep.equal(expectedOrder)
          }
        )
      })
      describe('moveDraggedToDropped', () => {
        test(
          'should move after another item',
          () => {
            const draggingId = 1
            const dragOverId = 2
            const position = dragAndDrop.DropPosition.Bottom
            const boxes = [
              {id: 1, col: 0, row: 0},
              {id: 2, col: 0, row: 1},
              {id: 3, col: 0, row: 2}
            ]

            const expectedBoxes = [
              {id: 2, col: 0, row: 0},
              {id: 1, col: 0, row: 1},
              {id: 3, col: 0, row: 2}
            ]

            const updatedBoxes = moveDraggedToDropped(draggingId, dragOverId, position, boxes)

            expect(updatedBoxes).to.deep.equal(expectedBoxes)
          }
        )
        test(
          'should move before another item',
          () => {
            const draggingId = 3
            const dragOverId = 1
            const position = dragAndDrop.DropPosition.Top
            const boxes = [
              {id: 1, col: 0, row: 0},
              {id: 2, col: 0, row: 1},
              {id: 3, col: 0, row: 2}
            ]

            const expectedBoxes = [
              {id: 3, col: 0, row: 0},
              {id: 1, col: 0, row: 1},
              {id: 2, col: 0, row: 2}
            ]

            const updatedBoxes = moveDraggedToDropped(draggingId, dragOverId, position, boxes)

            expect(updatedBoxes).to.deep.equal(expectedBoxes)
          }
        )
        test(
          'should move to another column',
          () => {
            const draggingId = 2
            const dragOverId = 4
            const position = dragAndDrop.DropPosition.Bottom
            const boxes = [
              {id: 1, col: 0, row: 0},
              {id: 2, col: 0, row: 1},
              {id: 3, col: 0, row: 2},
              {id: 4, col: 1, row: 0},
              {id: 5, col: 1, row: 1}
            ]

            const expectedBoxes = [
              {id: 1, col: 0, row: 0},
              {id: 3, col: 0, row: 1},
              {id: 4, col: 1, row: 0},
              {id: 2, col: 1, row: 1},
              {id: 5, col: 1, row: 2}
            ]

            const updatedBoxes = moveDraggedToDropped(draggingId, dragOverId, position, boxes)

            expect(updatedBoxes).to.deep.equal(expectedBoxes)
          }
        )
        test(
          'should handle unsorted data',
          () => {
            const draggingId = 2
            const dragOverId = 4
            const position = dragAndDrop.DropPosition.Bottom
            const boxes = [
              {id: 3, col: 0, row: 2},
              {id: 1, col: 0, row: 0},
              {id: 5, col: 1, row: 1},
              {id: 4, col: 1, row: 0},
              {id: 2, col: 0, row: 1}
            ]

            const expectedBoxes = [
              {id: 1, col: 0, row: 0},
              {id: 3, col: 0, row: 1},
              {id: 4, col: 1, row: 0},
              {id: 2, col: 1, row: 1},
              {id: 5, col: 1, row: 2}
            ]

            const updatedBoxes = moveDraggedToDropped(draggingId, dragOverId, position, boxes)

            expect(updatedBoxes).to.deep.equal(expectedBoxes)
          }
        )
        test(
          'should be able to handle items at same position',
          () => {
            const draggingId = 3
            const dragOverId = 4
            const position = dragAndDrop.DropPosition.Bottom
            const boxes = [
              {id: 1, col: 0, row: 0},
              {id: 2, col: 0, row: 0},
              {id: 3, col: 0, row: 0},
              {id: 4, col: 0, row: 0}
            ]

            const expectedBoxes = [
              {id: 1, col: 0, row: 0},
              {id: 2, col: 0, row: 1},
              {id: 4, col: 0, row: 2},
              {id: 3, col: 0, row: 3}
            ]

            const updatedBoxes = moveDraggedToDropped(draggingId, dragOverId, position, boxes)

            expect(updatedBoxes).to.deep.equal(expectedBoxes)
          }
        )
      })
      describe('appendDraggedAsLastItemToDropped', () => {
        test(
          'should append item to another emtpy column',
          () => {
            const draggingId = 1
            const dragOverId = 1
            const boxes = [
              {id: 1, col: 0, row: 0},
              {id: 2, col: 0, row: 1},
              {id: 3, col: 0, row: 2}
            ]
  
            const expectedBoxes = [
              {id: 2, col: 0, row: 0},
              {id: 3, col: 0, row: 1},
              {id: 1, col: 1, row: 0}
            ]
  
            const updatedBoxes = appendDraggedAsLastItemToDropped(draggingId, dragOverId, boxes)
  
            expect(updatedBoxes).to.deep.equal(expectedBoxes)
          }
        )
        test(
          'should append item at the end to another column',
          () => {
            const draggingId = 1
            const dragOverId = 1
            const boxes = [
              {id: 1, col: 0, row: 0},
              {id: 2, col: 0, row: 1},
              {id: 3, col: 0, row: 2},
              {id: 4, col: 1, row: 0}
            ]
  
            const expectedBoxes = [
              {id: 2, col: 0, row: 0},
              {id: 3, col: 0, row: 1},
              {id: 4, col: 1, row: 0},
              {id: 1, col: 1, row: 1}
            ]
  
            const updatedBoxes = appendDraggedAsLastItemToDropped(draggingId, dragOverId, boxes)
  
            expect(updatedBoxes).to.deep.equal(expectedBoxes)
          }
        )
        test(
          'should be able to handles items at same position',
          () => {
            const draggingId = 1
            const dragOverId = 1
            const boxes = [
              {id: 1, col: 0, row: 0},
              {id: 2, col: 0, row: 0},
              {id: 3, col: 0, row: 0},
              {id: 4, col: 1, row: 0}
            ]
  
            const expectedBoxes = [
              {id: 2, col: 0, row: 0},
              {id: 3, col: 0, row: 1},
              {id: 4, col: 1, row: 0},
              {id: 1, col: 1, row: 1}
            ]
  
            const updatedBoxes = appendDraggedAsLastItemToDropped(draggingId, dragOverId, boxes)
  
            expect(updatedBoxes).to.deep.equal(expectedBoxes)
          }
        )
      })
      describe('getRenderInfoBoxesForColumn', () => {
        test('should filter out folded boxes', () => {
          const draggingId = null
          const currentlyDragOver = null
          const position = null
          const column = 0
          const boxes = [
            {id: 1, col: 0, row: 0, folded: false},
            {id: 2, col: 0, row: 1, folded: true},
            {id: 3, col: 0, row: 2, folded: false}
          ]

          const expectedBoxes = [1, 3]

          const renderBoxes = getRenderInfoBoxesForColumn(draggingId, currentlyDragOver, position, column, boxes)

          expect(renderBoxes.map(b => b.id)).to.deep.equal(expectedBoxes)
        })

        test('should only include boxes for given column', () => {
          const draggingId = null
          const currentlyDragOver = null
          const position = null
          const column = 0
          const boxes = [
            {id: 1, col: 0, row: 0, folded: false},
            {id: 2, col: 1, row: 1, folded: false},
            {id: 3, col: 0, row: 2, folded: false}
          ]

          const expectedBoxes = [1, 3]

          const renderBoxes = getRenderInfoBoxesForColumn(draggingId, currentlyDragOver, position, column, boxes)

          expect(renderBoxes.map(b => b.id)).to.deep.equal(expectedBoxes)
        })

        test('should insert `DragPreview` on correct place for `InfoBox` drop type', () => {
          const draggingId = 2
          const currentlyDragOver = {type: DropTypes.InfoBox, id: 1}
          const position = dragAndDrop.DropPosition.Top
          const column = 0
          const boxes = [
            {id: 1, col: 0, row: 0, folded: false},
            {id: 2, col: 0, row: 1, folded: false},
            {id: 3, col: 0, row: 2, folded: false}
          ]

          const expectedBoxes = [
            {id: 2, col: 0, row: 1, type: InfoBoxRenderTypes.DropPreview, folded: false},
            {id: 1, col: 0, row: 0, type: InfoBoxRenderTypes.InfoBox, folded: false},
            {id: 3, col: 0, row: 2, type: InfoBoxRenderTypes.InfoBox, folded: false}
          ]

          const renderBoxes = getRenderInfoBoxesForColumn(draggingId, currentlyDragOver, position, column, boxes)

          expect(renderBoxes).to.deep.equal(expectedBoxes)
        })

        test('should remove dragged box when dragged over another `Column`', () => {
          const draggingId = 2
          const currentlyDragOver = {type: DropTypes.Column, id: 1}
          const position = dragAndDrop.DropPosition.Top
          const column = 0
          const boxes = [
            {id: 1, col: 0, row: 0, folded: false},
            {id: 2, col: 0, row: 1, folded: false},
            {id: 3, col: 0, row: 2, folded: false}
          ]

          const expectedBoxes = [
            {id: 1, col: 0, row: 0, type: InfoBoxRenderTypes.InfoBox, folded: false},
            {id: 3, col: 0, row: 2, type: InfoBoxRenderTypes.InfoBox, folded: false}
          ]

          const renderBoxes = getRenderInfoBoxesForColumn(draggingId, currentlyDragOver, position, column, boxes)

          expect(renderBoxes).to.deep.equal(expectedBoxes)
        })

        test('should insert `DragPreview` on correct place for `Column` drop type', () => {
          const draggingId = 2
          const currentlyDragOver = {type: DropTypes.Column, id: 0}
          const position = dragAndDrop.DropPosition.Top
          const column = 0
          const boxes = [
            {id: 1, col: 0, row: 0, folded: false},
            {id: 2, col: 0, row: 1, folded: false},
            {id: 3, col: 0, row: 2, folded: false}
          ]

          const expectedBoxes = [
            {id: 1, col: 0, row: 0, type: InfoBoxRenderTypes.InfoBox, folded: false},
            {id: 3, col: 0, row: 2, type: InfoBoxRenderTypes.InfoBox, folded: false},
            {id: 2, col: 0, row: 1, type: InfoBoxRenderTypes.DropPreview, folded: false}
          ]

          const renderBoxes = getRenderInfoBoxesForColumn(draggingId, currentlyDragOver, position, column, boxes)

          expect(renderBoxes).to.deep.equal(expectedBoxes)
        })

        test('should insert `DragPreview` when dragging over itslef', () => {
          const draggingId = 2
          const currentlyDragOver = {type: DropTypes.InfoBox, id: 2}
          const position = dragAndDrop.DropPosition.Top
          const column = 0
          const boxes = [
            {id: 1, col: 0, row: 0, folded: false},
            {id: 2, col: 0, row: 1, folded: false},
            {id: 3, col: 0, row: 2, folded: false}
          ]

          const expectedBoxes = [
            {id: 1, col: 0, row: 0, type: InfoBoxRenderTypes.InfoBox, folded: false},
            {id: 2, col: 0, row: 1, type: InfoBoxRenderTypes.DropPreview, folded: false},
            {id: 3, col: 0, row: 2, type: InfoBoxRenderTypes.InfoBox, folded: false}
          ]

          const renderBoxes = getRenderInfoBoxesForColumn(draggingId, currentlyDragOver, position, column, boxes)

          expect(renderBoxes).to.deep.equal(expectedBoxes)
        })
      })
    })
  })
})
