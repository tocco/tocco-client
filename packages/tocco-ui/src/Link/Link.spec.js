
import React from 'react'
import {mount, shallow} from 'enzyme'

import Link from './Link'

describe('tocco-ui', function() {
  describe('Link', function() {
    it('should have 3 defaultProps', () => {
      const wrapper = shallow(<Link/>)
      const {breakWords, href, target} = wrapper.props()
      expect(breakWords).to.be.true
      expect(href).to.equal('#')
      expect(target).to.equal('_self')
    })

    it('should pass 6 props to StyledLink', () => {
      const wrapper = shallow(
        <Link
          alt="alt text"
          breakWords={false}
          download="name.ext"
          href="/url"
          target="_blank"
          title="title text"
        />
      )
      const props = wrapper.props()
      const {
        alt,
        breakWords,
        download,
        href,
        target,
        title
      } = props
      expect(Object.keys(props)).to.have.lengthOf(7)
      expect(alt).to.equal('alt text')
      expect(breakWords).to.be.false
      expect(download).to.equal('name.ext')
      expect(href).to.equal('/url')
      expect(target).to.equal('_blank')
      expect(title).to.equal('title text')
    })

    it('should show label as title attribute', () => {
      const wrapper = mount(<Link breakWords={false} label="label text"/>)
      expect(wrapper.find('a').prop('title')).to.be.equal('label text')
    })

    it('should not show label as title attribute', () => {
      const wrapper = mount(<Link breakWords={true} label="label text"/>)
      expect(wrapper.find('a').prop('title')).to.be.undefined
    })

    it('should display icon', () => {
      const wrapper = shallow(<Link icon="bar"/>)
      expect(wrapper.find('Icon')).to.have.length(1)
    })

    it('should not display icon', () => {
      const wrapper = shallow(<Link/>)
      expect(wrapper.find('Icon')).to.have.length(0)
    })

    it('should display label', () => {
      const wrapper = shallow(<Link label="label text"/>).dive()
      expect(wrapper.text()).to.equal('label text')
    })
  })
})
