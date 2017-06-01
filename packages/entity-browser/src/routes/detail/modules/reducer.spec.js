import reducer from './index'
import * as actions from './actions'

const INITIAL_STATE = {
  detailParams: undefined,
  formTouched: false
}

describe('entity-browser', () => {
  describe('routes', () => {
    describe('detail', () => {
      describe('reducer', () => {
        it('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(INITIAL_STATE)
        })

        it('should handle setDetailParams action', () => {
          const detailParams = {
            entityName: 'User',
            entityId: '1',
            formName: 'UserSearch',
            parentUrl: '../',
            showBackButton: false

          }

          const expectedStateAfter = {
            ...INITIAL_STATE,
            detailParams
          }

          expect(reducer(INITIAL_STATE, actions.setDetailParams(detailParams))).to.deep.equal(expectedStateAfter)
        })

        it('should handle formTouched action', () => {
          const formTouched = true

          const expectedStateAfter = {
            ...INITIAL_STATE,
            formTouched
          }

          expect(reducer(INITIAL_STATE, actions.setFormTouched(formTouched))).to.deep.equal(expectedStateAfter)
        })
      })
    })
  })
})
