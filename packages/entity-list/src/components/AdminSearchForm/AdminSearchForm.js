import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {Icon, Button} from 'tocco-ui'
import {withTheme} from 'styled-components'
import {lighten} from 'polished'
import {injectIntl, intlShape} from 'react-intl'

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

const AdminSearchForm = ({resetSearch, theme, intl}) => {
  const msg = id => intl.formatMessage({id})

  return <AdminSearchGrid>
    <StyledHeader>
      <Button
        data-cy="reset-button"
        icon="times"
        onClick={resetSearch}
        title={msg('client.entity-list.reset')}
      />
    </StyledHeader>
    <StyledSplit
      direction="vertical"
      sizes={[28, 72]}
      minSize={[28, 100]}
      gutterSize={15}
      gutter={getGutter(lighten(0.4, theme.colors.text), theme.colors.paper)}
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
  intl: intlShape.isRequired,
  resetSearch: PropTypes.func.isRequired,
  theme: PropTypes.object
}

export default injectIntl(withTheme(AdminSearchForm))
