import toggleReducer from './toggleReducer'

describe('tocco-util', () => {
  describe('reducer', () => {
    describe('toggleReducer', () => {
      test('should toogle a boolean', () => {
        const initialState = {
          someBool: false
        }

        const expectedState = {
          someBool: true
        }

        expect(toggleReducer('someBool')(initialState)).to.eql(expectedState)
        expect(toggleReducer('someBool')(expectedState)).to.eql(initialState)
      })

      test('should toogle null', () => {
        const initialState = {
          someBool: null
        }

        const expectedState = {
          someBool: true
        }

        expect(toggleReducer('someBool')(initialState)).to.eql(expectedState)
      })
    })
  })
})
