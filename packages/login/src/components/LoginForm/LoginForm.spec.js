import React from 'react'
import {shallow, mount} from 'enzyme'
import {FormattedMessage} from 'react-intl'
import {Button} from 'tocco-ui'
import {intlEnzyme, IntlStub} from 'tocco-test-util'

import {Pages} from '../../types/Pages'
import LoginForm from './LoginForm'

describe('login', () => {
  describe('components', () => {
    describe('LoginForm', () => {
      test('should render some components', () => {
        const wrapper = mount(
          <LoginForm
            intl={IntlStub}
            login={() => undefined}
            changePage={() => undefined}
            setUsername={() => undefined}
            setPassword={() => undefined}
            loginPending={false}
            googleReCaptchaProps={{executeRecaptcha: () => {}}}
          />
        )
        expect(wrapper.find(Button)).to.have.length(2)
      })

      test(
        'should render two <FormattedMessage> components if title is shown',
        () => {
          const wrapper = intlEnzyme.mountWithIntl(
            <LoginForm
              intl={IntlStub}
              login={() => undefined}
              changePage={() => undefined}
              setUsername={() => undefined}
              setPassword={() => undefined}
              loginPending={false}
              showTitle
              googleReCaptchaProps={{executeRecaptcha: () => {}}}
            />
          )
          expect(wrapper.find(Button)).to.have.length(2)
          expect(wrapper.find(FormattedMessage)).to.have.length(2)
        }
      )

      test('should disable button if username and password are not set', () => {
        const wrapper = mount(
          <LoginForm
            intl={IntlStub}
            login={() => undefined}
            changePage={() => undefined}
            setUsername={() => undefined}
            setPassword={() => undefined}
            loginPending={false}
            username=""
            password=""
            googleReCaptchaProps={{executeRecaptcha: () => {}}}
          />
        )
        expect(wrapper.find(Button)).to.have.length(2)
        const button = wrapper.find(Button).first()
        expect(button.prop('disabled')).to.equal(true)
      })

      test('should disable button if only username is set', () => {
        const wrapper = mount(
          <LoginForm
            intl={IntlStub}
            login={() => undefined}
            changePage={() => undefined}
            setUsername={() => undefined}
            setPassword={() => undefined}
            loginPending={false}
            username="username"
            password=""
            googleReCaptchaProps={{executeRecaptcha: () => {}}}
          />
        )
        expect(wrapper.find(Button)).to.have.length(2)
        const button = wrapper.find(Button).first()
        expect(button.prop('disabled')).to.equal(true)
      })

      test('should disable button if only password is set', () => {
        const wrapper = mount(
          <LoginForm
            intl={IntlStub}
            login={() => undefined}
            changePage={() => undefined}
            setUsername={() => undefined}
            setPassword={() => undefined}
            loginPending={false}
            username=""
            password="password"
            googleReCaptchaProps={{executeRecaptcha: () => {}}}
          />
        )
        expect(wrapper.find(Button)).to.have.length(2)
        const button = wrapper.find(Button).first()
        expect(button.prop('disabled')).to.equal(true)
      })

      test('should enable button if username and password are set', () => {
        const wrapper = mount(
          <LoginForm
            intl={IntlStub}
            login={() => undefined}
            changePage={() => undefined}
            setUsername={() => undefined}
            setPassword={() => undefined}
            loginPending={false}
            username="username"
            password="password"
            googleReCaptchaProps={{executeRecaptcha: () => {}}}
          />
        )
        expect(wrapper.find('button')).to.have.length(2)
        const button = wrapper.find(Button).first()
        expect(button.prop('disabled')).to.equal(false)
      })

      test('should change page if password is requested', () => {
        const changePage = sinon.spy()

        const wrapper = intlEnzyme.mountWithIntl(
          <LoginForm
            intl={IntlStub}
            login={() => undefined}
            changePage={changePage}
            setUsername={() => undefined}
            setPassword={() => undefined}
            loginPending={false}
            username="username"
            password="password"
            googleReCaptchaProps={{executeRecaptcha: () => {}}}
          />
        )
        const Buttons = wrapper.find(Button)
        expect(Buttons).to.have.length(2)
        Buttons.at(1).simulate('click')
        expect(changePage).to.have.property('callCount', 1)
        expect(changePage.firstCall.args).to.eql([Pages.PASSWORD_REQUEST])
      })

      test('should call setUsername on username change', () => {
        const setUsername = sinon.spy()

        const wrapper = intlEnzyme.mountWithIntl(
          <LoginForm
            intl={IntlStub}
            login={() => undefined}
            changePage={() => undefined}
            setUsername={setUsername}
            setPassword={() => undefined}
            loginPending={false}
            username="username"
            password="password"
            googleReCaptchaProps={{executeRecaptcha: () => {}}}
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

      test('should call setPassword on password change', () => {
        const setPassword = sinon.spy()

        const wrapper = intlEnzyme.mountWithIntl(
          <LoginForm
            intl={IntlStub}
            login={() => undefined}
            changePage={() => undefined}
            setUsername={() => undefined}
            setPassword={setPassword}
            loginPending={false}
            username="username"
            password="password"
            googleReCaptchaProps={{executeRecaptcha: () => {}}}
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

      test('should prevent default and call login on submit', () => {
        const preventDefault = sinon.spy()
        const login = sinon.spy()
        const executeRecaptcha = () => {}
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
            googleReCaptchaProps={{executeRecaptcha}}
          />
        )

        wrapper.find('form').simulate('submit', {
          preventDefault
        })

        expect(preventDefault).to.have.property('callCount', 1)

        expect(login).to.have.property('callCount', 1)
        expect(login.firstCall.args).to.eql(['username', 'password', executeRecaptcha])
      })

      test('should focus password input if username is set', () => {
        const wrapper = intlEnzyme.mountWithIntl(
          <LoginForm
            intl={IntlStub}
            login={() => undefined}
            changePage={() => undefined}
            setUsername={() => undefined}
            setPassword={() => undefined}
            loginPending={false}
            username="username"
            password=""
            googleReCaptchaProps={{executeRecaptcha: () => {}}}
          />
        )

        const input = wrapper.find('input[name="password"]')
        expect(input.props().autoFocus).to.eql(true)
      })
    })
  })
})
