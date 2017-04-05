import {getMergeMatrixResult, getMergeStrategyResult} from './MergeActionResult'

describe('merge', () => {
  describe('utils ', () => {
    describe('MergeActionResult', () => {
      it('should map modelName', () => {
        const state = {
          model: {modelName: 'User'},
          entities: [],
          selections: {}
        }

        const result = getMergeMatrixResult(state)

        result.should.have.property('modelName')
        result.modelName.should.equal('User')
      })

      it('should set sourceEntities without including target', () => {
        const state = {
          model: {modelName: 'User'},
          targetEntityPk: '2',
          entities: [{pk: '1'}, {pk: '2'}, {pk: '3'}],
          selections: {}
        }

        const result = getMergeMatrixResult(state)

        result.should.have.property('sourceEntities')
        result.sourceEntities.should.eql(['1', '3'])
      })

      it('should map fields and exclude target entity selections', () => {
        const state = {
          model: {modelName: 'User'},
          entities: [{pk: '1'}, {pk: '2'}],
          targetEntityPk: '1',
          selections: {
            fields: {
              firstname: '1',
              lastname: '2'
            }
          }
        }

        const result = getMergeMatrixResult(state)

        result.should.have.property('data')
        result.data.should.have.property('fields')
        result.data.fields.should.have.length(1)
        result.data.fields[0].should.eql(
          {name: 'lastname', pk: '2'}
        )
      })

      it('should map relations and exclude target entity selections', () => {
        const state = {
          model: {modelName: 'User'},
          entities: [
            {pk: '113'},
            {pk: '114', relations: {rel_b: {values: [{pk: '44'}]}}}],
          targetEntityPk: '113',
          selections: {
            relations: {
              rel_a: '113',
              rel_b: '114'
            }
          }
        }

        const result = getMergeMatrixResult(state)

        result.should.have.property('data')
        result.data.should.have.property('relations')
        result.data.relations.should.have.length(1)

        result.data.relations[0].should.eql(
          {name: 'rel_b', keys: ['44']}
        )
      })

      it('relations: should return empty array if to one relation is selected with no value', () => {
        const state = {
          model: {modelName: 'User'},
          entities: [
            {pk: '113'},
            {pk: '114', relations: {rel_a: {values: []}}}],
          targetEntityPk: '113',
          selections: {
            relations: {
              rel_a: '114'
            }
          }
        }

        const result = getMergeMatrixResult(state)
        result.data.relations.should.have.length(1)
        result.data.relations[0].should.eql(
          {name: 'rel_a', keys: []}
        )
      })

      it('should map to many relations', () => {
        const state = {
          model: {modelName: 'User'},
          entities: [
            {pk: '113'},
            {pk: '114'}],
          targetEntityPk: '113',
          selections: {
            toManyRelations: {
              rel_c: {
                113: ['33', '34'],
                114: ['33', '35']
              },
              rel_d: {
                113: [],
                114: ['33', '34']
              }
            }
          }
        }

        const result = getMergeMatrixResult(state)

        result.should.have.property('data')
        result.data.should.have.property('toManyRelations')
        result.data.toManyRelations.should.have.length(2)

        result.data.toManyRelations[0].should.eql(
          {
            name: 'rel_c',
            keys: ['33', '34']
          }
        )
        result.data.toManyRelations[1].should.eql(
          {
            name: 'rel_d',
            keys: []
          }
        )
      })

      it('should set copyRemainingRelations', () => {
        const state = {
          strategies: {
            copyRelations: true
          }
        }

        const result = getMergeStrategyResult(state)

        result.should.have.property('copyRemainingRelations')
        expect(result.copyRemainingRelations).to.be.true
      })

      it('should set sourceEntityConfig delete flag', () => {
        const state = {
          strategies: {
            sourceEntityAction: 'something'
          }
        }

        let result = getMergeStrategyResult(state)

        result.should.have.property('sourceEntityConfig')
        result.sourceEntityConfig.should.have.property('deleteSourceEntities')
        expect(result.sourceEntityConfig.deleteSourceEntities).to.be.false

        const state2 = {
          strategies: {
            sourceEntityAction: 'DELETE'
          }
        }

        result = getMergeStrategyResult(state2)
        expect(result.sourceEntityConfig.deleteSourceEntities).to.be.true
      })

      it('should set edit values', () => {
        const state = {

          strategies: {
            sourceEntityAction: 'EDIT'
          },
          editOptions: [
            {
              type: 'set-field-source-entity-strategy',
              active: true,
              name: 'firstname',
              value: 'delete'
            },
            {
              type: 'set-field-source-entity-strategy',
              active: false,
              name: 'lastname',
              value: 'delete'
            }
          ]
        }

        const result = getMergeStrategyResult(state)

        result.should.have.property('sourceEntityConfig')
        result.sourceEntityConfig.should.have.property('updateValues')

        result.sourceEntityConfig.updateValues.length.should.eql(1)
      })

      it('should  set emtpy edit values if other action', () => {
        const state = {

          strategies: {
            sourceEntityAction: 'noAction'
          },
          editOptions: [
            {
              type: 'set-field-source-entity-strategy',
              active: true,
              name: 'firstname',
              value: 'delete'
            }
          ]
        }

        const result = getMergeStrategyResult(state)

        result.should.have.property('sourceEntityConfig')
        result.sourceEntityConfig.should.have.property('updateValues')
        result.sourceEntityConfig.updateValues.length.should.eql(0)
      })
    })
  })
})
