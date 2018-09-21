import {isAction} from './actions'

describe('tocco-util', () => {
  describe('actions', () => {
    describe('actions', () => {
      describe('isAction', () => {
        test('should return true only for actions', () => {
          const actionComponentType1 = 'action'
          const actionComponentType2 = 'action-group'
          const noneActionComponentType = 'field'

          expect(isAction(actionComponentType1)).to.be.true
          expect(isAction(actionComponentType2)).to.be.true
          expect(isAction(noneActionComponentType)).to.be.false
          expect(isAction('')).to.be.false
          expect(isAction(null)).to.be.false
          expect(isAction(undefined)).to.be.false
        })
      })
    })
  })
})
