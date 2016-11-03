import assert from 'assert'
import React from 'react'
import DateFieldLabel from './DateFieldLabel'
import {mount, render, shallow} from 'enzyme'

describe('merge', function () {
  describe('DateLabel Component', function () {
    it('should format value', function () {
      let wrapper = shallow(<DateFieldLabel value="1976-03-16T12:00:00.000Z"/>)
      expect(wrapper.text()).to.equal('16. Mrz. 1976')
    })

    it('should format value accorind to locale', function () {
      let wrapper = shallow(<DateFieldLabel value="1976-03-16T12:00:00.000Z" locale="en"/>)
      expect(wrapper.text()).to.equal('Mar 16, 1976')
    })
  })
})
