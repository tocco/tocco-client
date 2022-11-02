import PropTypes from 'prop-types'
import {injectIntl} from 'react-intl'
import {withTheme} from 'styled-components'

import QueryView from './QueryView'
import SearchView from './SearchView'

const AdminSearchForm = props => {
  const {intl, queryViewVisible} = props
  const msg = id => intl.formatMessage({id})

  return (
    <>
      {!queryViewVisible && <SearchView msg={msg} {...props} />}
      {queryViewVisible && <QueryView msg={msg} {...props} />}
    </>
  )
}

AdminSearchForm.propTypes = {
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
  entityModel: PropTypes.string.isRequired,
  queryViewVisible: PropTypes.bool.isRequired,
  setQueryViewVisible: PropTypes.func.isRequired,
  query: PropTypes.string,
  queryError: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string]))),
  loadSearchAsQuery: PropTypes.func.isRequired,
  saveQueryAsFilter: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  runQuery: PropTypes.func.isRequired,
  clearQuery: PropTypes.func.isRequired
}

export default injectIntl(withTheme(AdminSearchForm))
