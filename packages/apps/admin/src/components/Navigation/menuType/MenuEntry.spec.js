import {screen, fireEvent} from '@testing-library/react'
import {expect} from 'chai'
import {testingLibrary} from 'tocco-test-util'

import MenuEntry from './MenuEntry'

describe('admin', () => {
  describe('components', () => {
    describe('Navigation', () => {
      describe('menuType', () => {
        describe('MenuEntry', () => {
          test('should show collapsible icon', () => {
            const props = {
              item: {
                label: 'Adresse',
                name: 'address'
              },
              canCollapse: true,
              saveUserPreferences: () => {},
              menuTreePath: 'address',
              isOpen: false,
              preferencesPrefix: ''
            }

            testingLibrary.renderWithIntl(<MenuEntry {...props} />)

            expect(screen.queryByRole('button', {hidden: true})).to.exist
          })

          test('should not show collapsible icon for non-collapsible entries', () => {
            const props = {
              item: {
                label: 'Adresse',
                name: 'address'
              },
              canCollapse: false,
              saveUserPreferences: () => {},
              menuTreePath: 'address',
              isOpen: undefined,
              preferencesPrefix: undefined
            }

            testingLibrary.renderWithIntl(<MenuEntry {...props} />)

            expect(screen.queryByRole('button', {hidden: true})).not.to.exist
          })

          test('should be able to expand and collapse', () => {
            const props = {
              item: {
                label: 'Adresse',
                name: 'address'
              },
              canCollapse: true,
              saveUserPreferences: sinon.spy(),
              menuTreePath: 'address',
              isOpen: false,
              preferencesPrefix: ''
            }

            const {rerender} = testingLibrary.renderWithIntl(<MenuEntry {...props} />)

            // expand
            fireEvent.click(screen.getByRole('button', {hidden: true}))
            expect(props.saveUserPreferences).to.have.been.calledWith({'admintree.address.collapsed': false})

            // collapse
            rerender(<MenuEntry {...props} isOpen />)
            fireEvent.click(screen.getByRole('button', {hidden: true}))
            expect(props.saveUserPreferences).to.have.been.calledWith({'admintree.address.collapsed': true})
          })
        })
      })
    })
  })
})
