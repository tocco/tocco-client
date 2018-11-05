import {expectSaga} from 'redux-saga-test-plan'

import clientAction from './clientAction'
import {ACTION_INVOKE} from '../actions'

describe('tocco-util', () => {
  describe('actions', () => {
    describe('modules', () => {
      describe('actionHandler', () => {
        describe('clientAction', () => {
          test('should put client action with params', () => {
            const definition = {
              clientAction: 'new'
            }

            const mockAction = (definition, entity, ids, parent, params) => ({
              type: ACTION_INVOKE,
              payload: {definition, entity, ids, parent, params}
            })

            const entity = 'User'
            const ids = ['1', '2']
            const parent = null
            const params = null
            const config = {new: mockAction}

            return expectSaga(clientAction, definition, entity, ids, parent, params, config)
              .put(mockAction(definition, entity, ids, parent, params))
              .run()
          })
        })
      })
    })
  })
})
