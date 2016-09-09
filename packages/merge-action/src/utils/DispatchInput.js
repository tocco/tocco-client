import {retrieveEntities} from '../modules/MergeMatrix/entities/actions'
import {retrieveModel} from '../modules/MergeMatrix/model/actions'
import {changeTargetEntity} from '../modules/MergeMatrix/actions'
import {toggleRelationMany, clearRelationMany} from '../modules/MergeMatrix/selections/actions'

export default function dispatchInput(store) {
  var state = store.getState()
  if (state.input) {
    const {input} = state
    store.dispatch(retrieveEntities(input.entities))
    store.dispatch(retrieveModel(input.model))
    store.dispatch(changeTargetEntity(input.entities[0].pk))
    store.dispatch(clearRelationMany())
    dispatchToManySelections(input, store)
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
