import {receiveEntities} from '../modules/mergeMatrix/entities/actions'
import {retrieveEditOptions} from '../modules/mergeStrategy/editOptions/actions'
import {retrieveModel} from '../modules/mergeMatrix/model/actions'
import {changeTargetEntity} from '../modules/mergeMatrix/actions'
import {toggleRelationMany, clearRelationMany} from '../modules/mergeMatrix/selections/actions'

export default function dispatchInput(store) {
  const state = store.getState()
  if (state.input) {
    const {input} = state
    store.dispatch(receiveEntities(input.entities))
    store.dispatch(retrieveModel(input.model))
    store.dispatch(changeTargetEntity(input.entities[0].pk))
    store.dispatch(clearRelationMany())
    dispatchToManySelections(input, store)
    store.dispatch(retrieveEditOptions(input.sourceEntitiesEditOptions))
  }
}

function dispatchToManySelections(input, store) {
  input.model.relations.map(relation => {
    if (relation.toMany) {
      input.entities.map(entity => {
        const userRelation = entity.relations[relation.name]
        userRelation.values.map(userRelationValue => {
          if (userRelationValue.checked) {
            store.dispatch(toggleRelationMany(relation.name, userRelationValue.pk, entity.pk))
          }
        })
      })
    }
  })
}
