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
  radii: {
    regular: '4px'
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
