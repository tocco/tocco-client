import PropTypes from 'prop-types'
import {useRef} from 'react'
import {FormattedMessage} from 'react-intl'
import {Ball, BallMenu, EditableValue, FormattedValue, MenuItem, StatedValue} from 'tocco-ui'
import {react as customHooks} from 'tocco-util'

import {AdminSearchGrid, StyledHeader, StyledQueryBox, StyledToggleCollapseButton} from './StyedComponents'

const QueryView = ({
  isCollapsed,
  setQueryViewVisible,
  msg,
  entityModel,
  query,
  queryError,
  loadSearchAsQuery,
  saveQueryAsFilter,
  setQuery,
  runQuery,
  clearQuery,
  toggleCollapse
}) => {
  const formEl = useRef(null)
  customHooks.useAutofocus(formEl)

  const codeEditorEvents = {
    onChange: setQuery
  }
  const codeEditorOptions = {
    mode: 'tql',
    implicitModel: entityModel
  }
  const queryExists = !!query?.trim().length > 0
  const queryHasErrors = queryError && Object.entries(queryError).length !== 0
  const disableQueryView = () => setQueryViewVisible(false)
  const isQueryFalsy = !queryExists || queryHasErrors

  return (
    <AdminSearchGrid isCollapsed={isCollapsed}>
      <StyledHeader>
        <StyledToggleCollapseButton icon={'chevron-left'} isCollapsed={isCollapsed} onClick={toggleCollapse} />
        <Ball
          data-cy="search-view-button"
          icon="filter"
          onClick={disableQueryView}
          title={msg('client.entity-list.search_view')}
        />
        <Ball
          data-cy="search-button"
          icon="search"
          onClick={runQuery}
          title={msg('client.entity-list.query.search')}
          disabled={isQueryFalsy}
        />
        <Ball
          data-cy="clear-button"
          icon="times"
          onClick={clearQuery}
          title={msg('client.entity-list.reset')}
          disabled={!queryExists}
        />
        <BallMenu buttonProps={{icon: 'ellipsis-v'}}>
          <MenuItem onClick={loadSearchAsQuery}>
            <FormattedMessage id="client.entity-list.query.search.open" />
          </MenuItem>
          <MenuItem onClick={saveQueryAsFilter} disabled={isQueryFalsy}>
            <FormattedMessage id="client.entity-list.query.filter.save" />
          </MenuItem>
        </BallMenu>
      </StyledHeader>
      <StyledQueryBox ref={formEl}>
        <StatedValue isDisplay={true} hasValue={true} label={msg('client.entity-list.query.entity-model')}>
          <FormattedValue type="string" value={entityModel} />
        </StatedValue>
        <StatedValue
          error={queryError}
          touched={queryExists}
          fixLabel={true}
          hasValue={queryExists}
          label={msg('client.entity-list.query.editor')}
        >
          <EditableValue type="code" value={query} options={codeEditorOptions} events={codeEditorEvents} />
        </StatedValue>
      </StyledQueryBox>
    </AdminSearchGrid>
  )
}

QueryView.propTypes = {
  msg: PropTypes.func.isRequired,
  isCollapsed: PropTypes.bool,
  setQueryViewVisible: PropTypes.func.isRequired,
  entityModel: PropTypes.string.isRequired,
  query: PropTypes.string,
  queryError: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string]))),
  loadSearchAsQuery: PropTypes.func.isRequired,
  saveQueryAsFilter: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  runQuery: PropTypes.func.isRequired,
  clearQuery: PropTypes.func.isRequired,
  toggleCollapse: PropTypes.func.isRequired
}

export default QueryView
