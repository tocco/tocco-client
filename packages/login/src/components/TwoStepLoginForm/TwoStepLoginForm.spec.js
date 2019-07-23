import React from 'react'
import {shallow} from 'enzyme'
import {Button, Typography} from 'tocco-ui'
import {intlEnzyme, IntlStub} from 'tocco-test-util'

import {TwoStepLoginForm} from './TwoStepLoginForm'

describe('login', () => {
  describe('components', () => {
    describe('TwoStepLoginForm', () => {
      test('should render components', () => {
        const wrapper = intlEnzyme.mountWithIntl(
          <TwoStepLoginForm
            intl={IntlStub}
            changePage={() => undefined}
            twoStepLogin={() => undefined}
            username=""
            password=""
            requestedCode=""
          />
        )

        expect(wrapper.find('input[name="code"]')).to.have.length(1)
        expect(wrapper.find(Button)).to.have.length(1)
      })

      test('should have an initial code state', () => {
        const wrapper = shallow(
          <TwoStepLoginForm
            intl={IntlStub}
            changePage={() => undefined}
            twoStepLogin={() => undefined}
            username=""
            password=""
            requestedCode=""
          />
        )
        expect(wrapper.state().userCode).to.equal('')
      })

      test('should update code state on code change', () => {
        const wrapper = intlEnzyme.mountWithIntl(
          <TwoStepLoginForm
            intl={IntlStub}
            changePage={() => undefined}
            twoStepLogin={() => undefined}
            username=""
            password=""
            requestedCode=""
          />
        )

        const codeInput = wrapper.find('input[name="code"]')
        expect(codeInput).to.have.length(1)

        codeInput.simulate('change', {
          target: {
            value: '1234'
          }
        })

        expect(wrapper.state().userCode).to.equal('1234')
      })

      test('should disable submit button if code is not set', () => {
        const wrapper = shallow(
          <TwoStepLoginForm
            intl={IntlStub}
            changePage={() => undefined}
            twoStepLogin={() => undefined}
            username=""
            password=""
            requestedCode=""
          />
        )

        const button = wrapper.find('[type="submit"]')
        expect(button).to.have.length(1)
        expect(button.prop('disabled')).to.equal(true)
      })

      test('should enable submit button if code is set', () => {
        const wrapper = shallow(
          <TwoStepLoginForm
            intl={IntlStub}
            changePage={() => undefined}
            twoStepLogin={() => undefined}
            username=""
            password=""
            requestedCode=""
          />
        )

        wrapper.setState({
          userCode: '1234'
        })

        const button = wrapper.find('[type="submit"]')
        expect(button).to.have.length(1)
        expect(button).to.not.have.property('disabled')
      })

      test('should hide title by default', () => {
        const wrapper = shallow(
          <TwoStepLoginForm
            intl={IntlStub}
            changePage={() => undefined}
            twoStepLogin={() => undefined}
            username=""
            password=""
            requestedCode=""
          />
        )

        expect(wrapper.find(Typography.H5)).to.have.length(0)
      })

      test('should display title if showTitle prop is true', () => {
        const wrapper = shallow(
          <TwoStepLoginForm
            intl={IntlStub}
            changePage={() => undefined}
            twoStepLogin={() => undefined}
            showTitle
            username=""
            password=""
            requestedCode=""
          />
        )

        expect(wrapper.find(Typography.H5)).to.have.length(1)
      })

      test('should prevent default and call twoStepLogin on submit', () => {
        const preventDefault = sinon.spy()
        const twoStepLogin = sinon.spy()

        const wrapper = shallow(
          <TwoStepLoginForm
            intl={IntlStub}
            changePage={() => undefined}
            twoStepLogin={twoStepLogin}
            username=""
            password=""
            requestedCode=""
          />
        )

        wrapper.find('form').simulate('submit', {
          preventDefault
        })

        expect(preventDefault).to.have.property('callCount', 1)
        expect(twoStepLogin).to.have.property('callCount', 1)
      })
    })
  })
})
