import React from 'react'
import reducer from './reducer'
import * as actions from '../actions'

const INITIAL_STATE = {
  modals: []
}

describe('tocco-util', () => {
  describe('notifier', () => {
    describe('modules', () => {
      describe('modalComponents', () => {
        describe('reducer', () => {
          it('should create a valid initial state', () => {
            expect(reducer(undefined, {})).to.deep.equal(INITIAL_STATE)
          })

          it('should add modals', () => {
            const id = Date.now()
            const title = 'title'
            const message = 'message'
            const component = () => <div>TEST</div>

            let stateAfter = reducer(INITIAL_STATE, actions.modalComponent(id, title, message, component))

            expect(stateAfter).to.have.property('modals')
            expect(stateAfter.modals).to.have.length(1)

            stateAfter = reducer(stateAfter, actions.modalComponent(id, title, message, component))
            expect(stateAfter.modals).to.have.length(2)
          })

          it('should remove modals', () => {
            const title = 'title'
            const message = 'message'
            const component = () => <div>TEST</div>

            let stateAfter = reducer(INITIAL_STATE, actions.modalComponent(1, title, message, component))
            stateAfter = reducer(stateAfter, actions.modalComponent(2, title, message, component))
            stateAfter = reducer(stateAfter, actions.modalComponent(2, title, message, component))
            expect(stateAfter.modals).to.have.length(3)
            stateAfter = reducer(stateAfter, actions.removeModalComponent(1))
            expect(stateAfter.modals).to.have.length(2)
            stateAfter = reducer(stateAfter, actions.removeModalComponent(2))
            expect(stateAfter.modals).to.have.length(0)
          })
        })
      })
    })
  })
})
