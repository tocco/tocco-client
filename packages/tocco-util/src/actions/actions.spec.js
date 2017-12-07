import {isAction} from './actions'

describe('tocco-util', () => {
  describe('actions', () => {
    describe('actions', () => {
      describe('actions', () => {
        it('should return true only for actions', () => {
          const actionType1 = 'ch.tocco.nice2.model.form.components.action.SimpleAction'
          const actionType2 = 'ch.tocco.nice2.model.form.components.action.ActionGroup'
          const noneActionType = 'ch.tocco.nice2.model.form.components.Checkbox'

          expect(isAction(actionType1)).to.be.true
          expect(isAction(actionType2)).to.be.true
          expect(isAction(noneActionType)).to.be.false
          expect(isAction('')).to.be.false
          expect(isAction(null)).to.be.false
          expect(isAction(undefined)).to.be.false
        })
      })
    })
  })
})
