import React from 'react'
import PasswordUpdateDialog from './PasswordUpdateDialog'
import * as ToccoUI from 'tocco-ui'
import {mount, render, shallow} from 'enzyme'
import intl from '../../../../tests/intlStub'

describe('login', () => {
  describe('components', () => {
    describe('PasswordUpdateDialog', () => {
      const emptyPasswordProp = {
        oldPassword: '',
        newPassword: '',
        newPasswordRepeat: '',
        passwordUpdatePending: false,
      }

      it('should fetch rules on mount', () => {
        const fetchValidationRules = sinon.spy()
        shallow(<PasswordUpdateDialog
          fetchValidationRules={fetchValidationRules}
          password={emptyPasswordProp}
          intl={intl}
          initialized={() => undefined}
          savePassword={() => undefined}
          updateOldPassword={() => undefined}
          updateNewPassword={() => undefined}
          updateNewPasswordRepeat={() => undefined}
        />)
        expect(fetchValidationRules).to.have.property('callCount', 1)
      })

      it('should call initialized callback once rules rendered', () => {
        window.requestAnimationFrame = fn => fn()

        const initialized = sinon.spy()

        const wrapper = mount(<PasswordUpdateDialog
          fetchValidationRules={() => undefined}
          validationRules={null}
          password={emptyPasswordProp}
          intl={intl}
          initialized={initialized}
          savePassword={() => undefined}
          updateOldPassword={() => undefined}
          updateNewPassword={() => undefined}
          updateNewPasswordRepeat={() => undefined}
        />)

        expect(initialized).to.have.property('callCount', 0)

        wrapper.setProps({
          validationRules: []
        })

        expect(initialized).to.have.property('callCount', 1)
      })

      it('should display ToccoUI.LoadMask until rules loaded', () => {
        const wrapper = shallow(<PasswordUpdateDialog
          fetchValidationRules={() => undefined}
          validationRules={null}
          password={emptyPasswordProp}
          intl={intl}
          initialized={() => undefined}
          savePassword={() => undefined}
          updateOldPassword={() => undefined}
          updateNewPassword={() => undefined}
          updateNewPasswordRepeat={() => undefined}
        />)
        expect(wrapper.find(ToccoUI.LoadMask)).to.have.length(1)
      })

      it('should hide old password by default', () => {
        const wrapper = shallow(<PasswordUpdateDialog
          fetchValidationRules={() => undefined}
          validationRules={[]}
          password={emptyPasswordProp}
          intl={intl}
          initialized={() => undefined}
          savePassword={() => undefined}
          updateOldPassword={() => undefined}
          updateNewPassword={() => undefined}
          updateNewPasswordRepeat={() => undefined}
        />)
        expect(wrapper.find({name: 'oldPassword'}).length).to.equal(0)
      })

      it('should handle showOldPasswordField prop', () => {
        const showFieldWrapper = shallow(<PasswordUpdateDialog
          fetchValidationRules={() => undefined}
          validationRules={[]}
          password={emptyPasswordProp}
          intl={intl}
          initialized={() => undefined}
          savePassword={() => undefined}
          updateOldPassword={() => undefined}
          updateNewPassword={() => undefined}
          updateNewPasswordRepeat={() => undefined}
          showOldPasswordField={true}
        />)
        expect(showFieldWrapper.find({name: 'oldPassword'}).length).to.equal(1)

        const hideFieldWrapper = shallow(<PasswordUpdateDialog
          fetchValidationRules={() => undefined}
          validationRules={[]}
          password={emptyPasswordProp}
          intl={intl}
          initialized={() => undefined}
          savePassword={() => undefined}
          updateOldPassword={() => undefined}
          updateNewPassword={() => undefined}
          updateNewPasswordRepeat={() => undefined}
          showOldPasswordField={false}
        />)
        expect(hideFieldWrapper.find({name: 'oldPassword'}).length).to.equal(0)
      })

      it('should disable everything except of old password', () => {
        const wrapper = shallow(<PasswordUpdateDialog
          fetchValidationRules={() => undefined}
          validationRules={[]}
          showOldPasswordField={true}
          password={emptyPasswordProp}
          intl={intl}
          initialized={() => undefined}
          savePassword={() => undefined}
          updateOldPassword={() => undefined}
          updateNewPassword={() => undefined}
          updateNewPasswordRepeat={() => undefined}
        />)
        expect(wrapper.find({name: 'oldPassword'}).prop('readOnly')).to.equal(false)
        expect(wrapper.find({name: 'newPassword'}).prop('readOnly')).to.equal(true)
        expect(wrapper.find({name: 'newPasswordRepeat'}).prop('readOnly')).to.equal(true)
        expect(wrapper.find(ToccoUI.Button).prop('disabled')).to.equal(true)
      })

      it('should enable new password as soon as old password is filled', () => {
        const wrapper = shallow(<PasswordUpdateDialog
          fetchValidationRules={() => undefined}
          validationRules={[]}
          showOldPasswordField={true}
          password={{
            ...emptyPasswordProp,
            oldPassword: 'oldpw'
          }}
          intl={intl}
          initialized={() => undefined}
          savePassword={() => undefined}
          updateOldPassword={() => undefined}
          updateNewPassword={() => undefined}
          updateNewPasswordRepeat={() => undefined}
        />)
        expect(wrapper.find({name: 'oldPassword'}).prop('readOnly')).to.equal(false)
        expect(wrapper.find({name: 'newPassword'}).prop('readOnly')).to.equal(false)
        expect(wrapper.find({name: 'newPasswordRepeat'}).prop('readOnly')).to.equal(true)
        expect(wrapper.find(ToccoUI.Button).prop('disabled')).to.equal(true)
      })

      it('should enable new password repeat as soon as new password is filled and valid', () => {
        const invalidWrapper = shallow(<PasswordUpdateDialog
          fetchValidationRules={() => undefined}
          validationRules={[]}
          showOldPasswordField={true}
          password={{
            ...emptyPasswordProp,
            oldPassword: 'oldpw',
            newPassword: 'invalid',
            newPasswordValidationErrors: {
              LENGTH: true
            }
          }}
          intl={intl}
          initialized={() => undefined}
          savePassword={() => undefined}
          updateOldPassword={() => undefined}
          updateNewPassword={() => undefined}
          updateNewPasswordRepeat={() => undefined}
        />)
        expect(invalidWrapper.find({name: 'oldPassword'}).prop('readOnly')).to.equal(false)
        expect(invalidWrapper.find({name: 'newPassword'}).prop('readOnly')).to.equal(false)
        expect(invalidWrapper.find({name: 'newPasswordRepeat'}).prop('readOnly')).to.equal(true)
        expect(invalidWrapper.find(ToccoUI.Button).prop('disabled')).to.equal(true)

        const validWrapper = shallow(<PasswordUpdateDialog
          fetchValidationRules={() => undefined}
          validationRules={[]}
          showOldPasswordField={true}
          password={{
            ...emptyPasswordProp,
            oldPassword: 'oldpw',
            newPassword: 'validnewpw',
            newPasswordValidationErrors: {}
          }}
          intl={intl}
          initialized={() => undefined}
          savePassword={() => undefined}
          updateOldPassword={() => undefined}
          updateNewPassword={() => undefined}
          updateNewPasswordRepeat={() => undefined}
        />)
        expect(validWrapper.find({name: 'oldPassword'}).prop('readOnly')).to.equal(false)
        expect(validWrapper.find({name: 'newPassword'}).prop('readOnly')).to.equal(false)
        expect(validWrapper.find({name: 'newPasswordRepeat'}).prop('readOnly')).to.equal(false)
        expect(validWrapper.find(ToccoUI.Button).prop('disabled')).to.equal(true)
      })

      it('should enable save ToccoUI.Button as soon as new password repeat is filled and matches new password', () => {
        const newPwRepeatEmptyWrapper = shallow(<PasswordUpdateDialog
          fetchValidationRules={() => undefined}
          validationRules={[]}
          showOldPasswordField={true}
          password={{
            ...emptyPasswordProp,
            oldPassword: 'oldpw',
            newPassword: 'newpw',
            newPasswordRepeat: ''
          }}
          intl={intl}
          initialized={() => undefined}
          savePassword={() => undefined}
          updateOldPassword={() => undefined}
          updateNewPassword={() => undefined}
          updateNewPasswordRepeat={() => undefined}
        />)
        expect(newPwRepeatEmptyWrapper.find({name: 'oldPassword'}).prop('readOnly')).to.equal(false)
        expect(newPwRepeatEmptyWrapper.find({name: 'newPassword'}).prop('readOnly')).to.equal(false)
        expect(newPwRepeatEmptyWrapper.find({name: 'newPasswordRepeat'}).prop('readOnly')).to.equal(undefined)
        expect(newPwRepeatEmptyWrapper.find(ToccoUI.Button).prop('disabled')).to.equal(true)

        const newPwRepeatNoMatchWrapper = shallow(<PasswordUpdateDialog
          fetchValidationRules={() => undefined}
          validationRules={[]}
          showOldPasswordField={true}
          password={{
            ...emptyPasswordProp,
            oldPassword: 'oldpw',
            newPassword: 'newpw',
            newPasswordRepeat: 'nomatch'
          }}
          intl={intl}
          initialized={() => undefined}
          savePassword={() => undefined}
          updateOldPassword={() => undefined}
          updateNewPassword={() => undefined}
          updateNewPasswordRepeat={() => undefined}
        />)
        expect(newPwRepeatNoMatchWrapper.find({name: 'oldPassword'}).prop('readOnly')).to.equal(false)
        expect(newPwRepeatNoMatchWrapper.find({name: 'newPassword'}).prop('readOnly')).to.equal(false)
        expect(newPwRepeatNoMatchWrapper.find({name: 'newPasswordRepeat'}).prop('readOnly')).to.equal(undefined)
        expect(newPwRepeatNoMatchWrapper.find(ToccoUI.Button).prop('disabled')).to.equal(true)

        const newPwRepeatMatchWrapper = shallow(<PasswordUpdateDialog
          fetchValidationRules={() => undefined}
          validationRules={[]}
          showOldPasswordField={true}
          password={{
            ...emptyPasswordProp,
            oldPassword: 'oldpw',
            newPassword: 'newpw',
            newPasswordRepeat: 'newpw'
          }}
          intl={intl}
          initialized={() => undefined}
          savePassword={() => undefined}
          updateOldPassword={() => undefined}
          updateNewPassword={() => undefined}
          updateNewPasswordRepeat={() => undefined}
        />)
        expect(newPwRepeatMatchWrapper.find({name: 'oldPassword'}).prop('readOnly')).to.equal(false)
        expect(newPwRepeatMatchWrapper.find({name: 'newPassword'}).prop('readOnly')).to.equal(false)
        expect(newPwRepeatMatchWrapper.find({name: 'newPasswordRepeat'}).prop('readOnly')).to.equal(undefined)
        expect(newPwRepeatMatchWrapper.find(ToccoUI.Button).prop('disabled')).to.equal(false)
      })

      it('should auto focus old password field if present', () => {
        const wrapper = shallow(<PasswordUpdateDialog
          fetchValidationRules={() => undefined}
          validationRules={[]}
          showOldPasswordField={true}
          password={emptyPasswordProp}
          intl={intl}
          initialized={() => undefined}
          savePassword={() => undefined}
          updateOldPassword={() => undefined}
          updateNewPassword={() => undefined}
          updateNewPasswordRepeat={() => undefined}
        />)
        expect(wrapper.find({name: 'oldPassword'}).prop('autoFocus')).to.equal(true)
        expect(wrapper.find({name: 'newPassword'}).prop('autoFocus')).to.equal(false)
      })

      it('should auto focus new password field if old password field not present', () => {
        const wrapper = shallow(<PasswordUpdateDialog
          fetchValidationRules={() => undefined}
          validationRules={[]}
          showOldPasswordField={false}
          password={emptyPasswordProp}
          intl={intl}
          initialized={() => undefined}
          savePassword={() => undefined}
          updateOldPassword={() => undefined}
          updateNewPassword={() => undefined}
          updateNewPasswordRepeat={() => undefined}
        />)
        expect(wrapper.find({name: 'newPassword'}).prop('autoFocus')).to.equal(true)
      })
    })
  })
})
