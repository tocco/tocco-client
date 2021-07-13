import React from 'react'
import {mount, shallow} from 'enzyme'

import Icon from '../Icon'
import Preview from './Preview'

describe('tocco-ui', () => {
  describe('Preview', () => {
    test('render all elements and attributes', () => {
      const wrapper = mount(
        <Preview
          alt="alternative text"
          caption="caption text"
          srcUrl="/link-to-source"
          thumbnailUrl="/link-to-thumbnail"
        />
      )

      const figure = wrapper.find('figure')
      const a = wrapper.find('a')
      const img = wrapper.find('img')

      expect(figure).to.have.length(1)
      expect(a).to.have.length(1)
      expect(a).to.have.attr('href', '/link-to-source')
      expect(a).to.have.attr('alt', 'alternative text')
      expect(img).to.have.length(1)
      expect(img).to.have.attr('alt', 'alternative text')
      expect(img).to.have.attr('src', '/link-to-thumbnail')
    })

    test('display image or icon depending on thumbnailUrl', () => {
      let wrapper = shallow(
        <Preview
          alt="alt text"
          srcUrl="/link-to-source"
          thumbnailUrl="/link-to-thumbnail"
        />
      )
      expect(wrapper.find('img')).to.have.length(1)
      expect(wrapper.find(Icon)).to.have.length(0)

      wrapper = shallow(
        <Preview
          alt="alt text"
          srcUrl="/link-to-source"
          thumbnailUrl=""
        />
      )
      expect(wrapper.find('img')).to.have.length(0)
      expect(wrapper.find(Icon)).to.have.length(1)
      expect(wrapper.find(Icon).prop('icon')).to.deep.equal('file-alt')
    })
  })
})
