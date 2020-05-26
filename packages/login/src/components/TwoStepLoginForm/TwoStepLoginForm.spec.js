import React from 'react'
import {shallow} from 'enzyme'
import {Button, Typography} from 'tocco-ui'
import {intlEnzyme, IntlStub} from 'tocco-test-util'

import TwoStepLoginForm from './TwoStepLoginForm'

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
          />
        )

        expect(wrapper.find('input')).to.have.length(1)
        expect(wrapper.find(Button)).to.have.length(1)
      })

      test('should disable submit button if code is not set', () => {
        const wrapper = shallow(
          <TwoStepLoginForm
            intl={IntlStub}
            changePage={() => undefined}
            twoStepLogin={() => undefined}
            username=""
            password=""
          />
        )

        const button = wrapper.find('[type="submit"]')
        expect(button).to.have.length(1)
        expect(button.prop('disabled')).to.equal(true)
      })

      test('should hide title by default', () => {
        const wrapper = shallow(
          <TwoStepLoginForm
            intl={IntlStub}
            changePage={() => undefined}
            twoStepLogin={() => undefined}
            username=""
            password=""
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
