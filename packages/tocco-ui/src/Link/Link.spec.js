
import React from 'react'
import {mount, shallow} from 'enzyme'

import Icon from '../Icon'
import Link from './Link'

describe('tocco-ui', () => {
  describe('Link', () => {
    test('should have 3 defaultProps', () => {
      const wrapper = shallow(<Link/>)
      const {breakWords, href, target} = wrapper.props()
      expect(breakWords).to.be.true
      expect(href).to.equal('#')
      expect(target).to.equal('_self')
    })

    test('should pass 10 props to StyledLink', () => {
      const onLinkClick = sinon.spy()
      const wrapper = shallow(
        <Link
          alt="alt text"
          breakWords={false}
          download="name.ext"
          href="/url"
          neutral={true}
          onClick={onLinkClick}
          rel="rel"
          tabIndex={1}
          target="_blank"
          title="title text"
        />
      )
      wrapper.simulate('click')
      const props = wrapper.props()
      const {
        alt,
        breakWords,
        children,
        download,
        href,
        neutral,
        onClick,
        rel,
        tabIndex,
        target,
        title
      } = props
      expect(Object.keys(props)).to.have.lengthOf(11)
      expect(alt).to.equal('alt text')
      expect(breakWords).to.be.false
      expect(children).to.have.length(2)
      expect(download).to.equal('name.ext')
      expect(href).to.equal('/url')
      expect(neutral).to.be.true
      expect(onClick).to.have.property('callCount', 1)
      expect(rel).to.equal('rel')
      expect(tabIndex).to.equal(1)
      expect(target).to.equal('_blank')
      expect(title).to.equal('title text')
    })

    test('should show label as title attribute', () => {
      const wrapper = mount(<Link breakWords={false} label="label text"/>)
      expect(wrapper.find('a').prop('title')).to.be.equal('label text')
    })

    test('should not show label as title attribute', () => {
      const wrapper = mount(<Link breakWords={true} label="label text"/>)
      expect(wrapper.find('a').prop('title')).to.be.undefined
    })

    test('should display icon', () => {
      const wrapper = shallow(<Link icon="bar"/>)
      expect(wrapper.find(Icon)).to.have.length(1)
    })

    test('should not display icon', () => {
      const wrapper = shallow(<Link/>)
      expect(wrapper.find('Icon')).to.have.length(0)
    })

    test('should display label', () => {
      const wrapper = shallow(<Link label="label text"/>)
      expect(wrapper.text()).to.equal('label text')
    })

    test('should render children label', () => {
      const wrapper = shallow(<Link>label text</Link>)
      expect(wrapper.text()).to.equal('label text')
    })
  })
})
