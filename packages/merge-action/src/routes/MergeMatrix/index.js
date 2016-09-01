import {injectReducer} from '../../store/reducers'
import {sagaMiddleware} from '../../store/createStore'
import {retrieveEntities} from './modules/entities/actions'
import {retrieveModel} from './modules/model/actions'
import {changeTargetEntity} from './modules/actions'
import {toggleRelationMany} from './modules/selections/actions'

function DispatchToManySelections(input, store) {
  input.model.relations.map(relation => {
    if (relation.toMany) {
      input.entities.map(entity => {
        var userRelation = entity.relations[relation.name]
        userRelation.values.map(userRelationValue => {
          if (userRelationValue.checked) {
            store.dispatch(toggleRelationMany(relation.name, userRelationValue.pk, entity.pk))
          }
        })
      })
    }
  })
}

function dispatchInput(store) {
  var state = store.getState()
  if (state.input) {
    const {input} = state

    store.dispatch(retrieveEntities(input.entities))
    store.dispatch(retrieveModel(input.model))
    store.dispatch(changeTargetEntity(input.entities[0].pk))
    DispatchToManySelections(input, store);
  }
}

export default (store) => ({
  getComponent(nextState, next) {
    require.ensure([
      './containers/MergeMatrixContainer'
    ], (require) => {
      const MergeMatrix = require('./containers/MergeMatrixContainer').default

      const mainModule = require('./modules/main')
      const reducer = mainModule.default
      const sagas = mainModule.sagas

      injectReducer(store, {key: 'mergeMatrix', reducer})
      sagaMiddleware.run(sagas)

      dispatchInput(store)

      next(null, MergeMatrix)
    })
  }
})
