import React from 'react'
import LoadMask from './LoadMask'
import {shallow, mount} from 'enzyme'

describe('tocco-ui', function() {
  describe('LoadMask', function() {
    it('shows spinner if an object is falsy', () => {
      const wrapper = mount(
        <LoadMask
          required={[undefined, undefined, true]}
        />
      )

      expect(wrapper.find('.loader')).to.have.length(1)
      wrapper.setProps({required: [{}, undefined]})
      expect(wrapper.find('.loader')).to.have.length(1)
      wrapper.setProps({required: [false]})
      expect(wrapper.find('.loader')).to.have.length(1)
      wrapper.setProps({required: [null]})
      expect(wrapper.find('.loader')).to.have.length(1)

      wrapper.setProps({required: [{}, {}]})
      expect(wrapper.find('.loader')).to.have.length(0)
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

      expect(wrapper.find('.loader')).to.have.length(1)
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

    it('add classes', () => {
      const promise = Promise.resolve({})

      let wrapper = shallow(
        <LoadMask
          promises={[promise]}
        />
      )

      expect(wrapper.find('#load-mask').hasClass('load-mask')).to.equal(true)

      wrapper = shallow(
        <LoadMask
          promises={[promise]}
          className="class"
        />
      )

      expect(wrapper.find('#load-mask').hasClass('load-mask')).to.equal(true)
      expect(wrapper.find('#load-mask').hasClass('class')).to.equal(true)

      wrapper = shallow(
        <LoadMask
          promises={[promise]}
          className="class1 class2 class3"
        />
      )

      expect(wrapper.find('#load-mask').hasClass('load-mask')).to.equal(true)
      expect(wrapper.find('#load-mask').hasClass('class1')).to.equal(true)
      expect(wrapper.find('#load-mask').hasClass('class2')).to.equal(true)
      expect(wrapper.find('#load-mask').hasClass('class3')).to.equal(true)
    })

    it('shows loading-text if set', () => {
      let wrapper = shallow(
        <LoadMask
          required={[undefined]}
          loadingText="Test"
        />
      )

      expect(wrapper.find('.loader-text')).to.have.length(1)

      wrapper = shallow(
        <LoadMask
          required={[undefined]}
        />
      )

      expect(wrapper.find('.loader-text')).to.have.length(0)
    })
  })
})
