import {isToManySelected} from './SelectionUtil'

describe('merge', () => {
  describe('utils ', () => {
    describe('SelectionUtil', () => {
      it('should return true if key is present in selection array', () => {
        const desiredToMany = 23
        const desiredEntityPk = 33
        const desiredRelationName = 'rel3'
        const toManySelections = {
          [desiredRelationName]: {
            [desiredEntityPk]: [
              desiredToMany, 34, 44
            ]
          }
        }

        const result = isToManySelected(toManySelections, desiredRelationName, desiredToMany, desiredEntityPk)
        expect(result).to.be.true
      })

      it('should return false if relation is not in input', () => {
        const desiredToMany = 23
        const desiredEntityPk = 33
        const desiredRelationName = 'rel3'
        const toManySelections = {
          rel2: {
            [desiredEntityPk]: [
              desiredToMany, 34, 44
            ]
          }
        }

        const result = isToManySelected(toManySelections, desiredRelationName, desiredToMany, desiredEntityPk)
        expect(result).to.be.false
      })

      it('should return false if key is not in selection array', () => {
        const desiredToMany = 23
        const desiredEntityPk = 33
        const desiredRelationName = 'rel3'
        const toManySelections = {
          rel2: {
            [desiredEntityPk]: [
              34, 44
            ]
          }
        }

        const result = isToManySelected(toManySelections, desiredRelationName, desiredToMany, desiredEntityPk)
        expect(result).to.be.false
      })
    })
  })
})
