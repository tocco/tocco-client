import {getSelection, getValue, getAdvancedSearchComponent} from './utils'

describe('tocco-util', () => {
  describe('formData', () => {
    describe('advancedSearch', () => {
      describe('utils', () => {
        describe('getSelection', () => {
          it('should return an array with all keys for multi', () => {
            const multi = true
            expect(getSelection([{key: 1}, {key: 3}], multi)).to.eql([1, 3])
          })
          it('should return an array with one key for single ', () => {
            const multi = false
            expect(getSelection({key: 99}, multi)).to.eql([99])
          })
        })

        describe('getValue', () => {
          const entities = [
            {key: 1, display: 'test1'},
            {key: 4, display: 'test4'}
          ]

          it('should return all entities if multi', () => {
            const multi = true
            expect(getValue(entities, multi)).to.eql(entities)
          })

          it('should return first entity as object if single ', () => {
            const multi = false
            expect(getValue(entities, multi)).to.eql(entities[0])
          })

          it('should return null if single and no selection ', () => {
            const multi = false
            expect(getValue([], multi)).to.be.null
          })
        })

        describe('getAdvancedSearchComponent', () => {
          it('should return a react object', () => {
            expect(getAdvancedSearchComponent()).to.be.a('function')
          })
        })
      })
    })
  })
})
