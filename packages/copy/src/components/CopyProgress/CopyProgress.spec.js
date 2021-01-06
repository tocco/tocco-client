import React from 'react'
import {shallow} from 'enzyme'
import {LoadingSpinner} from 'tocco-ui'

import CopyProgress from './CopyProgress'

describe('copy', () => {
  describe('components', () => {
    describe('CopyProgress', () => {
      it('should render', () => {
        const wrapper = shallow(
          <CopyProgress startCopy={() => {}}/>
        )
        expect(wrapper.find(LoadingSpinner)).to.have.length(1)
      })
    })
  })
})
