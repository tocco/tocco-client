import React from 'react'
import {intlEnzyme} from 'tocco-test-util'

import MenuItem from './MenuItem'
import MenuTree from './MenuTree'

/* eslint-disable react/prop-types */

const AComp = ({item: {label}}) => <div>{label}</div>
const WrapperComp = ({children}) => <div>{children}</div>

const typeMapping = {
  a: {
    component: AComp,
    childrenWrapperComponent: WrapperComp,
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
                children: [
                  {
                    name: 'level1.1',
                    menuType: 'a',
                    children: [
                      {
                        name: 'level1.1.1',
                        menuType: 'a'
                      },
                      {
                        name: 'level1.1.2',
                        menuType: 'a'
                      }
                    ]
                  }
                ],
                menuType: 'a'
              },
              {
                name: 'level2',
                children: [],
                menuType: 'a'
              }
            ],
            typeMapping,
            requireSearch: false
          }

          const wrapper = intlEnzyme.mountWithIntl(<MenuTree {...props} />)

          expect(wrapper.find(MenuItem)).to.have.length(5)
        })

        test('should render tree with applied search filter', () => {
          const props = {
            items: [
              {
                name: 'level1',
                children: [
                  {
                    name: 'level1.1',
                    menuType: 'a',
                    children: [
                      {
                        name: 'level1.1.1',
                        menuType: 'a'
                      },
                      {
                        name: 'level1.1.2',
                        menuType: 'a'
                      }
                    ]
                  }
                ],
                menuType: 'a'
              },
              {
                name: 'level2',
                children: [],
                menuType: 'a'
              }
            ],
            typeMapping,
            searchFilter: 'level1.1.1',
            requireSearch: false
          }

          const wrapper = intlEnzyme.mountWithIntl(<MenuTree {...props} />)

          expect(wrapper.find(MenuItem)).to.have.length(3)
        })
      })
    })
  })
})
