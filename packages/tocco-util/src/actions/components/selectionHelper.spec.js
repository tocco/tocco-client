/* eslint-disable no-console */
import {isValidSelection, selectionText} from './selectionHelper'
import {IntlStub} from 'tocco-test-util'

describe('tocco-util', () => {
  describe('actions', () => {
    describe('components', () => {
      describe('selectionHelper', () => {
        describe('isValidSelection', () => {
          it('should return true if no range given ', () => {
            expect(isValidSelection(0, {minSelection: null, maxSelection: null})).to.be.true
            expect(isValidSelection(1, {minSelection: null, maxSelection: null})).to.be.true
            expect(isValidSelection(99, {minSelection: null, maxSelection: null})).to.be.true
          })
          it('should return true if selectedCount is in range', () => {
            expect(isValidSelection(1, {minSelection: 1, maxSelection: null})).to.be.true
            expect(isValidSelection(1, {minSelection: 0, maxSelection: null})).to.be.true
            expect(isValidSelection(99, {minSelection: 5, maxSelection: null})).to.be.true

            expect(isValidSelection(1, {minSelection: null, maxSelection: 1})).to.be.true
            expect(isValidSelection(4, {minSelection: null, maxSelection: 5})).to.be.true

            expect(isValidSelection(1, {minSelection: 1, maxSelection: 1})).to.be.true
            expect(isValidSelection(4, {minSelection: 3, maxSelection: 5})).to.be.true
            expect(isValidSelection(50, {minSelection: 1, maxSelection: 99})).to.be.true
          })

          it('should return false if selectedCount is not in range', () => {
            expect(isValidSelection(10, {minSelection: 1, maxSelection: 5})).to.be.false
            expect(isValidSelection(10, {minSelection: null, maxSelection: 5})).to.be.false
            expect(isValidSelection(0, {minSelection: 1, maxSelection: null})).to.be.false
          })
        })

        describe('selectionText', () => {
          it('should return null if selection is correct', () => {
            expect(selectionText(1, {minSelection: null, maxSelection: null}, IntlStub)).to.be.null
          })

          it('should return none empty text if selection is incorrect', function(done) {
            console.log('<<<<1')
            try {
              expect(selectionText(1, {minSelection: 2, maxSelection: null}, IntlStub)).to.not.be.empty
              console.log('<<<<2')
              expect(selectionText(2, {minSelection: null, maxSelection: 1}, IntlStub)).to.not.be.empty
              console.log('<<<<3')
              done()
            } catch (e) {
              console.log('<<<<ERROR', e)
              done(e)
            }
          })
        })
      })
    })
  })
})
