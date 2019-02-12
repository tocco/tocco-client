import singleTransferReducer from './singleTransferReducer'

describe('tocco-util', () => {
  describe('reducer', () => {
    describe('singleTransferReducer', () => {
      const actionCreator = attr => value => ({
        type: 'SOMETHING',
        payload: {
          [attr]: value
        }
      })

      test('should set an attribute in state', () => {
        const initialState = {
          xy: 'test'
        }

        const newValue = 'testNewValue'
        const expectedState = {
          xy: newValue
        }

        expect(singleTransferReducer('xy')(initialState, actionCreator('xy')(newValue))).to.eql(expectedState)
      })
    })
  })
})
