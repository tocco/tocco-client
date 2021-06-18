import {v4 as uuid} from 'uuid'

import reducer from './reducer'
import * as actions from './actions'

const INITIAL_STATE = {
  toasters: {}
}

describe('app-extensions', () => {
  describe('notification', () => {
    describe('modules', () => {
      describe('toaster', () => {
        describe('reducer', () => {
          test('should create a valid initial state', () => {
            expect(reducer(undefined, {})).to.deep.equal(INITIAL_STATE)
          })

          test('should add a toaster', () => {
            const toaster = {
              key: uuid(),
              title: 'test'
            }

            let stateAfter = reducer(INITIAL_STATE, actions.toaster(toaster))

            expect(stateAfter).to.have.property('toasters')
            expect(Object.keys(stateAfter.toasters)).to.have.length(1)

            const toaster2 = {
              key: uuid(),
              title: 'test'
            }

            stateAfter = reducer(stateAfter, actions.toaster(toaster2))
            expect(Object.keys(stateAfter.toasters)).to.have.length(2)
          })

          test('should update toaster', () => {
            const key = uuid()
            const toaster = {
              key,
              title: 'test'
            }

            let stateAfter = reducer(INITIAL_STATE, actions.toaster(toaster))

            expect(stateAfter).to.have.property('toasters')
            expect(Object.keys(stateAfter.toasters)).to.have.length(1)

            const toaster2 = {
              key,
              title: 'test'
            }

            stateAfter = reducer(stateAfter, actions.toaster(toaster2))
            expect(Object.keys(stateAfter.toasters)).to.have.length(1)
          })

          test('should remove a toaster', () => {
            const key = uuid()
            const toaster = {
              key,
              title: 'test'
            }

            let stateAfter = reducer(INITIAL_STATE, actions.toaster(toaster))

            expect(stateAfter).to.have.property('toasters')
            expect(Object.keys(stateAfter.toasters)).to.have.length(1)

            stateAfter = reducer(stateAfter, actions.removeToasterFromStore(key))
            expect(Object.keys(stateAfter.toasters)).to.have.length(0)
          })
        })
      })
    })
  })
})
