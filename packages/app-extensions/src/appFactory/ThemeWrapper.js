import {ThemeProvider, withTheme} from 'styled-components'
import _merge from 'lodash/merge'
import {ToccoTheme} from 'tocco-theme'
import {Typography} from 'tocco-ui'
import React from 'react'
import PropTypes from 'prop-types'

const ThemeWrapper = props => {
  const {theme} = props
  const mergedTheme = _merge({}, theme || ToccoTheme, props.appTheme)

  return <ThemeProvider theme={mergedTheme}>
    <React.Fragment>
      {!theme && <Typography.InjectFontRoboto theme={mergedTheme}/>}
      {props.children}
    </React.Fragment>
  </ThemeProvider>
}

ThemeWrapper.propTypes = {
  appTheme: PropTypes.object,
  theme: PropTypes.object,
  children: PropTypes.node
}

export default withTheme(ThemeWrapper)
