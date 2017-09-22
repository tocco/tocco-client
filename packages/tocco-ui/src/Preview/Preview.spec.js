import React from 'react'
import Preview from './Preview'
import {shallow} from 'enzyme'

describe('tocco-ui', () => {
  describe('Preview', () => {
    it('should render', () => {
      const caption = 'Caption'
      const alt = 'Alternative Text'

      const wrapper = shallow(
        <Preview
          srcLink="link/to/source"
          thumbnailLink="link/to/thumbnail"
          caption={caption}
          alt={alt}/>)

      expect(wrapper.find('.tocco-preview')).to.have.length(1)
      expect(wrapper.find('img').props()).to.have.property('alt', alt)
      expect(wrapper.find('figcaption')).to.have.length(1)
    })

    it('should wrap thumbnail in link', () => {
      const wrapper = shallow(
        <Preview
          srcLink="link/to/source"
          thumbnailLink="link/to/thumbnail"
          downloadOnClick/>
      )

      expect(wrapper.find('a')).to.have.length(1)
    })

    it('should trigger callback on click', () => {
      const srcLink = 'link/to/source'
      const thumbnailLink = 'link/to/thumbnail'

      const onClickFunction = sinon.spy()
      const wrapper = shallow(
        <Preview
          srcLink={srcLink}
          thumbnailLink={thumbnailLink}
          onClick={onClickFunction}/>)

      wrapper.find('img').simulate('click')
      expect(onClickFunction).to.be.calledWith(srcLink, thumbnailLink)
    })
  })
})
