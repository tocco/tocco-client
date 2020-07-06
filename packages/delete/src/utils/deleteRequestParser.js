import _get from 'lodash/get'
import PropTypes from 'prop-types'

const deleteStatus = {
  DELETABLE: 'DELETABLE',
  DENIED_BY_CASCADE: 'DENIED_BY_CASCADE',
  NO_DELETE_PERMISSION: 'NO_DELETE_PERMISSION'
}

const transformRelatedEntities = (relatedEntities, entityToDelete, deletable, currentBuId) => ({
  ...entityToDelete.affectedEntities.reduce((acc, affectedEntity) => ({
    ...acc,
    ...(deletable || affectedEntity.deleteStatus !== deleteStatus.DELETABLE
      ? {
        [affectedEntity.entityModel]: {
          ..._get(acc, affectedEntity.entityModel, {pks: [], pksOtherBu: [], entityName: affectedEntity.entityName}),
          ...(affectedEntity.businessUnitId === null || affectedEntity.businessUnitId === currentBuId
            ? {
              pks: Array.from(
                new Set([..._get(acc, [affectedEntity.entityModel, 'pks'], []), affectedEntity.pk])
              )
            }
            : {
              pksOtherBu: Array.from(
                new Set([..._get(acc, [affectedEntity.entityModel, 'pksOtherBu'], []), affectedEntity.pk])
              )
            }
          )
        }
      }
      : {}
    )
  }), {...relatedEntities})
})

const isEntityDeletable = entityToDelete =>
  entityToDelete.rootEntity.deleteStatus === deleteStatus.DELETABLE
  && !entityToDelete.affectedEntities.find(affectedEntity => affectedEntity.deleteStatus !== deleteStatus.DELETABLE)

export default (response, currentBuId) => {
  const {entitiesToDelete} = response

  return entitiesToDelete.reduce((acc, entityToDelete) => {
    const deletable = isEntityDeletable(entityToDelete)
    const delAttr = deletable ? 'deletable' : 'notDeletable'
    const relatedAttr = deletable ? 'deletableRelated' : 'notDeletableRelated'
    return {
      ...acc,
      [delAttr]: [...acc[delAttr], entityToDelete.rootEntity.pk],
      [relatedAttr]: transformRelatedEntities(acc[relatedAttr], entityToDelete, deletable, currentBuId)
    }
  },
  {
    entityModel: _get(entitiesToDelete, '[0].rootEntity.entityModel'),
    entityName: _get(entitiesToDelete, '[0].rootEntity.entityName'),
    deletable: [],
    notDeletable: [],
    deletableRelated: {},
    notDeletableRelated: {},
    unreadableEntities: !!entitiesToDelete.find(e => e.unreadableEntities)
  })
}

export const relatedPropTypes = PropTypes.shape({
  entityName: PropTypes.string,
  pks: PropTypes.arrayOf(PropTypes.string),
  pksOtherBu: PropTypes.arrayOf(PropTypes.string)
})

export const deleteInfoPropTypes = PropTypes.shape({
  entityModel: PropTypes.string.isRequired,
  deletable: PropTypes.arrayOf(PropTypes.string).isRequired,
  notDeletable: PropTypes.arrayOf(PropTypes.string).isRequired,
  deletableRelated: PropTypes.objectOf(relatedPropTypes).isRequired,
  notDeletableRelated: PropTypes.objectOf(relatedPropTypes).isRequired,
  unreadableEntities: PropTypes.bool
})
