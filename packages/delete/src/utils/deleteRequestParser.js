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
          [affectedEntity.entityName]: {
            ..._get(acc,
              affectedEntity.entityName,
              {keys: [], keysOtherBu: [], entityLabel: affectedEntity.entityLabel}
            ),
            ...(affectedEntity.businessUnitId === null || affectedEntity.businessUnitId === currentBuId
              ? {
                  keys: Array.from(
                    new Set([..._get(acc, [affectedEntity.entityName, 'keys'], []), affectedEntity.key])
                  )
                }
              : {
                  keysOtherBu: Array.from(
                    new Set([..._get(acc, [affectedEntity.entityName, 'keysOtherBu'], []), affectedEntity.key])
                  )
                }
            )
          }
        }
      : {}
    )
  }), {...relatedEntities})
})

const transformRootEntity = (rootEntities, entity, applyKeys = true) => {
  const {entityName, entityLabel, key} = entity.rootEntity
  if (key.includes('/')) {
    const [entityNameReal, keyReal] = key.split('/')
    return {
      ...rootEntities,
      [entityNameReal]: {
        entityLabel,
        keys: [..._get(rootEntities, [entityNameReal, 'keys'], []), ...(applyKeys ? [keyReal] : [])]
      }
    }
  } else {
    return {
      ...rootEntities,
      [entityName]: {
        entityLabel,
        keys: [..._get(rootEntities, [entityName, 'keys'], []), ...(applyKeys ? [key] : [])]
      }
    }
  }
}

const isEntityDeletable = entityToDelete =>
  entityToDelete.rootEntity.deleteStatus === deleteStatus.DELETABLE
  && !entityToDelete.affectedEntities.find(affectedEntity => affectedEntity.deleteStatus !== deleteStatus.DELETABLE)

export const getDialogInfo = (response, currentBuId) => {
  const {entitiesToDelete} = response

  return entitiesToDelete.reduce((acc, entityToDelete) => {
    const deletable = isEntityDeletable(entityToDelete)
    const relatedAttr = deletable ? 'relatedDeletable' : 'relatedNotDeletable'
    return {
      ...acc,
      rootEntitiesDeletable: transformRootEntity(acc.rootEntitiesDeletable, entityToDelete, deletable),
      ...!deletable && {rootEntitiesNotDeletable: transformRootEntity(acc.rootEntitiesNotDeletable, entityToDelete)},
      [relatedAttr]: transformRelatedEntities(acc[relatedAttr], entityToDelete, deletable, currentBuId)
    }
  },
  {
    rootEntitiesDeletable: {},
    rootEntitiesNotDeletable: {},
    relatedDeletable: {},
    relatedNotDeletable: {},
    hasUnreadableEntities: !!entitiesToDelete.find(e => e.unreadableEntities)
  })
}

export const getEntitiesToDelete = ({entitiesToDelete}) => ({
  entityName: _get(entitiesToDelete, '[0].rootEntity.entityName'),
  keys: entitiesToDelete.reduce((acc, entityToDelete) => [
    ...acc,
    ...(isEntityDeletable(entityToDelete) ? [entityToDelete.rootEntity.key] : [])
  ]
  , [])
})

export const deleteEntityPropType = PropTypes.shape({
  entityLabel: PropTypes.string,
  keys: PropTypes.arrayOf(PropTypes.string),
  keysOtherBu: PropTypes.arrayOf(PropTypes.string)
})

export const deleteInfoPropType = PropTypes.shape({
  rootEntitiesDeletable: PropTypes.objectOf(deleteEntityPropType).isRequired,
  rootEntitiesNotDeletable: PropTypes.objectOf(deleteEntityPropType).isRequired,
  relatedDeletable: PropTypes.objectOf(deleteEntityPropType).isRequired,
  relatedNotDeletable: PropTypes.objectOf(deleteEntityPropType).isRequired,
  hasUnreadableEntities: PropTypes.bool
})
