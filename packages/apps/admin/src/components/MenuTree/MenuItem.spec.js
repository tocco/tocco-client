import {screen} from '@testing-library/react'
import {testingLibrary} from 'tocco-test-util'

import MenuItem from './MenuItem'

/* eslint-disable react/prop-types */

const MenuEntryTestComp = ({item: {label}}) => <div>{label}</div>
const ChildrenWrapperTestComp = ({children}) => <div data-testid="children-wrapper">{children}</div>

const typeMapping = {
  test: {
    component: MenuEntryTestComp,
    childrenWrapperComponent: ChildrenWrapperTestComp,
    props: {},
    filterAttributes: []
  }
}

describe('admin', () => {
  describe('components', () => {
    describe('MenuTree', () => {
      describe('MenuItem', () => {
        test('should pass menuTreePath correctly to children', () => {
          const children = [
            {
              name: 'person',
              menuType: 'test',
              label: 'person'
            }
          ]

          const props = {
            item: {
              name: 'address',
              children,
              menuType: 'test',
              label: 'address'
            },
            menuTreePath: 'address',
            typeMapping
          }

          testingLibrary.renderWithIntl(<MenuItem {...props} />)

          expect(screen.getByText('address')).to.exist
          expect(screen.getByText('person')).to.exist
        })

        test('should not render children wrapper when no children are present', () => {
          const props = {
            item: {
              name: 'address',
              children: [],
              menuType: 'test',
              label: 'address'
            },
            menuTreePath: 'address',
            typeMapping
          }

          testingLibrary.renderWithIntl(<MenuItem {...props} />)

          expect(screen.getByText('address')).to.exist
          expect(screen.queryByTestId('children-wrapper')).to.not.exist
        })
      })
    })
  })
})
