import React from 'react'
import {shallow} from 'enzyme'

import Login from './Login'
import LoginFormContainer from '../../containers/LoginFormContainer'
import PasswordUpdateDialogContainer from '../../containers/PasswordUpdateDialogContainer'
import PasswordRequestContainer from '../../containers/PasswordRequestContainer'
import TwoStepLoginContainer from '../../containers/TwoStepLoginContainer'
import {Pages} from '../../types/Pages'

describe('login', () => {
  describe('components', () => {
    describe('Login', () => {
      test('should render LoginFormContainer as default', () => {
        const withoutTitle = shallow(
          <Login initialize={() => undefined}/>
        )
        expect(withoutTitle.find(LoginFormContainer)).to.have.length(1)
        expect(withoutTitle.find(LoginFormContainer).prop('showTitle')).to.equal(undefined)

        const withTitle = shallow(
          <Login showTitle initialize={() => undefined}/>
        )
        expect(withTitle.find(LoginFormContainer)).to.have.length(1)
        expect(withTitle.find(LoginFormContainer).prop('showTitle')).to.equal(true)
      })

      test('should render PasswordUpdateContainer', () => {
        const withoutTitle = shallow(
          <Login currentPage={Pages.PASSWORD_UPDATE} initialize={() => undefined}/>
        )
        expect(withoutTitle.find(PasswordUpdateDialogContainer)).to.have.length(1)
        expect(withoutTitle.find(PasswordUpdateDialogContainer).prop('showTitle')).to.equal(undefined)

        const withTitle = shallow(
          <Login showTitle currentPage={Pages.PASSWORD_UPDATE} initialize={() => undefined}/>
        )
        expect(withTitle.find(PasswordUpdateDialogContainer)).to.have.length(1)
        expect(withTitle.find(PasswordUpdateDialogContainer).prop('showTitle')).to.equal(true)
      })

      test('should render PasswordRequestContainer', () => {
        const withoutTitle = shallow(
          <Login currentPage={Pages.PASSWORD_REQUEST} initialize={() => undefined}/>
        )
        expect(withoutTitle.find(PasswordRequestContainer)).to.have.length(1)
        expect(withoutTitle.find(PasswordRequestContainer).prop('showTitle')).to.equal(undefined)

        const withTitle = shallow(
          <Login showTitle currentPage={Pages.PASSWORD_REQUEST} initialize={() => undefined}/>
        )
        expect(withTitle.find(PasswordRequestContainer)).to.have.length(1)
        expect(withTitle.find(PasswordRequestContainer).prop('showTitle')).to.equal(true)
      })

      test('should render TwoStepLoginContainer', () => {
        const withoutTitle = shallow(
          <Login currentPage={Pages.TWOSTEPLOGIN} initialize={() => undefined}/>
        )
        expect(withoutTitle.find(TwoStepLoginContainer)).to.have.length(1)
        expect(withoutTitle.find(TwoStepLoginContainer).prop('showTitle')).to.equal(undefined)

        const withTitle = shallow(
          <Login showTitle currentPage={Pages.TWOSTEPLOGIN} initialize={() => undefined}/>
        )
        expect(withTitle.find(TwoStepLoginContainer)).to.have.length(1)
        expect(withTitle.find(TwoStepLoginContainer).prop('showTitle')).to.equal(true)
      })
    })
  })
})
