import React from 'react'
import Preview from './Preview'
import {shallow} from 'enzyme'

describe('tocco-ui', () => {
  describe('Preview', () => {
    it('should render', () => {
      const wrapper = shallow(<Preview srcUrl="link/to/source" thumbnailUrl="link/to/thumbnail"/>)
      expect(wrapper.find('.tocco-preview')).to.have.length(1)
      expect(wrapper.find('Figure')).to.have.length(1)
    })

    it('should wrap thumbnail in link', () => {
      const wrapper = shallow(
        <Preview
          srcUrl="link/to/source"
          thumbnailUrl="link/to/thumbnail"
          downloadOnClick/>
      )

      expect(wrapper.find('a')).to.have.length(1)
    })

    it('should add className', () => {
      const customClassName = 'customClass'
      const wrapper = shallow(
        <Preview
          srcUrl="link/to/source"
          thumbnailUrl="link/to/thumbnail"
          className={customClassName}
        />
      )

      expect(wrapper.find(`.${customClassName}`)).to.have.length(1)
      expect(wrapper.find('.tocco-preview')).to.have.length(1)
    })
  })
})
