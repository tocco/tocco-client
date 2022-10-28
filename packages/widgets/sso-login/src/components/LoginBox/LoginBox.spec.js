import {screen} from '@testing-library/react'
import {testingLibrary} from 'tocco-test-util'

import LoginBox from './LoginBox'

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
        testingLibrary.renderWithIntl(<LoginBox {...baseProps} loadProviders={loadProviders} />)
        expect(loadProviders).to.have.calledOnce
      })

      test('should render render ProviderButton', () => {
        const providers = [
          {id: 'google', button_primary_color: 'blue'},
          {id: 'microsoft', button_primary_color: 'red'}
        ]
        testingLibrary.renderWithIntl(<LoginBox {...baseProps} providers={providers} />)

        expect(screen.queryAllByRole('button')).to.have.length(2)
      })
    })
  })
})
