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
          ..._get(acc, affectedEntity.entityName, {keys: [], keysOtherBu: [], entityLabel: affectedEntity.entityLabel}),
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

const isEntityDeletable = entityToDelete =>
  entityToDelete.rootEntity.deleteStatus === deleteStatus.DELETABLE
  && !entityToDelete.affectedEntities.find(affectedEntity => affectedEntity.deleteStatus !== deleteStatus.DELETABLE)

export default (response, currentBuId) => {
  const {entitiesToDelete} = response

  return entitiesToDelete.reduce((acc, entityToDelete) => {
    const deletable = isEntityDeletable(entityToDelete)
    const keyAttr = deletable ? 'keysDeletable' : 'keysNotDeletable'
    const relatedAttr = deletable ? 'relatedDeletable' : 'relatedNotDeletable'
    return {
      ...acc,
      [keyAttr]: [...acc[keyAttr], entityToDelete.rootEntity.key],
      [relatedAttr]: transformRelatedEntities(acc[relatedAttr], entityToDelete, deletable, currentBuId)
    }
  },
  {
    entityName: _get(entitiesToDelete, '[0].rootEntity.entityName'),
    entityLabel: _get(entitiesToDelete, '[0].rootEntity.entityLabel'),
    keysDeletable: [],
    keysNotDeletable: [],
    relatedDeletable: {},
    relatedNotDeletable: {},
    hasUnreadableEntities: !!entitiesToDelete.find(e => e.unreadableEntities)
  })
}

export const relatedPropType = PropTypes.shape({
  entityLabel: PropTypes.string,
  keys: PropTypes.arrayOf(PropTypes.string),
  keysOtherBu: PropTypes.arrayOf(PropTypes.string)
})

export const deleteInfoPropType = PropTypes.shape({
  entityName: PropTypes.string.isRequired,
  entityLabel: PropTypes.string.isRequired,
  keysDeletable: PropTypes.arrayOf(PropTypes.string).isRequired,
  keysNotDeletable: PropTypes.arrayOf(PropTypes.string).isRequired,
  relatedDeletable: PropTypes.objectOf(relatedPropType).isRequired,
  relatedNotDeletable: PropTypes.objectOf(relatedPropType).isRequired,
  hasUnreadableEntities: PropTypes.bool
})
