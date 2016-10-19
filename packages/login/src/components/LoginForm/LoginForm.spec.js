import React from 'react'
import {LoginForm} from './LoginForm'
import {mount, render, shallow} from 'enzyme'
import {FormattedMessage} from 'react-intl'
import * as Tocco from 'tocco-ui'

const intl = {
  formatMessage: (obj) => obj.id
}

describe('login', () => {
  describe('components', () => {
    describe('LoginForm', () => {
      it('should render some components', () => {
        const wrapper = shallow(
            <LoginForm
              intl={intl}
              login={() => undefined}
              changePage={() => undefined}
              setUsername={() => undefined}
              setPassword={() => undefined}
              loginPending={false}
            />
        )
        expect(wrapper.find(Tocco.Button)).to.have.length(1)
        expect(wrapper.find(FormattedMessage)).to.have.length(1)
      })

      it('should three <FormattedMessage> components if title is shown', () => {
        const wrapper = shallow(
            <LoginForm
              intl={intl}
              login={() => undefined}
              changePage={() => undefined}
              setUsername={() => undefined}
              setPassword={() => undefined}
              loginPending={false}
              showTitle={true}
            />
        )
        expect(wrapper.find(Tocco.Button)).to.have.length(1)
        expect(wrapper.find(FormattedMessage)).to.have.length(3)
      })

      it ('Button is disabled if username and password are not set', () => {
        const wrapper = shallow(
            <LoginForm
              intl={intl}
              login={() => undefined}
              changePage={() => undefined}
              setUsername={() => undefined}
              setPassword={() => undefined}
              loginPending={false}
              username=''
              password=''
            />
        )
        expect(wrapper.find(Tocco.Button)).to.have.length(1)
        const button = wrapper.find(Tocco.Button)
        expect(button.prop('disabled')).to.equal(true)
      })

      it ('Button is disabled if only username is set', () => {
        const wrapper = shallow(
            <LoginForm
              intl={intl}
              login={() => undefined}
              changePage={() => undefined}
              setUsername={() => undefined}
              setPassword={() => undefined}
              loginPending={false}
              username='username'
              password=''
            />
        )
        expect(wrapper.find(Tocco.Button)).to.have.length(1)
        const button = wrapper.find(Tocco.Button)
        expect(button.prop('disabled')).to.equal(true)
      })

      it ('Button is disabled if only password is set', () => {
        const wrapper = shallow(
            <LoginForm
              intl={intl}
              login={() => undefined}
              changePage={() => undefined}
              setUsername={() => undefined}
              setPassword={() => undefined}
              loginPending={false}
              username=''
              password='password'
            />
        )
        expect(wrapper.find(Tocco.Button)).to.have.length(1)
        const button = wrapper.find(Tocco.Button)
        expect(button.prop('disabled')).to.equal(true)
      })

      it ('Button is not disabled if username and password are set', () => {
        const wrapper = shallow(
            <LoginForm
              intl={intl}
              login={() => undefined}
              changePage={() => undefined}
              setUsername={() => undefined}
              setPassword={() => undefined}
              loginPending={false}
              username='username'
              password='password'
            />
        )
        expect(wrapper.find(Tocco.Button)).to.have.length(1)
        const button = wrapper.find(Tocco.Button)
        expect(button.prop('disabled')).to.equal(false)
      })
    })
  })
})
