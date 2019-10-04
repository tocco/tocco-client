import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Panel} from 'tocco-ui'
import styled from 'styled-components'

import FullTextSearchForm from '../../containers/FullTextSearchFormContainer'
import BasicSearchFormContainer from '../../containers/BasicSearchFormContainer'
import AdminSearchForm from '../AdminSearchForm/AdminSearchForm'
import searchFormTypes, {searchFormTypePropTypes} from '../../util/searchFormTypes'

const StyledWrapper = styled.div`
  padding: 4px;
`

const SearchView = ({initializeSearchForm, searchFormType}) => {
  useEffect(() => {
    initializeSearchForm(true)
  }, [])

  if (searchFormType === searchFormTypes.ADMIN) {
    return <AdminSearchForm/>
  }

  return (
    <Panel.Wrapper isToggleable={false} isFramed={false}>
      <Panel.Body>
        <StyledWrapper>
          {searchFormType === searchFormTypes.SIMPLE ? <FullTextSearchForm/> : <BasicSearchFormContainer/>}
        </StyledWrapper>
      </Panel.Body>
    </Panel.Wrapper>
  )
}

SearchView.propTypes = {
  initializeSearchForm: PropTypes.func.isRequired,
  searchFormType: searchFormTypePropTypes
}

export default SearchView
