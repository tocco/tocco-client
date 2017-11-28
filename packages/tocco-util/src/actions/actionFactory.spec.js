import actionFactory, {isAction} from './actionFactory'
import {shallow} from 'enzyme'

describe('tocco-util', () => {
  describe('actions', () => {
    describe('isAction', () => {
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

    describe('actionFactory', () => {
      it('should return null for old actions', () => {
        const actionDefinition = {
          type: 'ch.tocco.nice2.model.form.components.action.Action'
        }

        expect(actionFactory(actionDefinition, 1)).to.be.null
      })

      it('should return null if mode doesnt fit', () => {
        const actionDefinition = {
          type: 'ch.tocco.nice2.model.form.components.action.SimpleAction'
        }

        expect(actionFactory({...actionDefinition, scopes: ['update']}, 1, {mode: 'update'})).to.not.be.null
        expect(actionFactory({...actionDefinition, scopes: ['update']}, 1)).to.not.be.null
        expect(actionFactory({...actionDefinition, scopes: ['update']}, 1, {mode: 'create'})).to.be.null
        expect(actionFactory({...actionDefinition, scopes: undefined}, 1, {mode: 'create'})).to.not.be.null
        expect(actionFactory({...actionDefinition, scopes: []}, 1, {mode: 'create'})).to.not.be.null
      })

      it('should return groups', () => {
        const groupAction = {
          type: 'ch.tocco.nice2.model.form.components.action.ActionGroup',
          children: [
            {
              type: 'ch.tocco.nice2.model.form.components.action.SimpleAction'
            }
          ]
        }

        const action = actionFactory(groupAction, 1)
        expect(action).to.not.be.null
        expect(shallow(action).type()).to.eql('span')
      })

      it('should return groups with main action', () => {
        const groupActionWithMainAction = {
          type: 'ch.tocco.nice2.model.form.components.action.ActionGroup',
          action: {
            type: 'ch.tocco.nice2.model.form.components.action.SimpleAction'
          },
          children: [
            {
              type: 'ch.tocco.nice2.model.form.components.action.SimpleAction'
            }
          ]
        }

        const action = actionFactory(groupActionWithMainAction, 1)
        expect(action).to.not.be.null
        expect(shallow(action).type()).to.eql('span')
      })
    })
  })
})
