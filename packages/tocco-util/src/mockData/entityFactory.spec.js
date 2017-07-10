import {createDummyEntities, createUsers} from './entityFactory'

describe('tocco-util', () => {
  describe('mockData', () => {
    describe('entityFactory', () => {
      describe('createDummyEntities', () => {
        it('should create right amount of dummy entities', () => {
          const amount = 101
          const dummyEntities = createDummyEntities(amount)
          expect(dummyEntities.length).to.eql(amount)
        })
      })

      describe('createDummyEntities', () => {
        it('should create right amount of user entities', () => {
          const amount = 99
          const dummyEntities = createUsers(amount)
          expect(dummyEntities.length).to.eql(amount)
        })
      })
    })
  })
})
