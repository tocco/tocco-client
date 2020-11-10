import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'
import uuid from 'uuid/v4'

import {StyledAdvancedSearch} from './StyledAdvancedSearch'

const AdvancedSearch = ({
  entityName,
  formName,
  listFormDefinition,
  onSelectionChange,
  selection,
  emitAction,
  multi,
  onOkClick,
  ListApp
}) => (
  <StyledAdvancedSearch>
    <ListApp
      id={`advancedSearch-${uuid()}`}
      entityName={entityName}
      formName={formName}
      listFormDefinition={listFormDefinition}
      limit={15}
      showSearchForm={true}
      onSelectChange={selection => {
        onSelectionChange(selection)
      }}
      selection={selection}
      emitAction={emitAction}
      selectionStyle={multi ? 'multi' : 'single'}
      selectOnRowClick={true}
      disableSelectionController={true}
      showActions={false}
    />
    <div className="advanced-search-button-wrapper">
      <Button look="raised" onClick={onOkClick}>
        <FormattedMessage id="client.common.ok"/>
      </Button>
    </div>
  </StyledAdvancedSearch>
)

AdvancedSearch.propTypes = {
  ListApp: PropTypes.func.isRequired,
  entityName: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  listFormDefinition: PropTypes.shape({
    children: PropTypes.arrayOf(PropTypes.object)
  }),
  emitAction: PropTypes.func.isRequired,
  selection: PropTypes.array,
  field: PropTypes.string,
  onSelectionChange: PropTypes.func,
  onOkClick: PropTypes.func,
  appId: PropTypes.string,
  showSearchForm: PropTypes.bool,
  multi: PropTypes.bool
}

export default AdvancedSearch
