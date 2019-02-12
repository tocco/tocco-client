import {dispatchInput} from './input'

describe('tocco-util', () => {
  describe('route', () => {
    describe('input', () => {
      describe('dispatchInput', () => {
        const actionCreator = entityName => ({
          type: 'SET_ENTITY_NAME',
          payload: {
            entityName
          }
        })

        test('should dispatch action with input value', () => {
          const input = {
            entityName: 'User'
          }

          const store = {
            dispatch: sinon.mock()
          }

          store.dispatch.once().withExactArgs(actionCreator('User'))

          dispatchInput(store, input, {key: 'entityName', actionCreator})

          store.dispatch.verify()
        })

        test('should not dispatch action if input value missing', () => {
          const input = { // no `entityName` property
          }

          const store = {
            dispatch: sinon.mock()
          }

          store.dispatch.never()

          dispatchInput(store, input, {key: 'entityName', actionCreator})

          store.dispatch.verify()
        })

        test('should log error if mandatory input value missing', () => {
          const input = { // no `entityName` property
          }

          const store = {
            dispatch: sinon.mock()
          }

          store.dispatch.never()

          const logger = sinon.mock()
          logger.once().withExactArgs("EntityBrowser: Mandatory field 'entityName' not set in input")

          dispatchInput(store, input, {key: 'entityName', actionCreator, mandatory: true}, logger)

          store.dispatch.verify()
        })

        test('should dispatch defaultValues', () => {
          const input = { // no `entityName` property
          }

          const store = {
            dispatch: sinon.mock()
          }

          const defaultValue = 'test'
          store.dispatch.once().withExactArgs(actionCreator(defaultValue))
          dispatchInput(store, input, {key: 'entityName', actionCreator, mandatory: true, defaultValue})

          store.dispatch.verify()
        })
      })
    })
  })
})
