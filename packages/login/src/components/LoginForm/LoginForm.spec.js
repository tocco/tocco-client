import React from 'react'
import {shallow} from 'enzyme'
import {FormattedMessage} from 'react-intl'
import {Button} from 'tocco-ui'
import {IntlStub} from 'tocco-test-util'

import {Pages} from '../../types/Pages'
import {LoginForm} from './LoginForm'

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
        expect(wrapper.find(Button)).to.have.length(2)
      })

      it('should render two <FormattedMessage> components if title is shown', () => {
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
        expect(wrapper.find(Button)).to.have.length(2)
        expect(wrapper.find(FormattedMessage)).to.have.length(2)
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
        expect(wrapper.find(Button)).to.have.length(2)
        const button = wrapper.find(Button).first()
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
        expect(wrapper.find(Button)).to.have.length(2)
        const button = wrapper.find(Button).first()
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
        expect(wrapper.find(Button)).to.have.length(2)
        const button = wrapper.find(Button).first()
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
        expect(wrapper.find(Button)).to.have.length(2)
        const button = wrapper.find(Button).first()
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
