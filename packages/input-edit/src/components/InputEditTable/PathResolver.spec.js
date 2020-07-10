import {loadPathValue} from './PathResolver'

describe('input-edit', () => {
  describe('input-edit-table', () => {
    describe('PathResolver', () => {
      const nodes = {
        field: {
          value: 'field result'
        },
        relation: {
          value: {
            paths: {
              field: {
                value: 'path result'
              }
            }
          }
        },
        emptyRelation: undefined,
        multiRelation: {
          value: [
            {
              paths: {
                field: {
                  value: 'first result'
                }
              }
            },
            {
              paths: {
                field: {
                  value: 'second result'
                }
              }
            }
          ]
        }
      }
      test('should resolve field', () => {
        const path = 'field'
        const expectedValue = 'field result'
        expect(loadPathValue(nodes, path)).to.equal(expectedValue)
      })
      test('should resolve path', () => {
        const path = 'relation.field'
        const expectedValue = 'path result'
        expect(loadPathValue(nodes, path)).to.equal(expectedValue)
      })
      test('should concatenate array', () => {
        const path = 'multiRelation.field'
        const expectedValue = 'first result, second result'
        expect(loadPathValue(nodes, path)).to.equal(expectedValue)
      })
      test('should ignore empty relation', () => {
        const path = 'emptyRelation.field'
        expect(loadPathValue(nodes, path)).to.undefined
      })
      test('should stop at path end', () => {
        const path = 'relation'
        const expectedValue = nodes.relation.value.paths
        expect(loadPathValue(nodes, path)).to.equal(expectedValue)
      })
    })
  })
})
