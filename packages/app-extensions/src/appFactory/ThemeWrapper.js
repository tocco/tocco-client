import {ThemeProvider, withTheme} from 'styled-components'
import _merge from 'lodash/merge'
import {ToccoTheme} from 'tocco-theme'
import {Typography} from 'tocco-ui'
import React from 'react'
import PropTypes from 'prop-types'

class ThemeWrapper extends React.PureComponent {
  render() {
    const {theme, appTheme} = this.props
    const mergedTheme = _merge({}, theme, appTheme)

    return <ThemeProvider theme={mergedTheme}>
      <React.Fragment>
        {theme && <Typography.InjectFont />}
        {this.props.children}
      </React.Fragment>
    </ThemeProvider>
  }
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
