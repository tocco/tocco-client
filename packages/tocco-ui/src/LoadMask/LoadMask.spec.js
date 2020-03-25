import React from 'react'
import {shallow, mount} from 'enzyme'

import LoadMask from './LoadMask'
import LoadingSpinner from '../LoadingSpinner'
import Typography from '../Typography'

describe('tocco-ui', () => {
  describe('LoadMask', () => {
    test('shows spinner if an object is falsy', () => {
      const wrapper = mount(
        <LoadMask
          required={[undefined, undefined, true]}
        />
      )

      expect(wrapper.find(LoadingSpinner)).to.have.length(1)
      wrapper.setProps({required: [{}, undefined]})
      expect(wrapper.find(LoadingSpinner)).to.have.length(1)
      wrapper.setProps({required: [false]})
      expect(wrapper.find(LoadingSpinner)).to.have.length(1)
      wrapper.setProps({required: [null]})
      expect(wrapper.find(LoadingSpinner)).to.have.length(1)

      wrapper.setProps({required: [{}, {}]})
      wrapper.update()
      expect(wrapper.find(LoadingSpinner)).to.have.length(0)
    })

    test('shows children if loaded', () => {
      const wrapper = mount(
        <LoadMask
          required={[{}]}
        >
          <div id="test123"></div>
        </LoadMask>
      )
      expect(wrapper.find('#test123')).to.have.length(1)
    })

    test('shows spinner while promise is not finished', done => {
      const promise = new Promise(resolve => resolve())

      const wrapper = shallow(
        <LoadMask
          promises={[promise]}
        />
      )

      expect(wrapper.find(LoadingSpinner)).to.have.length(1)
      done()
    })

    test('does not show spinner after promise is resolved', done => {
      const promise = Promise.resolve({})

      const wrapper = shallow(
        <LoadMask
          promises={[promise]}
        />
      )

      done()
      expect(wrapper.find('span')).to.have.length(0)
    })

    test('shows loading-text if set', () => {
      let wrapper = shallow(
        <LoadMask
          required={[undefined]}
          loadingText="Lorem ipsum"
        />
      )
      expect(wrapper.find(Typography.Span).dive().text()).to.be.equal('Lorem ipsum')

      wrapper = shallow(
        <LoadMask
          required={[undefined]}
        />
      )
      expect(wrapper.find(Typography.Span)).to.have.length(0)
    })
  })
})
