import PropTypes from 'prop-types'
import {ThemeProvider} from 'styled-components'

const toccoTheme = {
  colors: {
    paper: '#fff',
    primary: '#9E2124',
    secondary: '#263E5B',
    secondaryLight: '#347da9',
    text: '#212121',
    backgroundBody: '#DEE6ED',
    backgroundBreadcrumbs: '#DEE6ED',
    backgroundPopover: '#424242',
    signal: {
      danger: {
        paper: '#EF9A9A',
        text: '#B71C1C'
      },
      info: {
        paper: '#81D4FA',
        text: '#0288D1'
      },
      success: {
        paper: '#A5D6A7',
        text: '#1B5E20'
      },
      warning: {
        paper: '#FFF59D',
        text: '#F57F17'
      }
    }
  },
  fontFamily: {
    monospace: 'Menlo, Monaco, Consolas, "Courier New", monospace',
    regular: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    url: ''
  },
  fontSize: {
    base: 1.4,
    factor: 1.3
  },
  fontWeights: {
    regular: 400,
    bold: 700
  },
  lineHeights: {
    dense: 1,
    regular: 1.4
  },
  radii: {
    regular: '4px'
  },
  space: {
    base: 2,
    factor: 2
  }
}

const TestThemeProvider = ({children}) => <ThemeProvider theme={toccoTheme}>{children}</ThemeProvider>

export default TestThemeProvider

TestThemeProvider.propTypes = {
  children: PropTypes.node
}
