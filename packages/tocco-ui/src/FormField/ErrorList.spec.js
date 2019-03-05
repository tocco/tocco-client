import React from 'react'
import {shallow} from 'enzyme'

import ErrorList from './ErrorList'
import SignalList from '../SignalList'

describe('tocco-ui', () => {
  describe('FormField', () => {
    describe('ErrorList', () => {
      test('should render errors', () => {
        const error = {
          error1: ['error1-1'],
          error2: ['error2-1', 'error2-2']
        }
        const wrapper = shallow(<ErrorList error={error}/>)
        expect(wrapper.find(SignalList.Item)).to.have.length(3)
        expect(wrapper.find(SignalList.Item).at(0)).to.have.prop('label', 'error1-1')
        expect(wrapper.find(SignalList.Item).at(1)).to.have.prop('label', 'error2-1')
        expect(wrapper.find(SignalList.Item).at(2)).to.have.prop('label', 'error2-2')
      })
    })
  })
})
