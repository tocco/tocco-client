import React from 'react'

import * as actions from './actions'
import reducer from './reducer'

const INITIAL_STATE = {
  modals: []
}

describe('app-extensions', () => {
  describe('notification', () => {
    describe('modules', () => {
      describe('modalComponents', () => {
        describe('reducer', () => {
          test('should create a valid initial state', () => {
            expect(reducer(undefined, {})).to.deep.equal(INITIAL_STATE)
          })

          test('should add modals', () => {
            const id = Date.now()
            const title = 'title'
            const message = 'message'
            const component = () => <div>TEST</div>

            let stateAfter = reducer(INITIAL_STATE, actions.modal(id, title, message, component))

            expect(stateAfter).to.have.property('modals')
            expect(stateAfter.modals).to.have.length(1)

            stateAfter = reducer(stateAfter, actions.modal(id, title, message, component))
            expect(stateAfter.modals).to.have.length(2)
          })

          test('should remove modals', () => {
            const title = 'title'
            const message = 'message'
            const component = () => <div>TEST</div>

            let stateAfter = reducer(INITIAL_STATE, actions.modal(1, title, message, component))
            stateAfter = reducer(stateAfter, actions.modal(2, title, message, component))
            stateAfter = reducer(stateAfter, actions.modal(2, title, message, component))
            expect(stateAfter.modals).to.have.length(3)
            stateAfter = reducer(stateAfter, actions.removeModal(1))
            expect(stateAfter.modals).to.have.length(2)
            stateAfter = reducer(stateAfter, actions.removeModal(2))
            expect(stateAfter.modals).to.have.length(0)
          })
        })
      })
    })
  })
})
