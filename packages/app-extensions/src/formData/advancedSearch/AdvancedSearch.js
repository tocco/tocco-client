import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'
import uuid from 'uuid/v4'

import {StyledAdvancedSearch} from './StyledAdvancedSearch'

const AdvancedSearch = props =>
  <StyledAdvancedSearch>
    <props.ListApp
      id={`advancedSearch-${uuid()}`}
      entityName={props.entityName}
      formBase={props.formBase}
      listFormDefinition={props.listFormDefinition}
      limit={5}
      showSearchForm={true}
      onSelectChange={selection => { props.onSelectionChange(selection) }}
      selection={props.selection}
      emitAction={props.emitAction}
      selectionStyle={props.multi ? 'multi' : 'single'}
      selectOnRowClick={true}
      disableSelectionController={true}
    />
    <Button look="raised" onClick={props.onOkClick}>
      <FormattedMessage id="client.common.ok"/>
    </Button>
  </StyledAdvancedSearch>

AdvancedSearch.propTypes = {
  ListApp: PropTypes.func.isRequired,
  entityName: PropTypes.string.isRequired,
  formBase: PropTypes.string.isRequired,
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
