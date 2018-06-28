
import React from 'react'
import {mount} from 'enzyme'

import PanelBody from './PanelBody'
import StyledPanelBody from './StyledPanelBody'
// import 'styled-components-test-utils/lib/chai';

describe('tocco-ui', function() {
  describe('PanelBody', function() {
    it('should render parent and children', () => {
      const wrapper = mount(<PanelBody><span>text-1</span><span>text-2</span></PanelBody>)
      expect(wrapper.find(StyledPanelBody)).to.have.length(1)
      expect(wrapper.find('span')).to.have.length(2)
      expect(wrapper.find('span').first().text()).to.equal('text-1')
      expect(wrapper.find('span').last().text()).to.equal('text-2')
    })
  })
})
