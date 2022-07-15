import {getRelation, setRelation} from './relationPersistor'

describe('admin', () => {
  describe('routes', () => {
    describe('entities', () => {
      describe('utils', () => {
        describe('relationPersistor', () => {
          describe('getRelation & setRelation', () => {
            test('should return undefined for non-defined entity', () => {
              setRelation('Address', 'relUser')

              const result = getRelation('User')
              expect(result).to.be.undefined
            })

            test('should return undefined for non-defined entity', () => {
              const result = getRelation('User')
              expect(result).to.be.undefined
            })

            test('set selected relation', () => {
              const entity = 'User'
              const selectedRelation = 'relAddress'

              setRelation(entity, selectedRelation)
              const result = getRelation(entity)
              expect(result).to.eql(selectedRelation)
            })

            test('override selected relation', () => {
              const entity = 'User'
              const selectedRelation = 'relAddress'
              setRelation(entity, 'relRegistration')

              setRelation(entity, selectedRelation)
              const result = getRelation(entity)
              expect(result).to.eql(selectedRelation)
            })
          })
        })
      })
    })
  })
})
