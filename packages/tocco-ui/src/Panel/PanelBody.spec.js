
import React from 'react'
import {mount} from 'enzyme'

import PanelBody from './PanelBody'
// import 'styled-components-test-utils/lib/chai';

describe('tocco-ui', function() {
  describe('PanelBody', function() {
    it('should render parent and children', () => {
      const wrapper = mount(<PanelBody><span>text-1</span><span>text-2</span></PanelBody>)
      expect(wrapper.find('div')).to.have.length(1)
      expect(wrapper.find('span')).to.have.length(2)
      expect(wrapper.find('span').first().text()).to.equal('text-1')
      expect(wrapper.find('span').last().text()).to.equal('text-2')
    })

    // it('body should be hidden', () => {
    //   const wrapper = shallow(<PanelBody isOpen={false}></PanelBody>)
    //   expect(wrapper).toHaveStyleRule('display', 'none');
    // })

    // it('body should be visible', () => {
    //   const wrapper = shallow(<PanelBody isOpen={true}></PanelBody>)
    //   expect(wrapper).toHaveStyleRule('display', 'block');
    // })
  })
})
