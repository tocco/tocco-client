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

      test('should set an attribute in state to a specific path', () => {
        const initialState = {
          foo: {
            bar: {
              xy: 'test',
              z: 'blah'
            }
          }
        }

        const newValue = 'testNewValue'
        const expectedState = {
          foo: {
            bar: {
              xy: newValue,
              z: 'blah'
            }
          }
        }

        expect(singleTransferReducer('xy', 'foo.bar')(
          initialState,
          actionCreator('xy')(newValue)
        )).to.eql(expectedState)
      })
    })
  })
})
