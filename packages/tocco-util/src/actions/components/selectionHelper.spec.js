import {IntlStub} from 'tocco-test-util'

import {isValidSelection, selectionText} from './selectionHelper'

describe('tocco-util', () => {
  describe('actions', () => {
    describe('components', () => {
      describe('selectionHelper', () => {
        describe('isValidSelection', () => {
          test('should return true if no range given ', () => {
            expect(isValidSelection(0, {minSelection: null, maxSelection: null})).to.be.true
            expect(isValidSelection(1, {minSelection: null, maxSelection: null})).to.be.true
            expect(isValidSelection(99, {minSelection: null, maxSelection: null})).to.be.true
          })
          test('should return true if selectedCount is in range', () => {
            expect(isValidSelection(1, {minSelection: 1, maxSelection: null})).to.be.true
            expect(isValidSelection(1, {minSelection: 0, maxSelection: null})).to.be.true
            expect(isValidSelection(99, {minSelection: 5, maxSelection: null})).to.be.true

            expect(isValidSelection(1, {minSelection: null, maxSelection: 1})).to.be.true
            expect(isValidSelection(4, {minSelection: null, maxSelection: 5})).to.be.true

            expect(isValidSelection(1, {minSelection: 1, maxSelection: 1})).to.be.true
            expect(isValidSelection(4, {minSelection: 3, maxSelection: 5})).to.be.true
            expect(isValidSelection(50, {minSelection: 1, maxSelection: 99})).to.be.true
          })

          test('should return false if selectedCount is not in range', () => {
            expect(isValidSelection(10, {minSelection: 1, maxSelection: 5})).to.be.false
            expect(isValidSelection(10, {minSelection: null, maxSelection: 5})).to.be.false
            expect(isValidSelection(0, {minSelection: 1, maxSelection: null})).to.be.false
          })
        })

        describe('selectionText', () => {
          test('should return null if selection is correct', () => {
            expect(selectionText(1, {minSelection: null, maxSelection: null}, IntlStub)).to.be.null
          })

          test('should return none empty text if selection is incorrect', () => {
            expect(selectionText(1, {minSelection: 2, maxSelection: null}, IntlStub)).to.not.be.empty
            expect(selectionText(2, {minSelection: null, maxSelection: 1}, IntlStub)).to.not.be.empty
          })
        })
      })
    })
  })
})
