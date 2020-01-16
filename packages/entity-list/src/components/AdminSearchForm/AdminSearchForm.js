import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {Icon, Button} from 'tocco-ui'
import {withTheme} from 'styled-components'

import {StyledSplit, AdminSearchGrid, Box, StyledGutter, StyledHeader} from './StyedComponents'
import BasicSearchFormContainer from '../../containers/BasicSearchFormContainer'
import SearchFilterList from '../SearchFilterList'

const getGutter = (borderColor, backgroundColor) => () => {
  const gutterEl = document.createElement('div')
  gutterEl.style.cssText = 'padding-bottom:.7rem;'
  ReactDOM.render(<StyledGutter borderColor={borderColor} backgroundColor={backgroundColor}>
    <Icon icon="horizontal-rule"/>
  </StyledGutter>, gutterEl)
  return gutterEl
}

const AdminSearchForm = ({resetSearch, theme}) => {
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
      sizes={[28, 72]}
      minSize={[28, 100]}
      gutterSize={15}
      gutter={getGutter(theme.colors.border, theme.colors.paper)}
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
  resetSearch: PropTypes.func.isRequired,
  theme: PropTypes.object
}

export default withTheme(AdminSearchForm)
