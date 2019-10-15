import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Panel} from 'tocco-ui'
import styled from 'styled-components'

import FullTextSearchForm from '../../containers/FullTextSearchFormContainer'
import BasicSearchFormContainer from '../../containers/BasicSearchFormContainer'
import AdminSearchForm from '../AdminSearchForm/AdminSearchForm'
import searchFormTypes, {searchFormTypePropTypes} from '../../util/searchFormTypes'

const AdminSearchFormWrapper = styled.div`
  height: calc(100vh - 80px); // TODO: This is only a temporary workaround, height needs to be 100%
  overflow-y: auto;
  overflow-x: hidden;
`

const SearchView = ({initializeSearchForm, searchFormType}) => {
  useEffect(() => {
    initializeSearchForm(true)
  }, [])

  if (searchFormType === searchFormTypes.ADMIN) {
    return <AdminSearchFormWrapper> <AdminSearchForm/></AdminSearchFormWrapper>
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
  initializeSearchForm: PropTypes.func.isRequired,
  searchFormType: searchFormTypePropTypes
}

export default SearchView
