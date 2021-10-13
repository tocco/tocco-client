import {dragAndDrop} from 'tocco-util'

import {appendDraggedAsLastItemToDropped, moveDraggedToDropped} from './dashboardUtils'

describe('dashboard', () => {
  describe('utils', () => {
    describe('dashboardUtils', () => {
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
      })
    })
  })
})
