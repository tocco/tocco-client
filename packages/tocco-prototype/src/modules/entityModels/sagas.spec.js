import { take, call, put, fork, select } from 'redux-saga/effects'
import * as sagas from './sagas'
import * as actions from './actions'

describe('Prototype', () => {
  describe('entityModels sagas', () => {
    describe('fetchEntityModels', () => {
      it('should return if models already loaded', () => {
        const generator = sagas.fetchEntityModels()

        expect(generator.next().value).to.deep.equal(select(sagas.entityModelsSelector))

        const models = [{
          name: 'User',
          label: 'User'
        }]

        expect(generator.next(models).done).to.equal(true)
      })

      it('should load models if empty', () => {
        const generator = sagas.fetchEntityModels()

        expect(generator.next().value).to.deep.equal(select(sagas.entityModelsSelector))
        expect(generator.next([]).value).to.deep.equal(call(sagas.loadModels))

        const json = {
          entities: {
            User: {
              metaData: {
                label: 'User'
              }
            }
          }
        }

        expect(generator.next(json).value).to.deep.equal(put(actions.receiveEntityModels(json)))

        expect(generator.next().done).to.equal(true)
      })
    })
  })
})
