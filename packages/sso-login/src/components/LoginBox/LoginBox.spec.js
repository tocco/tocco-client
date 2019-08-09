import React from 'react'
import {shallow} from 'enzyme'

import LoginBox from './LoginBox'
import ProviderButton from '../ProviderButton/ProviderButton'

const EMPTY_FUNC = () => {}

describe('sso-login', () => {
  const baseProps = {
    providers: [],
    loginCompleted: EMPTY_FUNC,
    loadProviders: EMPTY_FUNC,
    loginEndpoint: 'test',
    autoLogin: undefined
  }

  describe('components', () => {
    describe('LoginBox', () => {
      test('should call loadProviders', () => {
        const loadProviders = sinon.spy()
        shallow(<LoginBox {...baseProps} loadProviders={loadProviders}/>)
        expect(loadProviders).to.have.calledOnce
      })

      test('should render render  ProviderButton', () => {
        const providers = [{id: 'google'}, {id: 'microsoft'}]
        const wrapper = shallow(<LoginBox {...baseProps} providers={providers}/>)
        expect(wrapper.find(ProviderButton)).to.have.length(2)
      })
    })
  })
})
