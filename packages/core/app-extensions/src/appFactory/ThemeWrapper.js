import _merge from 'lodash/merge'
import {darken} from 'polished'
import PropTypes from 'prop-types'
import {useMemo} from 'react'
import {ThemeProvider, withTheme, createGlobalStyle} from 'styled-components'
import {ToccoTheme} from 'tocco-theme'
import {themeSelector} from 'tocco-ui'

const GlobalStyle = createGlobalStyle`
  // Legacy (display expression) icons styling
  .text-success {
    color: ${themeSelector.color('signal.success.text')};
  }

  .text-info {
    color: ${themeSelector.color('signal.info.text')};
  }

  .text-warning {
    color: ${themeSelector.color('signal.warning.text')};
  }

  .text-danger {
    color: ${themeSelector.color('signal.danger.text')};
  }

  .text-muted {
    color: ${({theme}) => darken(0.4, theme.colors.paper)};
  }
`

const ThemeWrapper = ({defaultTheme, customTheme, children, theme}) => {
  const mergedTheme = useMemo(() => _merge({}, defaultTheme, customTheme), [defaultTheme, customTheme])

  return (
    <ThemeProvider theme={theme || mergedTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}

ThemeWrapper.defaultProps = {
  defaultTheme: ToccoTheme
}

ThemeWrapper.propTypes = {
  customTheme: PropTypes.object,
  defaultTheme: PropTypes.object,
  theme: PropTypes.object,
  children: PropTypes.node
}

export default withTheme(ThemeWrapper)
