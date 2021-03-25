import React from 'react'
import {v4 as uuid} from 'uuid'

import reducer from './reducer'
import * as actions from './actions'

const INITIAL_STATE = {
  blockers: []
}

describe('app-extensions', () => {
  describe('notification', () => {
    describe('modules', () => {
      describe('blocking', () => {
        describe('reducer', () => {
          test('should create a valid initial state', () => {
            expect(reducer(undefined, {})).to.deep.equal(INITIAL_STATE)
          })

          test('should add a blocker', () => {
            const id = uuid()
            const title = 'title'
            const body = <div>TEST</div>

            let stateAfter = reducer(INITIAL_STATE, actions.blockingInfo(id, title, body))

            expect(stateAfter).to.have.property('blockers')
            expect(stateAfter.blockers).to.have.length(1)

            stateAfter = reducer(stateAfter, actions.blockingInfo(uuid(), title, body))
            expect(stateAfter.blockers).to.have.length(2)
          })

          test('should remove a blocker by id', () => {
            const id = uuid()
            const title = 'title'
            const body = <div>TEST</div>

            let stateAfter = reducer(INITIAL_STATE, actions.blockingInfo(id, title, body))

            expect(stateAfter).to.have.property('blockers')
            expect(stateAfter.blockers).to.have.length(1)

            stateAfter = reducer(stateAfter, actions.removeBlockingInfo(id))
            expect(stateAfter.blockers).to.have.length(0)
          })
        })
      })
    })
  })
})
