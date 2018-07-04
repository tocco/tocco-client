import {shallow} from 'enzyme'
import React from 'react'

import SignalList from './SignalList'

describe('tocco-ui', function() {
  describe('SignalList', function() {
    it('should render children', () => {
      const wrapper = shallow(
        <SignalList>
          <span/><span/>
        </SignalList>
      )
      expect(wrapper.find('span')).to.have.length(2)
    })
  })
})
