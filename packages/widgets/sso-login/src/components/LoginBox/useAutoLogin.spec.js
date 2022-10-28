import {renderHook} from '@testing-library/react-hooks'

import {openLoginWindow} from '../../utils/loginWindow'
import useAutoLogin from './useAutoLogin'

jest.mock('../../utils/loginWindow', () => {
  return {
    openLoginWindow: jest.fn()
  }
})

describe('sso-login', () => {
  describe('components', () => {
    describe('LoginBox', () => {
      describe('useAutoLogin', () => {
        beforeEach(() => {
          openLoginWindow.mockReset()
        })

        test('should open login window when providers has been loaded', () => {
          const config = {
            autoLogin: 'google',
            providers: [],
            loginEndpoint: '/sso',
            loginCompleted: sinon.spy()
          }

          const {rerender} = renderHook(props => useAutoLogin(props), {initialProps: config})

          rerender({...config, providers: [{unique_id: 'google'}]})

          expect(openLoginWindow.mock.calls).has.length(1)
        })

        test('should open login window only once', () => {
          const config = {
            autoLogin: 'google',
            providers: [],
            loginEndpoint: '/sso',
            loginCompleted: sinon.spy()
          }

          const {rerender} = renderHook(props => useAutoLogin(props), {initialProps: config})

          rerender({...config, providers: [{unique_id: 'google'}]})
          rerender({...config, providers: [{unique_id: 'google'}]})
          rerender({...config, providers: [{unique_id: 'google'}]})

          expect(openLoginWindow.mock.calls).has.length(1)
        })

        test('should not open login window when autoLogin is disabled', () => {
          const config = {
            autoLogin: undefined,
            providers: [],
            loginEndpoint: '/sso',
            loginCompleted: sinon.spy()
          }

          const {rerender} = renderHook(props => useAutoLogin(props), {initialProps: config})

          rerender({...config, providers: [{unique_id: 'google'}]})

          expect(openLoginWindow.mock.calls).has.length(0)
        })
      })
    })
  })
})
