import React from 'react'
import PropTypes from 'prop-types'
import {FormattedValue, MultiCheckbox, Typography} from 'tocco-ui'
import {field} from 'tocco-app-extensions'
import {FormattedMessage} from 'react-intl'
import {js, navigationStrategy} from 'tocco-util'
import _get from 'lodash/get'

import {ManyRelationEntityCount} from '../../util/manyRelationEntityCount'
import {StyledLabelWrapper} from './StyledComponents'

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
  navigationStrategy
}) => {
  if (entityData.value.totalKeys === 0) {
    return null
  }

  const onChange = e => setSelectedMultipleAll(name, entityKey, e.target.checked)

  return (
    <StyledLabelWrapper>
      <input type="checkbox" onChange={onChange} checked={isSelected} id={`${name}${entityKey}`}/>
      <Typography.Label for={`${name}${entityKey}`}>
        <FormattedMessage id="client.merge.allRelations"/> <ManyRelationEntityCount
        model={entityData.value.relationEntity}
        keys={entityData.value.keys}
        totalKeys={entityData.value.totalKeys}
        navigationStrategy={navigationStrategy}
      />
      </Typography.Label>
    </StyledLabelWrapper>
  )
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
  navigationStrategy: navigationStrategy.propTypes
}

export const RelationsCheckBoxes = React.memo(({
  entityData,
  entityKey,
  name,
  setSelectedMultiple,
  selectedMultiple
}) => {
  const isSelected = key => _get(selectedMultiple, [name, key]) === entityKey
  const setSelected = (key, checked) => setSelectedMultiple(name, entityKey, key, checked)

  const numberTotal = entityData.value.length
  const numberSelected = entityData.value.filter(relationEntity => isSelected(relationEntity.key)).length
  const allRowsSelectionState = numberTotal === numberSelected
    ? 'checked'
    : numberSelected > 0
      ? 'indeterminate'
      : 'unchecked'
  const allRowsSelectionChange = v => {
    entityData.value.forEach(relationEntity => {
      const checked = v === 'checked'
      if (isSelected(relationEntity.key) !== checked) {
        setSelected(relationEntity.key, checked)
      }
    })
  }

  return <>
    {
      entityData.value.length > 0 && <StyledLabelWrapper>
        <MultiCheckbox value={allRowsSelectionState} onChange={allRowsSelectionChange} id={`${name}${entityKey}`}/>
        <Typography.Label for={`${name}${entityKey}`}>
          <FormattedMessage id="client.merge.allRelations"/>
        </Typography.Label>
      </StyledLabelWrapper>
    }
    {
      entityData.value.map(relationEntity => <StyledLabelWrapper key={`relation-checkbox-${relationEntity.key}`}>
        <input type="checkbox"
               onChange={e => setSelected(relationEntity.key, e.target.checked)}
               checked={isSelected(relationEntity.key)}
               id={`${name}${entityKey}-${relationEntity.key}`}/>
        <Typography.Label for={`${name}${entityKey}-${relationEntity.key}`}>
          <FormattedValue type="single-select" value={relationEntity}/>
        </Typography.Label>
      </StyledLabelWrapper>)
    }
  </>
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

  return (
    <StyledLabelWrapper>
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
    </StyledLabelWrapper>
  )
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
