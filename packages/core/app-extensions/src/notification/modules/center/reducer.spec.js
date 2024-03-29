import * as actions from './actions'
import reducer from './reducer'

const INITIAL_STATE = {
  notifications: {},
  isLoadingMoreNotifications: false,
  unreadNotificationKeys: [],
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
            expect(stateAfter.isLoadingMoreNotifications).to.be.false

            const notifications2 = {
              3: {key: '3', message: 'test'},
              2: {key: '2', message: 'test2!'}
            }

            stateAfter = reducer(stateAfter, actions.setNotifications(notifications2))
            expect(Object.keys(stateAfter.notifications)).to.have.length(3)
            expect(stateAfter.isLoadingMoreNotifications).to.be.false
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

          test('should set unread notification keys', () => {
            const keys = [1, 2, 3]
            const stateAfter = reducer(INITIAL_STATE, actions.setUnreadNotificationKeys(keys))
            expect(stateAfter.unreadNotificationKeys).to.be.equal(keys)
          })

          describe('UPDATE_UNREAD_NOTIFICATION', () => {
            test('add unread notification', () => {
              const stateAfter = reducer(INITIAL_STATE, actions.updateUnreadNotification('1', false))
              expect(stateAfter.unreadNotificationKeys).to.deep.equal(['1'])
            })

            test('add existing unread notification', () => {
              const initialState = {
                ...INITIAL_STATE,
                unreadNotificationKeys: ['1']
              }
              const stateAfter = reducer(initialState, actions.updateUnreadNotification('1', false))
              expect(stateAfter.unreadNotificationKeys).to.deep.equal(['1'])
            })

            test('add read notification', () => {
              const stateAfter = reducer(INITIAL_STATE, actions.updateUnreadNotification('1', true))
              expect(stateAfter.unreadNotificationKeys).to.deep.equal([])
            })

            test('remove read notification', () => {
              const initialState = {
                ...INITIAL_STATE,
                unreadNotificationKeys: ['1']
              }
              const stateAfter = reducer(initialState, actions.updateUnreadNotification('1', true))
              expect(stateAfter.unreadNotificationKeys).to.deep.equal([])
            })
          })

          describe('IS_LOADING_MORE_NOTIFICATIONS', () => {
            test('set is loading to true', () => {
              const stateAfter = reducer(INITIAL_STATE, actions.isLoadingMoreNotifications())
              expect(stateAfter.isLoadingMoreNotifications).to.be.true
            })
          })
        })
      })
    })
  })
})
