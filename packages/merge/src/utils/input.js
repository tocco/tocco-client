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
    ...getToManySelectDispatchActions(input)
  ]
)

const getToManySelectDispatchActions = ({model, entities}) => {
  const result = []
  model.relations
    .filter(relation => relation.toMany)
    .forEach(relation => {
      entities.forEach(entity => {
        const userRelation = entity.relations[relation.name]
        userRelation.values.forEach(userRelationValue => {
          if (userRelationValue.checked) {
            result.push(toggleRelationMany(relation.name, userRelationValue.pk, entity.pk))
          }
        })
      })
    })
  return result
}
