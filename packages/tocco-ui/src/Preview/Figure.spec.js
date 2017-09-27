import React from 'react'
import Figure from './Figure'
import {shallow} from 'enzyme'

describe('tocco-ui', () => {
  describe('Figure', () => {
    it('should render', () => {
      const caption = 'Caption'
      const alt = 'Alternative Text'

      const wrapper = shallow(
        <Figure
          srcUrl="link/to/source"
          thumbnailUrl="link/to/thumbnail"
          caption={caption}
          alt={alt}/>)

      expect(wrapper.find('.tocco-figure')).to.have.length(1)
      expect(wrapper.find('img').props()).to.have.property('alt', alt)
      expect(wrapper.find('figcaption')).to.have.length(1)
    })

    it('should trigger callback on click', () => {
      const srcUrl = 'link/to/source'
      const thumbnailUrl = 'link/to/thumbnail'

      const onClickFunction = sinon.spy()
      const wrapper = shallow(
        <Figure
          srcUrl={srcUrl}
          thumbnailUrl={thumbnailUrl}
          onClick={onClickFunction}/>)

      wrapper.find('img').simulate('click')
      expect(onClickFunction).to.be.calledWith(srcUrl, thumbnailUrl)
    })
  })
})
