import booleanSelect from './booleanSelect'

describe('app-extensions', () => {
  describe('field', () => {
    describe('editableComponentConfigs', () => {
      describe('booleanSelect', () => {
        describe('hasValue', () => {
          test('sees true as value', () => {
            expect(booleanSelect.hasValue({value: true})).to.be.true
          })
          test('sees false as value', () => {
            expect(booleanSelect.hasValue({value: false})).to.be.true
          })
          test('sees null as no value', () => {
            expect(booleanSelect.hasValue({value: null})).to.be.false
          })
          test('sees undefined as no value', () => {
            expect(booleanSelect.hasValue({})).to.be.false
          })
          test('sees string as no value', () => {
            expect(booleanSelect.hasValue({value: 'true'})).to.be.false
          })
          test('sees number as no value', () => {
            expect(booleanSelect.hasValue({value: 1})).to.be.false
          })
        })
      })
    })
  })
})
