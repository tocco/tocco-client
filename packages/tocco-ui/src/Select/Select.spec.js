import React from 'react'
import ReactSelect from 'react-select'
import {mount} from 'enzyme'
import {TestThemeProvider} from 'tocco-test-util'

import Ball from '../Ball'
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

      test('should render advanced search button', () => {
        const wrapper = mount(
          <TestThemeProvider>
            <Select openAdvancedSearch={() => {}} immutable={false}/>
          </TestThemeProvider>
        )
        expect(wrapper.find(Ball).filterWhere(b => b.props().icon === 'search')).to.have.length(1)
      })
      test('should not render advanced search button when disabled', () => {
        const wrapper = mount(
          <TestThemeProvider>
            <Select openAdvancedSearch={() => {}} immutable={true}/>
          </TestThemeProvider>
        )
        expect(wrapper.find(Ball).filterWhere(b => b.props().icon === 'search')).to.have.length(0)
      })
      test('should not render advanced search button without function', () => {
        const wrapper = mount(
          <TestThemeProvider>
            <Select immutable={false}/>
          </TestThemeProvider>
        )
        expect(wrapper.find(Ball).filterWhere(b => b.props().icon === 'search')).to.have.length(0)
      })

      test('should render remote create button', () => {
        const wrapper = mount(
          <TestThemeProvider>
            <Select createPermission={true}/>
          </TestThemeProvider>
        )
        expect(wrapper.find(Ball).filterWhere(b => b.props().icon === 'plus')).to.have.length(1)
      })
      test('should not render remote create button when not allowed', () => {
        const wrapper = mount(
          <TestThemeProvider>
            <Select createPermission={false}/>
          </TestThemeProvider>
        )
        expect(wrapper.find(Ball).filterWhere(b => b.props().icon === 'plus')).to.have.length(0)
      })
    })
  })
})
