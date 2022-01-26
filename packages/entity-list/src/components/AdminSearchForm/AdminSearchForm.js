import PropTypes from 'prop-types'
import React from 'react'
import {injectIntl} from 'react-intl'
import {withTheme} from 'styled-components'

import QueryView from './QueryView'
import SearchView from './SearchView'
import {StyledPlaceHolder, StyledToggleCollapseButton} from './StyedComponents'

const AdminSearchForm = props => {
  const {intl, isCollapsed, toggleCollapse, queryViewVisible} = props
  const msg = id => intl.formatMessage({id})

  return (
    <>
      {!queryViewVisible && <SearchView msg={msg} {...props} />}
      {queryViewVisible && <QueryView msg={msg} {...props} />}
      <StyledPlaceHolder onClick={toggleCollapse} isCollapsed={isCollapsed}>
        <StyledToggleCollapseButton icon={'chevron-right'} isCollapsed={isCollapsed} />
      </StyledPlaceHolder>
    </>
  )
}


AdminSearchForm.propTypes = {
  initialized: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired,
  searchFilters: PropTypes.arrayOf(PropTypes.object),
  resetSearch: PropTypes.func.isRequired,
  theme: PropTypes.object,
  saveSearchFilter: PropTypes.func.isRequired,
  saveDefaultSearchFilter: PropTypes.func.isRequired,
  resetDefaultSearchFilter: PropTypes.func.isRequired,
  displaySearchFieldsModal: PropTypes.func.isRequired,
  resetSearchFields: PropTypes.func.isRequired,
  searchFormDirty: PropTypes.bool,
  isCollapsed: PropTypes.bool,
  toggleCollapse: PropTypes.func.isRequired,
  entityModel: PropTypes.string.isRequired,
  queryViewVisible: PropTypes.bool.isRequired,
  setQueryViewVisible: PropTypes.func.isRequired,
  query: PropTypes.string,
  queryError: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string]))),
  loadSearchAsQuery: PropTypes.func.isRequired,
  saveQueryAsFilter: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  runQuery: PropTypes.func.isRequired
}

export default injectIntl(withTheme(AdminSearchForm))
