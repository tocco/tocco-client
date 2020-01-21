import React from 'react'
import {Panel} from 'tocco-ui'
import styled from 'styled-components'

import FullTextSearchForm from '../../containers/FullTextSearchFormContainer'
import BasicSearchFormContainer from '../../containers/BasicSearchFormContainer'
import AdminSearchForm from '../AdminSearchForm'
import searchFormTypes, {searchFormTypePropTypes} from '../../util/searchFormTypes'

const AdminSearchFormWrapper = styled.div`
  height: calc(100vh - 77px); // TODO: This is only a temporary workaround, height needs to be 100%
  overflow-y: auto;
  overflow-x: hidden;
`

const SearchView = ({searchFormType}) => {
  if (searchFormType === searchFormTypes.ADMIN) {
    return <AdminSearchFormWrapper><AdminSearchForm/></AdminSearchFormWrapper>
  }

  return (
    <Panel.Wrapper isToggleable={false} isFramed={false}>
      <Panel.Body>
        {searchFormType === searchFormTypes.SIMPLE ? <FullTextSearchForm/> : <BasicSearchFormContainer/>}
      </Panel.Body>
    </Panel.Wrapper>
  )
}

SearchView.propTypes = {
  searchFormType: searchFormTypePropTypes
}

export default SearchView
