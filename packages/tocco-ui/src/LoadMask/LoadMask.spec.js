import React from 'react'
import LoadMask from './LoadMask'
import {shallow, mount} from 'enzyme'

import Icon from '../Icon'
import {Span} from '../Typography'

describe('tocco-ui', function() {
  describe('LoadMask', function() {
    it('shows spinner if an object is falsy', () => {
      const wrapper = mount(
        <LoadMask
          required={[undefined, undefined, true]}
        />
      )

      expect(wrapper.find(Icon)).to.have.length(1)
      wrapper.setProps({required: [{}, undefined]})
      expect(wrapper.find(Icon)).to.have.length(1)
      wrapper.setProps({required: [false]})
      expect(wrapper.find(Icon)).to.have.length(1)
      wrapper.setProps({required: [null]})
      expect(wrapper.find(Icon)).to.have.length(1)

      wrapper.setProps({required: [{}, {}]})
      expect(wrapper.find(Icon)).to.have.length(0)
    })

    it('shows children if loaded', () => {
      const wrapper = mount(
        <LoadMask
          required={[{}]}
        >
          <div id="test123"></div>
        </LoadMask>
      )
      expect(wrapper.find('#test123')).to.have.length(1)
    })

    it('shows spinner while promise is not finished', done => {
      const promise = new Promise(resolve => resolve())

      const wrapper = shallow(
        <LoadMask
          promises={[promise]}
        />
      )

      expect(wrapper.find(Icon)).to.have.length(1)
      done()
    })

    it('does not show spinner after promise is resolved', done => {
      const promise = Promise.resolve({})

      const wrapper = shallow(
        <LoadMask
          promises={[promise]}
        />
      )

      done()
      expect(wrapper.find('span')).to.have.length(0)
    })

    it('shows loading-text if set', () => {
      let wrapper = shallow(
        <LoadMask
          required={[undefined]}
          loadingText="Lorem ipsum"
        />
      )
      expect(wrapper.find(Span).dive().dive().text()).to.be.equal('Lorem ipsum')

      wrapper = shallow(
        <LoadMask
          required={[undefined]}
        />
      )
      expect(wrapper.find(Span)).to.have.length(0)
    })
  })
})
