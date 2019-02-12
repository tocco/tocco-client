import React from 'react'
import {shallow} from 'enzyme'

import ErrorList from './ErrorList'

describe('tocco-ui', () => {
  describe('FormField', () => {
    describe('ErrorList', () => {
      test('should render errors', () => {
        const error = {
          error1: ['error1-1'],
          error2: ['error2-1', 'error2-2']
        }
        const wrapper = shallow(<ErrorList error={error}/>)

        expect(wrapper).to.contain('error1-1')
        expect(wrapper).to.contain('error2-1')
        expect(wrapper).to.contain('error2-2')
      })
    })
  })
})
