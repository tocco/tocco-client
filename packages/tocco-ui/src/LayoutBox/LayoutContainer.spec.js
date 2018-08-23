
import React from 'react'
import LayoutContainer from './LayoutContainer'
import StyledLayoutContainer from './StyledLayoutContainer'
import {mount} from 'enzyme'

describe('tocco-ui', function() {
  describe('LayoutContainer', function() {
    it('should render parent and children', () => {
      const wrapper = mount(<LayoutContainer><span>child1</span><span>child2</span></LayoutContainer>)
      expect(wrapper.find(StyledLayoutContainer)).to.have.length(1)
      expect(wrapper.find('span')).to.have.length(2)
      expect(wrapper.find('span').first().text()).to.equal('child1')
      expect(wrapper.find('span').last().text()).to.equal('child2')
    })

    it('should have one defaultProps', () => {
      expect(LayoutContainer.defaultProps.maxCellsPerRow).to.deep.equal({sm: 1, md: 2, lg: 3, xl: 4})
    })

    it('should pass props to child', () => {
      const wrapper = mount(
        <LayoutContainer
          maxCellsPerRow={{sm: 5, md: 6, lg: 7, xl: 8}}
        >
          <span>child1</span>
        </LayoutContainer>)
      const {containerWidth, maxCellsPerRow} = wrapper.find('span').props()
      expect(containerWidth).not.to.be.undefined
      expect(maxCellsPerRow).to.deep.equal({sm: 5, md: 6, lg: 7, xl: 8})
    })
  })
})
