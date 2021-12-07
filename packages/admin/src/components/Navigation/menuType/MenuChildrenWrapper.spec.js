import React from 'react'
import {intlEnzyme} from 'tocco-test-util'

import MenuChildrenWrapper from './MenuChildrenWrapper'
import {StyledMenuChildrenWrapper} from './StyledComponents'

describe('admin', () => {
  describe('components', () => {
    describe('Navigation', () => {
      describe('menuType', () => {
        describe('MenuChildrenWrapper', () => {
          test('should render children when expanded', () => {
            const isOpen = true
            const canCollapse = true
            const children = <div id="child">Hallo</div>

            const props = {
              isOpen,
              canCollapse,
              menuTreePath: 'address',
              preferencesPrefix: ''
            }
            const wrapper = intlEnzyme.mountWithIntl(<MenuChildrenWrapper {...props}>{children}</MenuChildrenWrapper>)

            expect(wrapper.find(StyledMenuChildrenWrapper).prop('isOpen')).to.be.true
          })

          test('should not render children when collapsed', () => {
            const isOpen = false
            const canCollapse = true
            const children = <div id="child">Hallo</div>

            const props = {
              isOpen,
              canCollapse,
              menuTreePath: 'address',
              preferencesPrefix: ''
            }
            const wrapper = intlEnzyme.mountWithIntl(<MenuChildrenWrapper {...props}>{children}</MenuChildrenWrapper>)

            expect(wrapper.find(StyledMenuChildrenWrapper).prop('isOpen')).to.be.false
          })

          test('should render children when not collapsible', () => {
            const isOpen = false
            const canCollapse = false
            const children = <div id="child">Hallo</div>

            const props = {
              isOpen,
              canCollapse,
              menuTreePath: 'address',
              preferencesPrefix: ''
            }
            const wrapper = intlEnzyme.mountWithIntl(<MenuChildrenWrapper {...props}>{children}</MenuChildrenWrapper>)

            expect(wrapper.find(StyledMenuChildrenWrapper).prop('isOpen')).to.be.true
          })
        })
      })
    })
  })
})
