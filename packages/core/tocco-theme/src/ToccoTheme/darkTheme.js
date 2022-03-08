export default {
  name: 'dark',
  colors: {
    paper: '#131313',
    primary: '#A9A9A9',
    secondary: '#11587f',
    secondaryLight: '#022e40',
    text: '#d5d5d5',
    backgroundBody: '#131313',
    backgroundBreadcrumbs: '##131313',
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
        text: '#388E3C'
      },
      warning: {
        paper: '#FFF59D',
        text: '#F57F17'
      }
    }
  },
  fontFamily: {
    monospace: 'Ubuntu Mono, monospace',
    regular: 'Ubuntu, sans-serif',
    url: 'https://fonts.googleapis.com/css?family=Ubuntu+Mono:300,500|Ubuntu:300,500&display=swap'
  },
  fontSize: {
    base: 1.3,
    factor: 1.1
  },
  fontWeights: {
    regular: 300,
    bold: 500
  },
  lineHeights: {
    dense: 1,
    light: 1.2,
    regular: 1.4
  },
  radii: {
    regular: '4px',
    medium: '13px',
    large: '25px'
  },
  space: {
    base: 1.3,
    factor: 2
  }
}
