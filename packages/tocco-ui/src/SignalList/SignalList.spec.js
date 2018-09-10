import {shallow} from 'enzyme'
import React from 'react'

import SignalList from './'

describe('tocco-ui', function() {
  describe('SignalList', function() {
    it('should render children', () => {
      const wrapper = shallow(
        <SignalList.List>
          <span/><span/>
        </SignalList.List>
      )
      expect(wrapper.find('span')).to.have.length(2)
    })
  })
})
