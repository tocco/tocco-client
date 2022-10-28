import {screen, fireEvent} from '@testing-library/react'
import {testingLibrary} from 'tocco-test-util'

import ProviderButton from './ProviderButton'

const EMPTY_FUNC = () => {}

describe('sso-login', () => {
  describe('components', () => {
    const baseProps = {
      provider: {
        button_primary_color: '#F00',
        button_secondary_color: '#00F',
        button_icon: 'fab, microsoft',
        button_label: 'Login with MS'
      },
      loginCompleted: EMPTY_FUNC,
      loadProviders: EMPTY_FUNC,
      loginEndpoint: 'test'
    }

    describe('ProviderButton', () => {
      test('should render a button', () => {
        testingLibrary.renderWithIntl(<ProviderButton {...baseProps} />)
        expect(screen.queryAllByRole('button')).to.have.length(1)
      })

      test('should call window.open and loginCompleted callback', () => {
        global.open = jest.fn(() => ({close: jest.fn()}))

        const loginCompleted = jest.fn()
        testingLibrary.renderWithIntl(<ProviderButton {...baseProps} loginCompleted={loginCompleted} />)

        fireEvent.click(screen.getByRole('button'))

        const result = {successful: false}
        global.window.ssoPopUpCallback(result)
        expect(global.open.mock.calls.length).to.eql(1)
        expect(loginCompleted.mock.calls.length).to.eql(1)
      })
    })
  })
})
