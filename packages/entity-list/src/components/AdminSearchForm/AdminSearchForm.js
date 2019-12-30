import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {Icon, Button} from 'tocco-ui'

import {StyledSplit, AdminSearchGrid, Box, StyledGutter, StyledHeader} from './StyedComponents'
import BasicSearchFormContainer from '../../containers/BasicSearchFormContainer'
import SearchFilterList from '../SearchFilterList'

const getGutter = () => {
  const gutterEl = document.createElement('div')
  gutterEl.style.cssText = 'padding-bottom:.5rem'
  ReactDOM.render(<StyledGutter>
    <Icon icon="horizontal-rule"/>
  </StyledGutter>, gutterEl)
  return gutterEl
}

const AdminSearchForm = ({resetSearch}) => {
  return <AdminSearchGrid>
    <StyledHeader>
      <Button
        data-cy="reset-button"
        icon="times"
        onClick={resetSearch}
      />
    </StyledHeader>
    <StyledSplit
      direction="vertical"
      sizes={[28, 73]}
      minSize={[28, 100]}
      gutterSize={15}
      gutter={getGutter}
      dragInterval={28}
    >
      <Box>
        <SearchFilterList/>
      </Box>
      <Box>
        <BasicSearchFormContainer disableSimpleSearch={true}/>
      </Box>
    </StyledSplit>
  </AdminSearchGrid>
}

AdminSearchForm.propTypes = {
  resetSearch: PropTypes.func.isRequired
}

export default AdminSearchForm
