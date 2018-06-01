
import React from 'react'
import Link from './Link'
import {shallow} from 'enzyme'

describe('tocco-ui', function() {
  describe('Link', function() {
    it('should have 2 defaultProps', () => {
      const wrapper = shallow(<Link/>)
      const {href, target} = wrapper.props()
      expect(href).to.equal('#')
      expect(target).to.equal('_self')
    })

    it('should pass 5 props to StyledLink', () => {
      const wrapper = shallow(
        <Link
          alt="alt text"
          download="name.ext"
          href="/url"
          target="_blank"
          title="title text"
        />
      )
      const props = wrapper.props()
      const {
        alt,
        download,
        href,
        target,
        title
      } = props
      expect(Object.keys(props)).to.have.lengthOf(6)
      expect(alt).to.equal('alt text')
      expect(download).to.equal('name.ext')
      expect(href).to.equal('/url')
      expect(target).to.equal('_blank')
      expect(title).to.equal('title text')
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
