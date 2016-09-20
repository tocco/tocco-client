import React from 'react'
import PasswordUpdateDialog from './PasswordUpdateDialog'
import {SaveButton} from 'tocco-ui'
import {mount, render, shallow} from 'enzyme'

const intl = {
  formatMessage: (obj) => obj.id
}

describe('password-update', () => {
  describe('components', () => {
    describe('PasswordUpdateDialog', () => {
      it('fetches rules on mount', () => {
        const fetchValidationRules = sinon.spy();
        shallow(<PasswordUpdateDialog
          fetchValidationRules={fetchValidationRules}
          password={{}}
          intl={intl}
        />)
        expect(fetchValidationRules).to.have.property('callCount', 1);
      })

      it('disables everything except of old password', () => {
        const wrapper = shallow(<PasswordUpdateDialog
          fetchValidationRules={() => undefined}
          showOldPasswordField={true}
          password={{}}
          intl={intl}
        />)
        expect(wrapper.find({name: 'oldPassword'}).prop('readOnly')).to.equal(undefined)
        expect(wrapper.find({name: 'newPassword'}).prop('readOnly')).to.equal(true)
        expect(wrapper.find({name: 'newPasswordRepeat'}).prop('readOnly')).to.equal(true)
        expect(wrapper.find(SaveButton).prop('disabled')).to.equal(true)
      })

      it('enables new password as soon as old password is filled', () => {
        const wrapper = shallow(<PasswordUpdateDialog
          fetchValidationRules={() => undefined}
          showOldPasswordField={true}
          password={{
            oldPassword: 'oldpw'
          }}
          intl={intl}
        />)
        expect(wrapper.find({name: 'oldPassword'}).prop('readOnly')).to.equal(undefined)
        expect(wrapper.find({name: 'newPassword'}).prop('readOnly')).to.equal(undefined)
        expect(wrapper.find({name: 'newPasswordRepeat'}).prop('readOnly')).to.equal(true)
        expect(wrapper.find(SaveButton).prop('disabled')).to.equal(true)
      })

      it('enables new password repeat as soon as new password is filled and valid', () => {
        const invalidWrapper = shallow(<PasswordUpdateDialog
          fetchValidationRules={() => undefined}
          showOldPasswordField={true}
          password={{
            oldPassword: 'oldpw',
            newPassword: 'invalid',
            newPasswordValidationErrors: {
              LENGTH: true
            }
          }}
          intl={intl}
        />)
        expect(invalidWrapper.find({name: 'oldPassword'}).prop('readOnly')).to.equal(undefined)
        expect(invalidWrapper.find({name: 'newPassword'}).prop('readOnly')).to.equal(undefined)
        expect(invalidWrapper.find({name: 'newPasswordRepeat'}).prop('readOnly')).to.equal(true)
        expect(invalidWrapper.find(SaveButton).prop('disabled')).to.equal(true)

        const validWrapper = shallow(<PasswordUpdateDialog
          fetchValidationRules={() => undefined}
          showOldPasswordField={true}
          password={{
            oldPassword: 'oldpw',
            newPassword: 'validnewpw',
            newPasswordValidationErrors: {}
          }}
          intl={intl}
        />)
        expect(validWrapper.find({name: 'oldPassword'}).prop('readOnly')).to.equal(undefined)
        expect(validWrapper.find({name: 'newPassword'}).prop('readOnly')).to.equal(undefined)
        expect(validWrapper.find({name: 'newPasswordRepeat'}).prop('readOnly')).to.equal(false)
        expect(validWrapper.find(SaveButton).prop('disabled')).to.equal(true)
      })

      it('enables save button as soon as new password repeat is filled and matches new password', () => {
        const newPwRepeatEmptyWrapper = shallow(<PasswordUpdateDialog
          fetchValidationRules={() => undefined}
          showOldPasswordField={true}
          password={{
            oldPassword: 'oldpw',
            newPassword: 'newpw',
            newPasswordRepeat: ''
          }}
          intl={intl}
        />)
        expect(newPwRepeatEmptyWrapper.find({name: 'oldPassword'}).prop('readOnly')).to.equal(undefined)
        expect(newPwRepeatEmptyWrapper.find({name: 'newPassword'}).prop('readOnly')).to.equal(undefined)
        expect(newPwRepeatEmptyWrapper.find({name: 'newPasswordRepeat'}).prop('readOnly')).to.equal(undefined)
        expect(newPwRepeatEmptyWrapper.find(SaveButton).prop('disabled')).to.equal(true)

        const newPwRepeatNoMatchWrapper = shallow(<PasswordUpdateDialog
          fetchValidationRules={() => undefined}
          showOldPasswordField={true}
          password={{
            oldPassword: 'oldpw',
            newPassword: 'newpw',
            newPasswordRepeat: 'nomatch'
          }}
          intl={intl}
        />)
        expect(newPwRepeatNoMatchWrapper.find({name: 'oldPassword'}).prop('readOnly')).to.equal(undefined)
        expect(newPwRepeatNoMatchWrapper.find({name: 'newPassword'}).prop('readOnly')).to.equal(undefined)
        expect(newPwRepeatNoMatchWrapper.find({name: 'newPasswordRepeat'}).prop('readOnly')).to.equal(undefined)
        expect(newPwRepeatNoMatchWrapper.find(SaveButton).prop('disabled')).to.equal(true)

        const newPwRepeatMatchWrapper = shallow(<PasswordUpdateDialog
          fetchValidationRules={() => undefined}
          showOldPasswordField={true}
          password={{
            oldPassword: 'oldpw',
            newPassword: 'newpw',
            newPasswordRepeat: 'newpw'
          }}
          intl={intl}
        />)
        expect(newPwRepeatMatchWrapper.find({name: 'oldPassword'}).prop('readOnly')).to.equal(undefined)
        expect(newPwRepeatMatchWrapper.find({name: 'newPassword'}).prop('readOnly')).to.equal(undefined)
        expect(newPwRepeatMatchWrapper.find({name: 'newPasswordRepeat'}).prop('readOnly')).to.equal(undefined)
        expect(newPwRepeatMatchWrapper.find(SaveButton).prop('disabled')).to.equal(false)
      })
    })
  })
})
