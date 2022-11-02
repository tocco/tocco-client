import {errorLogging} from 'tocco-app-extensions'
import {Panel} from 'tocco-ui'

import BasicSearchFormContainer from '../../containers/BasicSearchFormContainer'
import FullTextSearchForm from '../../containers/FullTextSearchFormContainer'
import searchFormTypes, {searchFormTypePropTypes} from '../../util/searchFormTypes'
import AdminSearchForm from '../AdminSearchForm'

const SearchView = ({searchFormType}) => {
  if (searchFormType === searchFormTypes.ADMIN) {
    return (
      <errorLogging.ErrorBoundary>
        <AdminSearchForm />
      </errorLogging.ErrorBoundary>
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
  searchFormType: searchFormTypePropTypes
}

export default SearchView
