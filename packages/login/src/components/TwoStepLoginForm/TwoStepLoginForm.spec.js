import React from 'react'
import {TwoStepLoginForm} from './TwoStepLoginForm'
import {shallow} from 'enzyme'
import {Button} from 'tocco-ui'
import intl from '../../../tests/intlStub'

describe('login', () => {
  describe('components', () => {
    describe('TwoStepLoginForm', () => {
      it('should render components', () => {
        const wrapper = shallow(
          <TwoStepLoginForm
            intl={intl}
            changePage={() => undefined}
            twoStepLogin={() => undefined}
          />
        )

        expect(wrapper.find('input[name="code"]')).to.have.length(1)
        expect(wrapper.find(Button)).to.have.length(1)
      })

      it('should have an initial code state', () => {
        const wrapper = shallow(
          <TwoStepLoginForm
            intl={intl}
            changePage={() => undefined}
            twoStepLogin={() => undefined}
          />
        )
        expect(wrapper.state().userCode).to.equal('')
      })

      it('should update code state on code change', () => {
        const wrapper = shallow(
          <TwoStepLoginForm
            intl={intl}
            changePage={() => undefined}
            twoStepLogin={() => undefined}
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

      it('should disable submit button if code is not set', () => {
        const wrapper = shallow(
          <TwoStepLoginForm
            intl={intl}
            changePage={() => undefined}
            twoStepLogin={() => undefined}
          />
        )

        const button = wrapper.find('[name="submit"]')
        expect(button).to.have.length(1)
        expect(button.prop('disabled')).to.equal(true)
      })

      it('should enable submit button if code is set', () => {
        const wrapper = shallow(
          <TwoStepLoginForm
            intl={intl}
            changePage={() => undefined}
            twoStepLogin={() => undefined}
          />
        )

        wrapper.setState({
          userCode: '1234'
        })

        const button = wrapper.find('[name="submit"]')
        expect(button).to.have.length(1)
        expect(button).to.not.have.property('disabled')
      })

      it('should hide title by default', () => {
        const wrapper = shallow(
          <TwoStepLoginForm
            intl={intl}
            changePage={() => undefined}
            twoStepLogin={() => undefined}
          />
        )

        expect(wrapper.find('h1')).to.have.length(0)
      })

      it('should display title if showTitle prop is true', () => {
        const wrapper = shallow(
          <TwoStepLoginForm
            intl={intl}
            changePage={() => undefined}
            twoStepLogin={() => undefined}
            showTitle
          />
        )

        expect(wrapper.find('h1')).to.have.length(1)
      })

      it('should prevent default and call twoStepLogin on submit', () => {
        const preventDefault = sinon.spy()
        const twoStepLogin = sinon.spy()

        const wrapper = shallow(
          <TwoStepLoginForm
            intl={intl}
            changePage={() => undefined}
            twoStepLogin={twoStepLogin}
          />
        )

        wrapper.find('[name="submit"]').simulate('click', {
          preventDefault
        })

        expect(preventDefault).to.have.property('callCount', 1)
        expect(twoStepLogin).to.have.property('callCount', 1)
      })
    })
  })
})
