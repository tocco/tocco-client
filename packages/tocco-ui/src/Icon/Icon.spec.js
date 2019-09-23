import React from 'react'
import {mount} from 'enzyme'
import {ThemeProvider} from 'styled-components'

import FontAwesomeAdapter from './FontAwesomeAdapter'
import ToccoIcons from './ToccoIcons'
import Icon from './Icon'

describe('tocco-ui', () => {
  describe('Icon', () => {
    test('should receive theme', () => {
      const wrapper = mount(
        <ThemeProvider theme={{key: 'value'}}>
          <Icon icon="square"/>
        </ThemeProvider>
      )
      expect(wrapper.prop('theme')).to.deep.equal({key: 'value'})
    })

    test('should render an icon', () => {
      const wrapper = mount(<Icon icon="user"/>)

      expect(wrapper.find('svg')).to.have.length(1)
      expect(wrapper.find(FontAwesomeAdapter)).to.have.length(1)
    })

    test('should render an icon of tocco icons', () => {
      const wrapper = mount(<Icon icon="tocco"/>)

      expect(wrapper.find(ToccoIcons)).to.have.length(1)
    })
  })
})
