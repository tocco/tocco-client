import React from 'react'
import ReactSelect from 'react-select'
import {mount} from 'enzyme'
import {TestThemeProvider} from 'tocco-test-util'

import Select from './Select'

describe('tocco-ui', () => {
  describe('Select', () => {
    describe('<Select>', () => {
      test('should render a react-select', () => {
        const wrapper = mount(
          <TestThemeProvider>
            <Select/>
          </TestThemeProvider>
        )
        expect(wrapper.find(ReactSelect)).to.have.length(1)
      })
    })
  })
})
