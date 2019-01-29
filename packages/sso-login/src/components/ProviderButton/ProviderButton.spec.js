import React from 'react'
import {mount} from 'enzyme'
import {ThemeProvider} from 'styled-components'

import ProviderButton from './ProviderButton'

const EMPTY_FUNC = () => {}

const theme = {
  colors: {
    paper: '#fff',
    text: '#212121'
  }
}

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
      it('should render a button', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <ProviderButton {...baseProps}/>
          </ThemeProvider>
        )
        expect(wrapper.find('button')).to.have.length(1)
      })

      it('should call window.open and loginCompleted callback', () => {
        global.open = jest.fn(() => ({close: jest.fn()}))

        const loginCompleted = jest.fn()
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <ProviderButton {...baseProps} loginCompleted={loginCompleted}/>
          </ThemeProvider>
        )

        wrapper.find('button').simulate('click')

        const result = {successful: false}
        global.window.ssoPopUpCallback(result)
        expect(global.open.mock.calls.length).to.eql(1)
        expect(loginCompleted.mock.calls.length).to.eql(1)
      })
    })
  })
})
