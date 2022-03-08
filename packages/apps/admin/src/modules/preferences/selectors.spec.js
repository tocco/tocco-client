import {menuIsOpenPrefrencesSelector} from './selectors'

describe('admin', () => {
  describe('modules', () => {
    describe('preferences', () => {
      describe('selectors', () => {
        describe('menuIsOpenPrefrencesSelector', () => {
          test('should return false when not set', () => {
            const props = {
              canCollapse: true,
              preferencesPrefix: '',
              menuTreePath: 'address'
            }
            const state = {
              preferences: {
                userPreferences: {}
              }
            }

            const isOpen = menuIsOpenPrefrencesSelector(state, props)

            expect(isOpen).to.be.false
          })

          test('should return true when not collapsed', () => {
            const props = {
              canCollapse: true,
              preferencesPrefix: '',
              menuTreePath: 'address'
            }
            const state = {
              preferences: {
                userPreferences: {
                  'admintree.address.collapsed': false
                }
              }
            }

            const isOpen = menuIsOpenPrefrencesSelector(state, props)

            expect(isOpen).to.be.true
          })

          test('should return false when collapsed', () => {
            const props = {
              canCollapse: true,
              preferencesPrefix: '',
              menuTreePath: 'address'
            }
            const state = {
              preferences: {
                userPreferences: {
                  'admintree.address.collapsed': true
                }
              }
            }

            const isOpen = menuIsOpenPrefrencesSelector(state, props)

            expect(isOpen).to.be.false
          })

          test('should return undefined when not collapsible', () => {
            const props = {
              canCollapse: false,
              preferencesPrefix: '',
              menuTreePath: 'address'
            }
            const state = {
              preferences: {
                userPreferences: {
                  'admintree.address.collapsed': false
                }
              }
            }

            const isOpen = menuIsOpenPrefrencesSelector(state, props)

            expect(isOpen).to.be.undefined
          })
        })
      })
    })
  })
})
