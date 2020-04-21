import reducer from './index'
import * as actions from './actions'
import {Pages} from './../../types/Pages'

const EXPECTED_INITIAL_STATE = {
  currentPage: Pages.LOGIN_FORM,
  username: '',
  password: '',
  captchaKey: null
}

describe('login', () => {
  describe('modules', () => {
    describe('login', () => {
      describe('reducer', () => {
        test('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
        })

        test('should handle CHANGE_PAGE', () => {
          const stateBefore = {
            currentPage: Pages.LOGIN_FORM
          }

          const expectedStateAfter = {
            currentPage: Pages.PASSWORD_UPDATE
          }

          expect(reducer(stateBefore, actions.changePage(Pages.PASSWORD_UPDATE))).to.deep.equal(expectedStateAfter)
        })

        test('should handle SET_USERNAME', () => {
          const stateBefore = {
            username: 'abc'
          }

          const expectedStateAfter = {
            username: 'abcd'
          }

          expect(reducer(stateBefore, actions.setUsername('abcd'))).to.deep.equal(expectedStateAfter)
        })

        test('should handle SET_PASSWORD', () => {
          const stateBefore = {
            password: '123'
          }

          const expectedStateAfter = {
            password: '1234'
          }

          expect(reducer(stateBefore, actions.setPassword('1234'))).to.deep.equal(expectedStateAfter)
        })
      })
    })
  })
})
