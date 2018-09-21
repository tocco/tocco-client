import reducer from './index'
import {selectSourceField, selectSourceRelation, toggleRelationMany} from './actions'

describe('merge', () => {
  describe('modules', () => {
    describe('MergeMatrix', () => {
      describe('selections', () => {
        describe('reducer', () => {
          test('should create a valid initial state', () => {
            expect(reducer(undefined, {})).to.deep.equal({fields: {}, relations: {}, toManyRelations: {}})
          })

          test('handels changeSourceRelation', () => {
            const stateBefore = {
              fields: {}
            }

            const expectedStateAfter = {
              fields: {
                firstname: '1'
              }
            }

            expect(reducer(stateBefore, selectSourceField('firstname', '1'))).to.deep.equal(expectedStateAfter)
          })

          test('handels changeSourceRelation', () => {
            const stateBefore = {
              relations: {}
            }

            const expectedStateAfter = {
              relations: {
                ref_a: '1'
              }
            }

            expect(reducer(stateBefore, selectSourceRelation('ref_a', '1'))).to.deep.equal(expectedStateAfter)
          })

          test('handels toggleRelationMany', () => {
            const stateBefore = {toManyRelations: {}}

            const expectedStateAfterAdd = {
              toManyRelations: {
                ref_b: {1: ['33', '34']}
              }
            }

            let stateAfter = reducer(stateBefore, toggleRelationMany('ref_b', '33', '1'))
            stateAfter = reducer(stateAfter, toggleRelationMany('ref_b', '34', '1'))
            expect(stateAfter).to.deep.equal(expectedStateAfterAdd)

            const expectedStateAfterRemove = {
              toManyRelations: {
                ref_b: {1: ['34']}
              }
            }

            stateAfter = reducer(stateAfter, toggleRelationMany('ref_b', '33', '1'))
            expect(stateAfter).to.deep.equal(expectedStateAfterRemove)
          })
        })
      })
    })
  })
})
