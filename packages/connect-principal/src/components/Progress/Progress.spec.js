import React from 'react'
import {shallow} from 'enzyme'
import {LoadingSpinner} from 'tocco-ui'

import Progress from './Progress'

describe('connect-principal', () => {
  describe('components', () => {
    describe('Progress', () => {
      it('should render', () => {
        const wrapper = shallow(
          <Progress checkAccessRights={() => {}}/>
        )
        expect(wrapper.find(LoadingSpinner)).to.have.length(1)
      })
    })
  })
})
