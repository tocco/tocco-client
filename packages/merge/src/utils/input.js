import {receiveEntities} from '../modules/mergeMatrix/entities/actions'
import {retrieveEditOptions} from '../modules/mergeStrategy/editOptions/actions'
import {retrieveModel} from '../modules/mergeMatrix/model/actions'
import {changeTargetEntity} from '../modules/mergeMatrix/actions'
import {toggleRelationMany, clearRelationMany} from '../modules/mergeMatrix/selections/actions'

export const getDispatchActions = input => (
  [
    receiveEntities(input.entities),
    retrieveModel(input.model),
    changeTargetEntity(input.entities[0].pk),
    clearRelationMany(),
    retrieveEditOptions(input.sourceEntitiesEditOptions),
    ...dispatchToManySelections(input)
  ]
)

const dispatchToManySelections = input => {
  const result = []
  input.model.relations
    .filter(relation => relation.toMany)
    .map(relation => {
      input.entities.map(entity => {
        const userRelation = entity.relations[relation.name]
        userRelation.values.map(userRelationValue => {
          if (userRelationValue.checked) {
            return toggleRelationMany(relation.name, userRelationValue.pk, entity.pk)
          }
        })
      })
    })
  return result
}
