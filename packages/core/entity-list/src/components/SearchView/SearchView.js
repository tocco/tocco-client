import PropTypes from 'prop-types'
import {errorLogging} from 'tocco-app-extensions'
import {Panel} from 'tocco-ui'

import BasicSearchFormContainer from '../../containers/BasicSearchFormContainer'
import FullTextSearchForm from '../../containers/FullTextSearchFormContainer'
import searchFormTypes, {searchFormTypePropTypes} from '../../util/searchFormTypes'
import AdminSearchForm from '../AdminSearchForm'
import {StyledAdminSearchFormWrapper} from './StyledComponents'

const SearchView = ({searchFormType, isCollapsed, toggleCollapse}) => {
  if (searchFormType === searchFormTypes.ADMIN) {
    return (
      <StyledAdminSearchFormWrapper>
        <errorLogging.ErrorBoundary>
          <AdminSearchForm isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
        </errorLogging.ErrorBoundary>
      </StyledAdminSearchFormWrapper>
    )
  }

  return (
    <errorLogging.ErrorBoundary>
      <Panel.Wrapper isToggleable={false} isFramed={false}>
        <Panel.Body>
          {searchFormType === searchFormTypes.FULLTEXT ? <FullTextSearchForm /> : <BasicSearchFormContainer />}
        </Panel.Body>
      </Panel.Wrapper>
    </errorLogging.ErrorBoundary>
  )
}

SearchView.propTypes = {
  searchFormType: searchFormTypePropTypes,
  isCollapsed: PropTypes.bool,
  toggleCollapse: PropTypes.func
}

export default SearchView
