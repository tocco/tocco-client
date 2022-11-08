import {screen} from '@testing-library/react'
import {testingLibrary} from 'tocco-test-util'

import MenuChildrenWrapper from './MenuChildrenWrapper'

describe('admin', () => {
  describe('components', () => {
    describe('Navigation', () => {
      describe('menuType', () => {
        describe('MenuChildrenWrapper', () => {
          test('should render children when expanded', () => {
            const isOpen = true
            const canCollapse = true
            const children = <div>Hallo</div>

            const props = {
              isOpen,
              canCollapse,
              menuTreePath: 'address',
              preferencesPrefix: ''
            }
            testingLibrary.renderWithIntl(<MenuChildrenWrapper {...props}>{children}</MenuChildrenWrapper>)

            expect(screen.queryByText('Hallo')).to.exist
          })

          test('should not render children when collapsed', () => {
            const isOpen = false
            const canCollapse = true
            const children = <div>Hallo</div>

            const props = {
              isOpen,
              canCollapse,
              menuTreePath: 'address',
              preferencesPrefix: ''
            }
            testingLibrary.renderWithIntl(<MenuChildrenWrapper {...props}>{children}</MenuChildrenWrapper>)

            expect(screen.queryByText('Hallo')).to.not.exist
          })

          test('should render children when not collapsible', () => {
            const isOpen = false
            const canCollapse = false
            const children = <div>Hallo</div>

            const props = {
              isOpen,
              canCollapse,
              menuTreePath: 'address',
              preferencesPrefix: ''
            }
            testingLibrary.renderWithIntl(<MenuChildrenWrapper {...props}>{children}</MenuChildrenWrapper>)

            expect(screen.queryByText('Hallo')).to.exist
          })
        })
      })
    })
  })
})
