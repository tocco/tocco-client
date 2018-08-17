import React from 'react'
import {ThemeProvider} from 'styled-components'
import {shallow, mount} from 'enzyme'

import Icon from './Icon'

describe('tocco-ui', function() {
  describe('Icon', function() {
    it('should have 1 defaultProps', () => {
      const wrapper = shallow(<Icon />)
      expect(wrapper.props().position).to.equal('sole')
    })

    it('should receive theme', () => {
      const wrapper = mount(
        <ThemeProvider theme={{key: 'value'}}>
          <Icon />
        </ThemeProvider>
      )
      expect(wrapper.prop('theme')).to.deep.equal({key: 'value'})
    })
  })
})
