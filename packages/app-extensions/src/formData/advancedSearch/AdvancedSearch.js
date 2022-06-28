import PropTypes from 'prop-types'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import {Button} from 'tocco-ui'
import {v4 as uuid} from 'uuid'

import {StyledAdvancedSearch, StyledAdvancedSearchButtonWrapper} from './StyledAdvancedSearch'

const AdvancedSearch = ({
  entityName,
  formName,
  listFormDefinition,
  onSelectionChange,
  selection,
  emitAction,
  multi,
  constriction,
  onOkClick,
  ListApp
}) => (
  <StyledAdvancedSearch>
    <ListApp
      id={`advancedSearch-${uuid()}`}
      entityName={entityName}
      formName={formName}
      scope="remotefield"
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
      scrollBehaviour="inline"
      tableMinHeight="400px"
      constriction={constriction}
    />
    <StyledAdvancedSearchButtonWrapper>
      <Button look="raised" onClick={onOkClick}>
        <FormattedMessage id="client.common.ok" />
      </Button>
    </StyledAdvancedSearchButtonWrapper>
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
  multi: PropTypes.bool,
  constriction: PropTypes.string
}

export default AdvancedSearch
