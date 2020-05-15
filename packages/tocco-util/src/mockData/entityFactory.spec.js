import {createDummyEntities, createUsers, makeTwoDigit} from './entityFactory'

describe('tocco-util', () => {
  describe('mockData', () => {
    describe('entityFactory', () => {
      describe('createDummyEntities', () => {
        test('should create right amount of dummy entities', () => {
          const amount = 101
          const dummyEntities = createDummyEntities(amount)
          expect(dummyEntities.length).to.eql(amount)
        })
      })

      describe('createUsers', () => {
        test('should create right amount of user entities', () => {
          const amount = 99
          const users = createUsers(amount)
          expect(users.length).to.eql(amount)
        })
      })

      describe('makeTwoDigit', () => {
        test('should return a two digit string', () => {
          expect(makeTwoDigit(9)).to.eql('09')
          expect(makeTwoDigit(12)).to.eql('12')
        })
      })
    })
  })
})
