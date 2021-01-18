import React from 'react'
import PropTypes from 'prop-types'
import {FormattedValue, Typography} from 'tocco-ui'
import {field} from 'tocco-app-extensions'
import {FormattedMessage} from 'react-intl'
import {js, navigationStrategy} from 'tocco-util'
import _get from 'lodash/get'

import {ManyRelationEntityCount} from '../../util/manyRelationEntityCount'

const areEqual = (prevProps, nextProps) => {
  const diff = Object.keys(js.difference(prevProps, nextProps))
  return diff.length === 0
}

export const ManyRelationsCheckBox = React.memo(({
  entityData,
  entityKey,
  name,
  setSelectedMultipleAll,
  isSelected,
  openEntityList,
  navigationStrategy,
  isOldClient
}) => {
  if (entityData.value.totalKeys === 0) {
    return null
  }

  const onChange = e => setSelectedMultipleAll(name, entityKey, e.target.checked)

  return <>
    <input type="checkbox" onChange={onChange} checked={isSelected} id={`${name}${entityKey}`}/>
    <Typography.Label for={`${name}${entityKey}`}>
      <FormattedMessage id="client.merge.allRelations"/> <ManyRelationEntityCount
        model={entityData.value.relationEntity}
        keys={entityData.value.keys}
        totalKeys={entityData.value.totalKeys}
        openEntityList={openEntityList}
        navigationStrategy={navigationStrategy}
        isOldClient={isOldClient}
      />
    </Typography.Label>
  </>
}, areEqual)

ManyRelationsCheckBox.propTypes = {
  entityData: PropTypes.shape({
    value: PropTypes.shape({
      keys: PropTypes.arrayOf(PropTypes.string),
      totalKeys: PropTypes.number.isRequired,
      relationEntity: PropTypes.string.isRequired
    })
  }),
  entityKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setSelectedMultipleAll: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  openEntityList: PropTypes.func.isRequired,
  navigationStrategy: navigationStrategy.propTypes,
  isOldClient: PropTypes.bool.isRequired
}

export const RelationsCheckBoxes = React.memo(({
  entityData,
  entityKey,
  name,
  setSelectedMultiple,
  selectedMultiple
}) => {
  return entityData.value.map(relationEntity => {
    const isSelected = _get(selectedMultiple, [name, relationEntity.key]) === entityKey
    const onChange = e => setSelectedMultiple(name, entityKey, relationEntity.key, e.target.checked)

    return <div key={`relation-checkbox-${relationEntity.key}`}>
      <input type="checkbox" onChange={onChange} checked={isSelected} id={`${name}${entityKey}-${relationEntity.key}`}/>
      <Typography.Label for={`${name}${entityKey}-${relationEntity.key}`}>
        <FormattedValue type="single-select" value={relationEntity}/>
      </Typography.Label>
    </div>
  })
}, areEqual)

RelationsCheckBoxes.propTypes = {
  entityData: PropTypes.shape({
    value: PropTypes.array
  }),
  entityKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setSelectedMultiple: PropTypes.func.isRequired,
  selectedMultiple: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string))
}

export const FormattedValueRadio = React.memo(({entityData, entityKey, name, setSelectedSingle, isSelected}) => {
  const typeMapper = {
    entity: 'single-select-box'
  }

  const {type, writable} = entityData
  const mappedType = typeMapper[type] || type
  const onChange = () => {
    setSelectedSingle(name, entityKey)
  }

  const Field = field.factory('list', mappedType)

  return <>
    <input
      type="radio"
      name={name}
      onChange={onChange}
      checked={isSelected}
      id={`${name}${entityKey}`}
      disabled={!writable}/>
    <Typography.Label for={`${name}${entityKey}`}>
      <Field
        formField={{dataType: mappedType}}
        value={entityData.value}
      />
    </Typography.Label>
  </>
}, areEqual)

FormattedValueRadio.propTypes = {
  entityData: PropTypes.shape({
    value: PropTypes.any,
    writable: PropTypes.bool,
    type: PropTypes.string
  }),
  entityKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setSelectedSingle: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired
}
