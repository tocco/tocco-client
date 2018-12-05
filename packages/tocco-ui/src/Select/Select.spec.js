import React from 'react'
import ReactSelect from 'react-select'
import {mount} from 'enzyme'
import {ThemeProvider} from 'styled-components'

import Select from './Select'

const theme = {
  colors: {
    primary: '#9E2124',
    signal: {
      danger: {
        paper: '#EF9A9A',
        text: '#D32F2F'
      },
      warning: {
        paper: '#FFE082'
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

      // test('should call on change event', () => {
      //   const onChangeSpy = sinon.spy()
      //   const wrapper = shallow(
      //     <ThemeProvider theme={theme}>
      //       <Select onChange={onChangeSpy}/>
      //     </ThemeProvider>
      //   )
      //   const selectWrapper = wrapper.find(ReactSelect)
      //   selectWrapper.simulate('change')
      //   expect(onChangeSpy).to.have.been.called
      // })

      test('should set the more option available option', () => {
        const moreOptionsAvailableText = '...'
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <Select moreOptionsAvailable moreOptionsAvailableText={moreOptionsAvailableText}/>
          </ThemeProvider>
        )
        const selectWrapper = wrapper.find(ReactSelect)
        expect(selectWrapper.props().options).to.deep.equal([{display: moreOptionsAvailableText, isDisabled: true}])
      })
    })
  })
})
