import {receiveEntitites} from '../modules/mergeMatrix/entities/actions'
import {retrieveOptions} from '../modules/mergeStrategy/options/actions'
import {retrieveModel} from '../modules/mergeMatrix/model/actions'
import {changeTargetEntity} from '../modules/mergeMatrix/actions'
import {toggleRelationMany, clearRelationMany} from '../modules/mergeMatrix/selections/actions'

export default function dispatchInput(store) {
  var state = store.getState()
  if (state.input) {
    const {input} = state
    store.dispatch(receiveEntitites(input.entities))
    store.dispatch(retrieveModel(input.model))
    store.dispatch(changeTargetEntity(input.entities[0].pk))
    store.dispatch(clearRelationMany())
    dispatchToManySelections(input, store)
    store.dispatch(retrieveOptions(input.sourceEntitiesOptions))
  }
}

function dispatchToManySelections(input, store) {
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
