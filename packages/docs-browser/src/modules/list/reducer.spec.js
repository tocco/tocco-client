import reducer from './index'
import * as actions from './actions'

const INITIAL_STATE = {
  formName: null
}

describe('docs-browser', () => {
  describe('modules', () => {
    describe('list', () => {
      describe('reducer', () => {
        test('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(INITIAL_STATE)
        })

        test('should handle SET_FORM_NAME', () => {
          const formName = 'Move_docs_list_item'

          const expectedStateAfter = {
            formName: formName
          }

          expect(reducer(INITIAL_STATE, actions.setFormName(formName))).to.deep.equal(expectedStateAfter)
        })
      })
    })
  })
})
