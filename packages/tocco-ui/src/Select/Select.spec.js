import React from 'react'
import ReactSelect from 'react-select'
import {mount} from 'enzyme'
import {ThemeProvider} from 'styled-components'

import Select from './Select'

const theme = {
  colors: {
    paper: '#fff',
    text: '#212121',
    signal: {
      danger: {
        paper: '#EF9A9A',
        text: '#D32F2F'
      },
      info: {
        paper: '#81D4FA',
        text: '#0288D1'
      }
    }
  },
  fontFamily: {
    regular: '"Helvetica Neue", Helvetica, Arial, sans-serif'
  },
  fontSize: {
    base: 1.4
  },
  fontWeights: {
    regular: 400
  },
  lineHeights: {
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

describe('tocco-ui', () => {
  describe('Select', () => {
    describe('<Select>', () => {
      test('should render a react-select', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <Select/>
          </ThemeProvider>
        )
        expect(wrapper.find(ReactSelect)).to.have.length(1)
      })
    })
  })
})
