import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {injectIntl} from 'react-intl'
import _get from 'lodash/get'

import {
  setSelectedMultiple,
  setSelectedMultipleAll,
  setSelectedSingle
} from '../../modules/merge/actions'
import {FormattedValueRadio, ManyRelationsCheckBox, RelationsCheckBoxes} from './Selection'

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
      isSelected={_get(selectedMultipleAll, [name], []).includes(entityKey)}
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
