import React from 'react'
import {Panel} from 'tocco-ui'
import PropTypes from 'prop-types'

import FullTextSearchForm from '../../containers/FullTextSearchFormContainer'
import BasicSearchFormContainer from '../../containers/BasicSearchFormContainer'
import AdminSearchForm from '../AdminSearchForm'
import searchFormTypes, {searchFormTypePropTypes} from '../../util/searchFormTypes'
import {StyledAdminSearchFormWrapper} from './StyledComponents'

const SearchView = ({searchFormType, isCollapsed, toggleCollapse}) => {
  if (searchFormType === searchFormTypes.ADMIN) {
    return (
      <StyledAdminSearchFormWrapper>
        <AdminSearchForm isCollapsed={isCollapsed} toggleCollapse={toggleCollapse}/>
      </StyledAdminSearchFormWrapper>
    )
  }

  return <Panel.Wrapper isToggleable={false} isFramed={false}>
    <Panel.Body>
      {searchFormType === searchFormTypes.SIMPLE ? <FullTextSearchForm/> : <BasicSearchFormContainer/>}
    </Panel.Body>
  </Panel.Wrapper>
}

SearchView.propTypes = {
  searchFormType: searchFormTypePropTypes,
  isCollapsed: PropTypes.bool,
  toggleCollapse: PropTypes.func
}

export default SearchView
