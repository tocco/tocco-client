import {shallow, mount} from 'enzyme'
import React from 'react'
import {ThemeProvider} from 'styled-components'

import ButtonLink from './ButtonLink'

const theme = {
  overlays: {
    disabled: {
      color: '#f00',
      opacity: 0.8
    }
  }
}

describe('tocco-ui', function() {
  describe('ButtonLink', function() {
    it('should have 4 defaultProps', () => {
      const wrapper = shallow(<ButtonLink/>)
      const {href, ink, look} = wrapper.props()
      expect(href).to.equal('#')
      expect(ink).to.equal('base')
      expect(look).to.equal('flat')
      expect(ButtonLink.defaultProps.iconPosition).to.equal('before')
    })

    it('should pass 8 props to StyledButtonLink', () => {
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
      expect(Object.keys(props)).to.have.lengthOf(9)
      expect(alt).to.equal('alt text')
      expect(dense).to.be.true
      expect(download).to.equal('name.ext')
      expect(href).to.equal('/url')
      expect(ink).to.equal('primary')
      expect(look).to.equal('raised')
      expect(melt).to.be.true
      expect(title).to.equal('title text')
      expect(ButtonLink.defaultProps.iconPosition).to.equal('before')
    })

    it('should display icon', () => {
      const wrapper = shallow(<ButtonLink icon="bar"/>)
      expect(wrapper.find('Icon')).to.have.length(1)
    })

    it('should not display icon', () => {
      const wrapper = shallow(<ButtonLink/>)
      expect(wrapper.find('Icon')).to.have.length(0)
    })

    it('should display label', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <ButtonLink label="label text"/>
        </ThemeProvider>
      )
      expect(wrapper.text()).to.equal('label text')
    })
  })
})
