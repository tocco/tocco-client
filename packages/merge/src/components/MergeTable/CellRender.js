import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {FormattedValue, Typography} from 'tocco-ui'
import {FormattedMessage, injectIntl} from 'react-intl'
import {js} from 'tocco-util'

import {
  setSelectedMultiple,
  setSelectedMultipleAll,
  setSelectedSingle
} from '../../modules/merge/actions'

const areEqual = (prevProps, nextProps) => {
  const diff = Object.keys(js.difference(prevProps, nextProps))
  return diff.length === 0
}

const ManyRelationsCheckBox = React.memo(({entityData, entityKey, name, setSelectedMultipleAll, isSelected}) => {
  if (entityData.value.length === 0) {
    return null
  }

  const onChange = e => setSelectedMultipleAll(name, entityKey, e.target.checked)

  return <>
    <input type="checkbox" onChange={onChange} checked={isSelected}/>
    <Typography.Span><FormattedMessage id="client.merge.allRelations"/> ({entityData.value.length})</Typography.Span>
  </>
}, areEqual)

ManyRelationsCheckBox.propTypes = {
  entityData: PropTypes.shape({
    value: PropTypes.arrayOf(PropTypes.string)
  }),
  entityKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setSelectedMultipleAll: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired
}

const RelationsCheckBoxes = React.memo(({entityData, entityKey, name, setSelectedMultiple, selectedMultiple}) => {
  return entityData.value.map(relationEntity => {
    const isSelected = selectedMultiple[name] !== undefined && selectedMultiple[name][relationEntity.key] !== undefined
      && selectedMultiple[name][relationEntity.key] === entityKey
    const onChange = e => setSelectedMultiple(name, entityKey, relationEntity.key, e.target.checked)

    return <div key={`relation-checkbox-${relationEntity.key}`}>
      <input type="checkbox" onChange={onChange} checked={isSelected}/>
      <FormattedValue type="single-select" value={relationEntity}/>
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

const FormattedValueRadio = React.memo(({entityData, entityKey, name, setSelectedSingle, isSelected}) => {
  const typeMapper = {
    entity: 'single-select'
  }

  const {type} = entityData
  const mappedType = typeMapper[type] || type
  const onChange = () => setSelectedSingle(name, entityKey)

  return <>
    <input type="radio" name={name} onChange={onChange} checked={isSelected}/>
    <FormattedValue type={mappedType} value={entityData.value}/>
  </>
}, areEqual)

FormattedValueRadio.propTypes = {
  entityData: PropTypes.shape({
    value: PropTypes.any,
    type: PropTypes.string
  }),
  entityKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setSelectedSingle: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired
}

const CellRenderer = ({
  rowData,
  column,
  setSelectedSingle,
  selectedSingle,
  setSelectedMultiple,
  selectedMultiple,
  setSelectedMultipleAll,
  selectedMultipleAll
}) => {
  const {entityKey} = column
  const entityData = rowData[entityKey]

  const {type} = entityData
  const name = rowData.__key

  if (type === 'relations') {
    return <ManyRelationsCheckBox
      entityData={entityData}
      entityKey={entityKey}
      name={name}
      setSelectedMultipleAll={setSelectedMultipleAll}
      isSelected={selectedMultipleAll[name] !== undefined && selectedMultipleAll[name].includes(entityKey)}
    />
  }

  if (type === 'entity-list') {
    return <RelationsCheckBoxes
      entityData={entityData}
      entityKey={entityKey}
      name={name}
      setSelectedMultiple={setSelectedMultiple}
      selectedMultiple={selectedMultiple}
    />
  }

  return <FormattedValueRadio
    entityData={entityData}
    entityKey={entityKey}
    name={name}
    setSelectedSingle={setSelectedSingle}
    isSelected={selectedSingle[name] === entityKey}
  />
}

CellRenderer.propTypes = {
  rowData: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.shape({
    value: PropTypes.any,
    type: PropTypes.string
  }), PropTypes.string])),
  column: PropTypes.shape({
    entityKey: PropTypes.string.isRequired
  }),
  setSelectedSingle: PropTypes.func.isRequired,
  selectedSingle: PropTypes.objectOf(PropTypes.string),
  setSelectedMultiple: PropTypes.func.isRequired,
  selectedMultiple: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
  setSelectedMultipleAll: PropTypes.func.isRequired,
  selectedMultipleAll: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))
}

const mapActionCreatorsCell = {
  setSelectedSingle,
  setSelectedMultiple,
  setSelectedMultipleAll
}
const mapStateToPropsCell = (state, props) => ({
  selectedSingle: state.merge.selected.single,
  selectedMultiple: state.merge.selected.multiple,
  selectedMultipleAll: state.merge.selected.multipleAll
})
export const CellRendererContainer = connect(mapStateToPropsCell, mapActionCreatorsCell)(injectIntl(CellRenderer))
