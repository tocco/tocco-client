import React from 'react'
import {shallow} from 'enzyme'
import {Button} from 'tocco-ui'
import {IntlStub} from 'tocco-test-util'

import {Pages} from '../../types/Pages'
import {PasswordRequest} from './PasswordRequest'

describe('login', () => {
  describe('components', () => {
    describe('PasswordRequest', () => {
      it('should render components', () => {
        const wrapper = shallow(
          <PasswordRequest
            intl={IntlStub}
            changePage={() => undefined}
            requestPassword={() => undefined}
          />
        )

        expect(wrapper.find('input[name="user"]')).to.have.length(1)
        expect(wrapper.find(Button)).to.have.length(2)
      })

      it('should have an initial password state', () => {
        const wrapper = shallow(
          <PasswordRequest
            intl={IntlStub}
            changePage={() => undefined}
            requestPassword={() => undefined}
          />
        )
        expect(wrapper.state().username).to.equal('')
      })

      it('should update username state on username change', () => {
        const wrapper = shallow(
          <PasswordRequest
            intl={IntlStub}
            changePage={() => undefined}
            requestPassword={() => undefined}
          />
        )

        expect(wrapper.find('input[name="user"]')).to.have.length(1)
        wrapper.find('input[name="user"]').simulate('change', {
          target: {
            value: 'user1'
          }
        })

        expect(wrapper.state().username).to.equal('user1')
      })

      it('should disable submit button if username is not set', () => {
        const wrapper = shallow(
          <PasswordRequest
            intl={IntlStub}
            changePage={() => undefined}
            requestPassword={() => undefined}
          />
        )

        const button = wrapper.find('[type="submit"]')
        expect(button).to.have.length(1)
        expect(button.prop('disabled')).to.equal(true)
      })

      it('should enable submit button if username is set', () => {
        const wrapper = shallow(
          <PasswordRequest
            intl={IntlStub}
            changePage={() => undefined}
            requestPassword={() => undefined}
          />
        )

        wrapper.setState({
          username: 'user1'
        })

        const button = wrapper.find('[type="submit"]')
        expect(button).to.have.length(1)

        expect(button).to.not.have.property('disabled')
      })

      it('should hide title by default', () => {
        const wrapper = shallow(
          <PasswordRequest
            intl={IntlStub}
            changePage={() => undefined}
            requestPassword={() => undefined}
          />
        )

        expect(wrapper.find('h1')).to.have.length(0)
      })

      it('should display title if showTitle prop is true', () => {
        const wrapper = shallow(
          <PasswordRequest
            intl={IntlStub}
            changePage={() => undefined}
            requestPassword={() => undefined}
            showTitle
          />
        )

        expect(wrapper.find('h1')).to.have.length(1)
      })

      it('should prevent default and call requestPassword on submit', () => {
        const preventDefault = sinon.spy()
        const requestPassword = sinon.spy()

        const wrapper = shallow(
          <PasswordRequest
            intl={IntlStub}
            changePage={() => undefined}
            requestPassword={requestPassword}
          />
        )

        wrapper.find('form').simulate('submit', {
          preventDefault
        })

        expect(preventDefault).to.have.property('callCount', 1)
        expect(requestPassword).to.have.property('callCount', 1)
      })

      it('should call changePage on abort', () => {
        const changePage = sinon.spy()

        const wrapper = shallow(
          <PasswordRequest
            intl={IntlStub}
            changePage={changePage}
            requestPassword={() => undefined}
          />
        )

        wrapper.find('[name="abort"]').simulate('click')

        expect(changePage).to.have.property('callCount', 1)
        expect(changePage.firstCall.args).to.eql([Pages.LOGIN_FORM])
      })
    })
  })
})
