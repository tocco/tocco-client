import _merge from 'lodash/merge'
import {darken} from 'polished'
import PropTypes from 'prop-types'
import React, {useMemo} from 'react'
import {ThemeProvider, withTheme, createGlobalStyle} from 'styled-components'
import {ToccoTheme} from 'tocco-theme'
import {theme} from 'tocco-ui'

const GlobalStyle = createGlobalStyle`

  // Legacy (display expression) icons styling
  .text-success {
    color: ${theme.color('signal.success.text')};
  }

  .text-muted {
    color: ${({theme}) => darken(0.4, theme.colors.paper)};
  }
`

const ThemeWrapper = ({theme, appTheme, children}) => {
  const mergedTheme = useMemo(() => _merge({}, theme, appTheme), [theme, appTheme])

  return (
    <ThemeProvider theme={mergedTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}

ThemeWrapper.defaultProps = {
  theme: ToccoTheme
}

ThemeWrapper.propTypes = {
  appTheme: PropTypes.object,
  theme: PropTypes.object,
  children: PropTypes.node
}

export default withTheme(ThemeWrapper)
