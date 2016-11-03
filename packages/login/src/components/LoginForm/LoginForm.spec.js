import React from 'react'
import {LoginForm} from './LoginForm'
import {mount, render, shallow} from 'enzyme'
import {FormattedMessage} from 'react-intl'
import * as ToccoUI from 'tocco-ui'
import {Pages} from '../../types/Pages'
import {IntlStub} from 'tocco-test-util'

describe('login', () => {
  describe('components', () => {
    describe('LoginForm', () => {
      it('should render some components', () => {
        const wrapper = shallow(
          <LoginForm
            intl={IntlStub}
            login={() => undefined}
            changePage={() => undefined}
            setUsername={() => undefined}
            setPassword={() => undefined}
            loginPending={false}
            />
        )
        expect(wrapper.find(ToccoUI.Button)).to.have.length(1)
        expect(wrapper.find(FormattedMessage)).to.have.length(1)
      })

      it('should render three <FormattedMessage> components if title is shown', () => {
        const wrapper = shallow(
          <LoginForm
            intl={IntlStub}
            login={() => undefined}
            changePage={() => undefined}
            setUsername={() => undefined}
            setPassword={() => undefined}
            loginPending={false}
            showTitle
            />
        )
        expect(wrapper.find(ToccoUI.Button)).to.have.length(1)
        expect(wrapper.find(FormattedMessage)).to.have.length(3)
      })

      it('should disable button if username and password are not set', () => {
        const wrapper = shallow(
          <LoginForm
            intl={IntlStub}
            login={() => undefined}
            changePage={() => undefined}
            setUsername={() => undefined}
            setPassword={() => undefined}
            loginPending={false}
            username=""
            password=""
            />
        )
        expect(wrapper.find(ToccoUI.Button)).to.have.length(1)
        const button = wrapper.find(ToccoUI.Button)
        expect(button.prop('disabled')).to.equal(true)
      })

      it('should disable button if only username is set', () => {
        const wrapper = shallow(
          <LoginForm
            intl={IntlStub}
            login={() => undefined}
            changePage={() => undefined}
            setUsername={() => undefined}
            setPassword={() => undefined}
            loginPending={false}
            username="username"
            password=""
            />
        )
        expect(wrapper.find(ToccoUI.Button)).to.have.length(1)
        const button = wrapper.find(ToccoUI.Button)
        expect(button.prop('disabled')).to.equal(true)
      })

      it('should disable button if only password is set', () => {
        const wrapper = shallow(
          <LoginForm
            intl={IntlStub}
            login={() => undefined}
            changePage={() => undefined}
            setUsername={() => undefined}
            setPassword={() => undefined}
            loginPending={false}
            username=""
            password="password"
            />
        )
        expect(wrapper.find(ToccoUI.Button)).to.have.length(1)
        const button = wrapper.find(ToccoUI.Button)
        expect(button.prop('disabled')).to.equal(true)
      })

      it('should enable button if username and password are set', () => {
        const wrapper = shallow(
          <LoginForm
            intl={IntlStub}
            login={() => undefined}
            changePage={() => undefined}
            setUsername={() => undefined}
            setPassword={() => undefined}
            loginPending={false}
            username="username"
            password="password"
            />
        )
        expect(wrapper.find(ToccoUI.Button)).to.have.length(1)
        const button = wrapper.find(ToccoUI.Button)
        expect(button.prop('disabled')).to.equal(false)
      })

      it('should change page if password is requested', () => {
        const changePage = sinon.spy()

        const wrapper = shallow(
          <LoginForm
            intl={IntlStub}
            login={() => undefined}
            changePage={changePage}
            setUsername={() => undefined}
            setPassword={() => undefined}
            loginPending={false}
            username="username"
            password="password"
            />
        )
        expect(wrapper.find('.forgot-password')).to.have.length(1)
        wrapper.find('.forgot-password').simulate('click')

        expect(changePage).to.have.property('callCount', 1)
        expect(changePage.firstCall.args).to.eql([Pages.PASSWORD_REQUEST])
      })

      it('should call setUsername on username change', () => {
        const setUsername = sinon.spy()

        const wrapper = shallow(
          <LoginForm
            intl={IntlStub}
            login={() => undefined}
            changePage={() => undefined}
            setUsername={setUsername}
            setPassword={() => undefined}
            loginPending={false}
            username="username"
            password="password"
            />
        )

        wrapper.find('input[name="user"]').simulate('change', {
          target: {
            value: 'newusername'
          }
        })

        expect(setUsername).to.have.property('callCount', 1)
        expect(setUsername.firstCall.args).to.eql(['newusername'])
      })

      it('should call setPassword on password change', () => {
        const setPassword = sinon.spy()

        const wrapper = shallow(
          <LoginForm
            intl={IntlStub}
            login={() => undefined}
            changePage={() => undefined}
            setUsername={() => undefined}
            setPassword={setPassword}
            loginPending={false}
            username="username"
            password="password"
            />
        )

        wrapper.find('input[name="password"]').simulate('change', {
          target: {
            value: 'newpassword'
          }
        })

        expect(setPassword).to.have.property('callCount', 1)
        expect(setPassword.firstCall.args).to.eql(['newpassword'])
      })

      it('should prevent default and call login on submit', () => {
        const preventDefault = sinon.spy()
        const login = sinon.spy()

        const wrapper = shallow(
          <LoginForm
            intl={IntlStub}
            login={login}
            changePage={() => undefined}
            setUsername={() => undefined}
            setPassword={() => undefined}
            loginPending={false}
            username="username"
            password="password"
            />
        )

        wrapper.find('form').simulate('submit', {
          preventDefault
        })

        expect(preventDefault).to.have.property('callCount', 1)

        expect(login).to.have.property('callCount', 1)
        expect(login.firstCall.args).to.eql(['username', 'password'])
      })
    })
  })
})
