import React from 'react'
import {mount, shallow} from 'enzyme'

import Preview from './Preview'

describe('tocco-ui', () => {
  describe('Preview', () => {
    it('render all elements and attributes', () => {
      const wrapper = mount(
        <Preview
          alt="alternative text"
          caption="caption text"
          downloadOnClick={true}
          srcUrl="/link-to-source"
          thumbnailUrl="/link-to-thumbnail"
        />
      )

      const figure = wrapper.find('figure')
      const a = wrapper.find('a')
      const img = wrapper.find('img')
      const figcaption = wrapper.find('figcaption')

      expect(figure).to.have.length(1)
      expect(a).to.have.length(1)
      expect(a).to.have.attr('href', '/link-to-source')
      expect(a).to.have.attr('alt', 'alternative text')
      expect(a).to.have.attr('download', 'caption text')
      expect(img).to.have.length(1)
      expect(img).to.have.attr('alt', 'alternative text')
      expect(img).to.have.attr('src', '/link-to-thumbnail')
      expect(figcaption).to.have.length(1)
      expect(figcaption).to.have.text('caption text')
    })

    it('display image or icon depending on thumbnailUrl', () => {
      let wrapper = shallow(
        <Preview
          alt="alt text"
          srcUrl="/link-to-source"
          thumbnailUrl="/link-to-thumbnail"
        />
      ).dive()

      expect(wrapper.find('img')).to.have.length(1)
      expect(wrapper.find('Icon')).to.have.length(0)

      wrapper = shallow(
        <Preview
          alt="alt text"
          srcUrl="/link-to-source"
          thumbnailUrl=""
        />
      ).dive()

      const Icon = wrapper.find('Icon')

      expect(wrapper.find('img')).to.have.length(0)
      expect(Icon).to.have.length(1)
      expect(Icon.prop('animation')).to.equal('none')
      expect(Icon.prop('icon')).to.equal('fa-file-text-o')
      expect(Icon.prop('position')).to.equal('sole')
    })

    it('add figcaption only if caption in provided', () => {
      let wrapper = mount(
        <Preview
          alt="alt text"
          caption="caption text"
          srcUrl="/link-to-source"
        />
      )

      let figcaption = wrapper.find('figcaption')

      expect(figcaption).to.have.length(1)
      expect(figcaption).to.have.text('caption text')

      wrapper = shallow(
        <Preview
          alt="alt text"
          caption=""
          srcUrl="/link-to-source"
        />
      ).dive()

      figcaption = wrapper.find('figcaption')

      expect(figcaption).to.have.length(0)
    })

    it('link image if demanded and allowed', () => {
      let wrapper = mount(
        <Preview
          alt="alt text"
          downloadOnClick={false}
          srcUrl="/link-to-source"
        />
      )

      expect(wrapper.find('a')).to.have.length(0)

      wrapper = mount(
        <Preview
          alt="alt text"
          downloadOnClick={true}
          srcUrl="/link-to-source"
        />
      )

      const a = wrapper.find('a')

      expect(a).to.have.length(1)
      expect(a).to.have.attr('href', '/link-to-source')

      wrapper = shallow(
        <Preview
          alt="alt text"
          downloadOnClick={true}
          onClick={(srcUrl, thumbnailUrl) => alert(srcUrl + '\n' + thumbnailUrl)}
          srcUrl="/link-to-source"
        />
      ).dive()

      expect(wrapper.find('a')).to.have.length(0)
    })

    it('trigger callback on click', () => {
      const srcUrl = '/link-to-source'
      const thumbnailUrl = '/link-to-thumbnail'
      const onClickFunction = sinon.spy()

      const wrapper = shallow(
        <Preview
          alt="alt text"
          downloadOnClick={true}
          onClick={onClickFunction}
          srcUrl={srcUrl}
          thumbnailUrl={thumbnailUrl}
        />
      )

      wrapper.find('img').simulate('click')
      expect(onClickFunction).to.be.calledWith(srcUrl, thumbnailUrl)
    })
  })
})
