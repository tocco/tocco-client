import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {Button} from 'tocco-ui'

import {StyledAdvancedSearch, StyledAdvancedSearchButtonWrapper} from '../StyledAdvancedSearch'

const getListFormName = parent =>
  parent === null ? 'DocsTreeSearch_root_docs_list_item' : 'DocsTreeSearch_docs_list_item'

const DocsTreeSearch = ({
  entityName,
  onSelectionChange,
  selection: idSelection,
  emitAction,
  multi,
  onOkClick,
  DocsApp
}) => {
  const selection = idSelection ? idSelection.map(id => `${entityName}/${id}`) : []

  const handleSelectionChange = selectedFolder => {
    const ids = selectedFolder
      .map(f => {
        const [name, key] = f.split('/')
        return {name, key}
      })
      .filter(({name}) => name === entityName)
      .map(({key}) => key)

    onSelectionChange(ids)
  }

  return (
    <StyledAdvancedSearch>
      <DocsApp
        routerType="routerless"
        listLimit={15}
        selectionStyle={multi ? 'multi' : 'single'}
        selection={selection}
        searchFormType="none"
        disableViewPersistor={true}
        getListFormName={getListFormName}
        navigationStrategy={{}}
        embedded={true}
        noLeftPadding={true}
        sortable={false}
        scrollBehaviour="none"
        onSelectChange={handleSelectionChange}
        emitAction={emitAction}
        openResource={() => {
          /* do not open resources, just ignore row click */
        }}
      />
      <StyledAdvancedSearchButtonWrapper>
        <Button look="raised" onClick={onOkClick}>
          <FormattedMessage id="client.common.ok" />
        </Button>
      </StyledAdvancedSearchButtonWrapper>
    </StyledAdvancedSearch>
  )
}

DocsTreeSearch.propTypes = {
  DocsApp: PropTypes.func.isRequired,
  entityName: PropTypes.string.isRequired,
  onSelectionChange: PropTypes.func,
  selection: PropTypes.array,
  emitAction: PropTypes.func.isRequired,
  multi: PropTypes.bool,
  onOkClick: PropTypes.func
}

export default DocsTreeSearch
