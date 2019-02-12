import {shallow, mount} from 'enzyme'
import React from 'react'

import Icon from '../Icon'
import ButtonLink from './ButtonLink'

describe('tocco-ui', () => {
  describe('ButtonLink', () => {
    test('should have 4 defaultProps', () => {
      const wrapper = shallow(<ButtonLink/>)
      const {href, ink, look} = wrapper.props()
      expect(href).to.equal('#')
      expect(ink).to.equal('base')
      expect(look).to.equal('flat')
      expect(ButtonLink.defaultProps.iconPosition).to.equal('prepend')
    })

    test('should pass 8 props to StyledButtonLink', () => {
      const wrapper = shallow(
        <ButtonLink
          alt="alt text"
          dense={true}
          download="name.ext"
          href="/url"
          ink="primary"
          look="raised"
          buttonGroupMelt={true}
          title="title text"
        />
      )
      const props = wrapper.props()
      const {
        alt,
        dense,
        download,
        href,
        ink,
        look,
        melt,
        title
      } = props

      expect(alt).to.equal('alt text')
      expect(dense).to.be.true
      expect(download).to.equal('name.ext')
      expect(href).to.equal('/url')
      expect(ink).to.equal('primary')
      expect(look).to.equal('raised')
      expect(melt).to.be.true
      expect(title).to.equal('title text')
      expect(ButtonLink.defaultProps.iconPosition).to.equal('prepend')
    })

    test('should display icon', () => {
      const wrapper = shallow(<ButtonLink icon="bar"/>)
      expect(wrapper.find(Icon).prop('icon')).to.equal('bar')
    })

    test('should not display icon', () => {
      const wrapper = shallow(<ButtonLink/>)
      expect(wrapper.find('Icon')).to.have.length(0)
    })

    test('should display label', () => {
      const wrapper = mount(<ButtonLink label="label text"/>)
      expect(wrapper.text()).to.equal('label text')
    })

    test('should propagate click event', () => {
      const wrapperClickSpy = sinon.spy()
      const wrapper = mount(
        <div onClick={wrapperClickSpy}>
          <ButtonLink/>
        </div>
      )

      wrapper.find('a').simulate('click')
      expect(wrapperClickSpy).to.have.property('callCount', 1)
    })

    test('should stop propagation with stopPropagation true', () => {
      const wrapperClickSpy = sinon.spy()
      const wrapper = mount(
        <div onClick={wrapperClickSpy}>
          <ButtonLink stopPropagation={true}/>
        </div>
      )

      wrapper.find('a').simulate('click')
      expect(wrapperClickSpy).to.have.property('callCount', 0)
    })
  })
})
