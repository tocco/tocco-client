import reducer from './reducer'
import * as actions from './actions'

const INITIAL_STATE = {
  notifications: {},
  moreNotificationsAvailable: true
}

describe('app-extensions', () => {
  describe('notification', () => {
    describe('modules', () => {
      describe('center', () => {
        describe('reducer', () => {
          test('should create a valid initial state', () => {
            expect(reducer(undefined, {})).to.deep.equal(INITIAL_STATE)
          })

          test('should add notifications', () => {
            const notifications = {
              1: {key: '1', message: 'test'},
              2: {key: '2', message: 'test2'}
            }

            let stateAfter = reducer(INITIAL_STATE, actions.setNotifications(notifications))

            expect(stateAfter).to.have.property('notifications')
            expect(Object.keys(stateAfter.notifications)).to.have.length(2)

            const notifications2 = {
              3: {key: '3', message: 'test'},
              2: {key: '2', message: 'test2!'}
            }

            stateAfter = reducer(stateAfter, actions.setNotifications(notifications2))
            expect(Object.keys(stateAfter.notifications)).to.have.length(3)
          })

          test('should update notifications', () => {
            const notification = {key: 1, message: 'test'}
            let stateAfter = reducer(INITIAL_STATE, actions.updateNotification(notification))

            expect(stateAfter).to.have.property('notifications')
            expect(Object.keys(stateAfter.notifications)).to.have.length(1)

            const notificationUpdated = {key: 1, message: 'test2!'}

            stateAfter = reducer(stateAfter, actions.updateNotification(notificationUpdated))
            expect(Object.keys(stateAfter.notifications)).to.have.length(1)
            expect(stateAfter.notifications['1'].message).to.eql('test2!')
          })
        })
      })
    })
  })
})
