import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'
import uuid from 'uuid/v4'
const AdvancedSearch = props =>
  <div>
    <props.ListApp
      id={`advancedSearch-${uuid()}`}
      keepStore={false}
      entityName={props.entityName}
      formBase={props.formBase}
      limit={5}
      showSearchForm={true}
      onSelectChange={selection => { props.onSelectionChange(selection) }}
      selection={props.selection}
      showCreateButton={false}
      emitAction={props.emitAction}
      selectionStyle={props.multi ? 'multi' : 'single'}
      selectOnRowClick={true}
      disableSelectionController={true}
    />
    <div style={{margin: '5px'}}>
      <Button look="raised" onClick={props.onOkClick}>
        <FormattedMessage id="client.common.ok"/>
      </Button>
    </div>
  </div>

AdvancedSearch.propTypes = {
  ListApp: PropTypes.func.isRequired,
  entityName: PropTypes.string.isRequired,
  formBase: PropTypes.string.isRequired,
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
