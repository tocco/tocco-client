import {ThemeProvider, withTheme} from 'styled-components'
import _merge from 'lodash/merge'
import {ToccoTheme} from 'tocco-theme'
import React, {memo} from 'react'
import PropTypes from 'prop-types'

const ThemeWrapper = ({theme, appTheme, children}) => {
  const mergedTheme = _merge({}, theme, appTheme)

  return <ThemeProvider theme={mergedTheme}>
    <>
      {children}
    </>
  </ThemeProvider>
}

ThemeWrapper.defaultProps = {
  theme: ToccoTheme
}

ThemeWrapper.propTypes = {
  appTheme: PropTypes.object,
  theme: PropTypes.object,
  children: PropTypes.node
}

export default memo(withTheme(ThemeWrapper))
