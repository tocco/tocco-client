import {screen} from '@testing-library/react'
import {testingLibrary} from 'tocco-test-util'

import MenuTree from './MenuTree'

/* eslint-disable react/prop-types */

const MenuEntryTestComp = ({item: {label}}) => <div>{label}</div>
const ChildrenWrapperTestComp = ({children}) => <div data-testid="children-wrapper">{children}</div>

const typeMapping = {
  test: {
    component: MenuEntryTestComp,
    childrenWrapperComponent: ChildrenWrapperTestComp,
    props: {},
    filterAttributes: ['name']
  }
}

describe('admin', () => {
  describe('components', () => {
    describe('MenuTree', () => {
      describe('MenuTree', () => {
        test('should render tree with all its children', () => {
          const props = {
            items: [
              {
                name: 'level1',
                label: 'level1',
                children: [
                  {
                    name: 'level1.1',
                    label: 'level1.1',
                    menuType: 'test',
                    children: [
                      {
                        name: 'level1.1.1',
                        label: 'level1.1.1',
                        menuType: 'test'
                      },
                      {
                        name: 'level1.1.2',
                        label: 'level1.1.2',
                        menuType: 'test'
                      }
                    ]
                  }
                ],
                menuType: 'test'
              },
              {
                name: 'level2',
                label: 'level2',
                children: [],
                menuType: 'test'
              }
            ],
            typeMapping,
            requireSearch: false
          }

          testingLibrary.renderWithIntl(<MenuTree {...props} />)

          expect(screen.getByText('level1')).to.exist
          expect(screen.getByText('level1.1')).to.exist
          expect(screen.getByText('level1.1.1')).to.exist
          expect(screen.getByText('level1.1.2')).to.exist
          expect(screen.getByText('level2')).to.exist
        })

        test('should render tree with applied search filter', () => {
          const props = {
            items: [
              {
                name: 'level1',
                label: 'level1',
                children: [
                  {
                    name: 'level1.1',
                    label: 'level1.1',
                    menuType: 'test',
                    children: [
                      {
                        name: 'level1.1.1',
                        label: 'level1.1.1',
                        menuType: 'test'
                      },
                      {
                        name: 'level1.1.2',
                        label: 'level1.1.2',
                        menuType: 'test'
                      }
                    ]
                  }
                ],
                menuType: 'test'
              },
              {
                name: 'level2',
                label: 'level2',
                children: [],
                menuType: 'test'
              }
            ],
            typeMapping,
            searchFilter: 'level1.1.1',
            requireSearch: false
          }

          testingLibrary.renderWithIntl(<MenuTree {...props} />)

          expect(screen.getByText('level1')).to.exist
          expect(screen.getByText('level1.1')).to.exist
          expect(screen.getByText('level1.1.1')).to.exist
          expect(screen.queryByText('level1.1.2')).to.not.exist
          expect(screen.queryByText('level2')).to.not.exist
        })
      })
    })
  })
})
