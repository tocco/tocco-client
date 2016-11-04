import React from 'react'
import LoadMask from './LoadMask'
import {shallow} from 'enzyme'

describe('tocco-ui', function() {
  describe('LoadMask', function() {
    it('shows spinner while promise is not finished', done => {
      const promise = new Promise(resolve => resolve())

      const wrapper = shallow(
        <LoadMask
          promises={[promise]}
        />
      )

      expect(wrapper.find('span')).to.have.length(1)
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

      expect(wrapper.find('div').hasClass('load-mask')).to.equal(true)

      wrapper = shallow(
        <LoadMask
          promises={[promise]}
          className="class"
        />
      )

      expect(wrapper.find('div').hasClass('load-mask')).to.equal(true)
      expect(wrapper.find('div').hasClass('class')).to.equal(true)

      wrapper = shallow(
        <LoadMask
          promises={[promise]}
          className="class1 class2 class3"
        />
      )

      expect(wrapper.find('div').hasClass('load-mask')).to.equal(true)
      expect(wrapper.find('div').hasClass('class1')).to.equal(true)
      expect(wrapper.find('div').hasClass('class2')).to.equal(true)
      expect(wrapper.find('div').hasClass('class3')).to.equal(true)
    })
  })
})
